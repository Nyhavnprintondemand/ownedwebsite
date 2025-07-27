import { createClient } from 'npm:@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface ResendEmailPayload {
  from: string;
  to: string;
  subject: string;
  html: string;
}

async function sendEmailViaResend(formData: ContactFormData): Promise<{ success: boolean; error?: string }> {
  try {
    const resendApiKey = Deno.env.get('RESEND_API_KEY');
    
    if (!resendApiKey) {
      console.error('RESEND_API_KEY not found in environment variables');
      return { success: false, error: 'Email service not configured' };
    }

    // Email payload for Resend
    const emailPayload: ResendEmailPayload = {
      from: 'onboarding@resend.dev', // Use your verified domain email here
      to: 'nyhavnprintondemand@gmail.com', // Your business email
      subject: `Ny kontaktformular besked fra ${formData.name}`,
      html: `
        <h2>Ny kontaktformular besked</h2>
        <p><strong>Navn:</strong> ${formData.name}</p>
        <p><strong>Email:</strong> ${formData.email}</p>
        <p><strong>Emne:</strong> ${formData.subject}</p>
        <p><strong>Besked:</strong></p>
        <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 10px 0;">
          ${formData.message.replace(/\n/g, '<br>')}
        </div>
        <hr>
        <p style="color: #666; font-size: 12px;">
          Denne besked blev sendt fra kontaktformularen på nyhavnpod.dk
        </p>
      `
    };

    // Send email via Resend API
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${resendApiKey}`,
      },
      body: JSON.stringify(emailPayload),
    });

    const responseData = await response.json();

    if (!response.ok) {
      console.error('Resend API error:', {
        status: response.status,
        statusText: response.statusText,
        data: responseData
      });
      return { 
        success: false, 
        error: `Email sending failed: ${responseData.message || response.statusText}` 
      };
    }

    console.log('Email sent successfully via Resend:', responseData.id);
    return { success: true };

  } catch (error) {
    console.error('Error sending email via Resend:', error);
    return { 
      success: false, 
      error: `Email sending error: ${error.message}` 
    };
  }
}

Deno.serve(async (req: Request) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Only allow POST requests
    if (req.method !== 'POST') {
      console.error('Method not allowed:', req.method);
      return new Response(
        JSON.stringify({ error: 'Method not allowed' }),
        { 
          status: 405, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Parse request body
    const formData: ContactFormData = await req.json();
    console.log('Received form data:', { 
      name: formData.name, 
      email: formData.email, 
      subject: formData.subject,
      messageLength: formData.message?.length 
    });

    // Validate required fields
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      console.error('Missing required fields:', {
        name: !!formData.name,
        email: !!formData.email,
        subject: !!formData.subject,
        message: !!formData.message
      });
      return new Response(
        JSON.stringify({ error: 'All fields are required' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      console.error('Invalid email format:', formData.email);
      return new Response(
        JSON.stringify({ error: 'Invalid email format' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Check environment variables
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
    
    if (!supabaseUrl || !supabaseServiceKey) {
      console.error('Missing environment variables:', {
        hasUrl: !!supabaseUrl,
        hasServiceKey: !!supabaseServiceKey
      });
      return new Response(
        JSON.stringify({ error: 'Server configuration error' }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Initialize Supabase client
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    console.log('Supabase client initialized');

    // Prepare data for insertion
    const insertData = {
      name: formData.name.trim(),
      email: formData.email.trim().toLowerCase(),
      subject: formData.subject.trim(),
      message: formData.message.trim(),
    };

    console.log('Attempting to insert data into contact_messages table');

    // Insert contact message into database
    const { data, error } = await supabase
      .from('contact_messages')
      .insert([insertData])
      .select();

    if (error) {
      console.error('Database insertion error:', {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code
      });
      
      // Provide more specific error messages based on the error
      let errorMessage = 'Failed to save message';
      if (error.code === '42P01') {
        errorMessage = 'Database table not found. Please contact support.';
      } else if (error.code === '23505') {
        errorMessage = 'Duplicate entry detected.';
      } else if (error.message.includes('permission')) {
        errorMessage = 'Database permission error. Please contact support.';
      }
      
      return new Response(
        JSON.stringify({ 
          error: errorMessage,
          details: error.message // Include technical details for debugging
        }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    console.log('Successfully inserted contact message:', data?.[0]?.id);

    // Send email notification
    console.log('Attempting to send email notification via Resend');
    const emailResult = await sendEmailViaResend(formData);
    
    if (!emailResult.success) {
      console.error('Email sending failed:', emailResult.error);
      // Note: We don't return an error here because the message was saved successfully
      // The email failure is logged but doesn't prevent the success response
    } else {
      console.log('Email notification sent successfully');
    }

    // Return success response
    return new Response(
      JSON.stringify({ 
        success: true, 
        message: emailResult.success 
          ? 'Message sent successfully and email notification delivered' 
          : 'Message sent successfully (email notification failed)',
        id: data?.[0]?.id 
      }),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );

  } catch (error) {
    console.error('Function execution error:', {
      message: error.message,
      stack: error.stack,
      name: error.name
    });
    
    return new Response(
      JSON.stringify({ 
        error: 'Internal server error',
        details: error.message
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});