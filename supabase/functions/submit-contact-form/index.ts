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

    // Return success response
    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Message sent successfully',
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