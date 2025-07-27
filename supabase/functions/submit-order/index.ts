import { createClient } from 'npm:@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

interface CartItem {
  id: string;
  name: string;
  size: string;
  color: string;
  quantity: number;
  price: number;
  image: string;
  artwork?: string;
}

interface CustomerInfo {
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
}

interface OrderData {
  customerInfo: CustomerInfo;
  items: CartItem[];
  shippingMethod: string;
  paymentMethod: string;
  subtotal: number;
  shippingCost: number;
  totalAmount: number;
}

interface ResendEmailPayload {
  from: string;
  to: string;
  subject: string;
  html: string;
}

function generateOrderId(): string {
  return 'NYH' + Math.random().toString(36).substr(2, 9).toUpperCase();
}

function formatCurrency(amount: number): string {
  return `${amount} kr`;
}

function generateCustomerEmailHTML(orderData: OrderData, orderId: string): string {
  const itemsHTML = orderData.items.map(item => `
    <tr style="border-bottom: 1px solid #eee;">
      <td style="padding: 15px 0; vertical-align: top;">
        <div style="display: flex; align-items: flex-start; gap: 15px;">
          <img src="${item.image}" alt="${item.name}" style="width: 80px; height: 80px; object-fit: cover; border-radius: 8px;">
          <div>
            <h3 style="margin: 0 0 5px 0; font-size: 16px; color: #333;">${item.name}</h3>
            <p style="margin: 2px 0; color: #666; font-size: 14px;">Størrelse: ${item.size}</p>
            <p style="margin: 2px 0; color: #666; font-size: 14px;">Farve: ${item.color}</p>
            <p style="margin: 2px 0; color: #666; font-size: 14px;">Antal: ${item.quantity}</p>
            ${item.artwork ? '<p style="margin: 2px 0; color: #FF6600; font-size: 14px;">✓ Custom design inkluderet</p>' : ''}
          </div>
        </div>
      </td>
      <td style="padding: 15px 0; text-align: right; vertical-align: top;">
        <p style="margin: 0; font-weight: bold; color: #FF6600;">${formatCurrency(item.price * item.quantity)}</p>
      </td>
    </tr>
  `).join('');

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Ordrebekræftelse - ${orderId}</title>
    </head>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="text-align: center; margin-bottom: 30px;">
        <h1 style="color: #FF6600; margin-bottom: 10px;">Tak for din bestilling!</h1>
        <p style="font-size: 18px; color: #666;">Ordre ID: <strong>${orderId}</strong></p>
      </div>

      <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 30px;">
        <h2 style="color: #333; margin-top: 0;">Ordredetaljer</h2>
        <table style="width: 100%; border-collapse: collapse;">
          ${itemsHTML}
        </table>
      </div>

      <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 30px;">
        <h2 style="color: #333; margin-top: 0;">Priser</h2>
        <table style="width: 100%;">
          <tr>
            <td style="padding: 5px 0;">Subtotal:</td>
            <td style="text-align: right; padding: 5px 0;">${formatCurrency(orderData.subtotal)}</td>
          </tr>
          <tr>
            <td style="padding: 5px 0;">Levering (${orderData.shippingMethod}):</td>
            <td style="text-align: right; padding: 5px 0;">${formatCurrency(orderData.shippingCost)}</td>
          </tr>
          <tr style="border-top: 2px solid #FF6600; font-weight: bold; font-size: 18px;">
            <td style="padding: 10px 0;">Total:</td>
            <td style="text-align: right; padding: 10px 0; color: #FF6600;">${formatCurrency(orderData.totalAmount)}</td>
          </tr>
        </table>
      </div>

      <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 30px;">
        <h2 style="color: #333; margin-top: 0;">Leveringsadresse</h2>
        <p style="margin: 5px 0;">${orderData.customerInfo.firstName} ${orderData.customerInfo.lastName}</p>
        <p style="margin: 5px 0;">${orderData.customerInfo.address}</p>
        <p style="margin: 5px 0;">${orderData.customerInfo.postalCode} ${orderData.customerInfo.city}</p>
        <p style="margin: 5px 0;">${orderData.customerInfo.country}</p>
        ${orderData.customerInfo.phone ? `<p style="margin: 5px 0;">Tlf: ${orderData.customerInfo.phone}</p>` : ''}
      </div>

      <div style="background-color: #FF6600; color: white; padding: 20px; border-radius: 8px; text-align: center;">
        <h2 style="margin-top: 0;">Hvad sker der nu?</h2>
        <p style="margin: 10px 0;">Vi begynder at producere dit custom tøj med det samme.</p>
        <p style="margin: 10px 0;"><strong>Forventet leveringstid: 2-4 hverdage</strong></p>
        <p style="margin: 10px 0;">Du vil modtage en tracking-kode, når din ordre er sendt.</p>
      </div>

      <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
        <p style="color: #666; font-size: 14px;">
          Har du spørgsmål til din ordre?<br>
          Kontakt os på <a href="mailto:nyhavnprintondemand@gmail.com" style="color: #FF6600;">nyhavnprintondemand@gmail.com</a><br>
          eller ring til +45 53 69 07 86
        </p>
        <p style="color: #999; font-size: 12px; margin-top: 20px;">
          Nyhavn Print-on-Demand<br>
          Nyhavn 44, 1051 København
        </p>
      </div>
    </body>
    </html>
  `;
}

function generateBusinessEmailHTML(orderData: OrderData, orderId: string): string {
  const itemsHTML = orderData.items.map(item => `
    <tr style="border-bottom: 1px solid #eee;">
      <td style="padding: 10px; border: 1px solid #ddd;">
        <strong>${item.name}</strong><br>
        Størrelse: ${item.size}<br>
        Farve: ${item.color}<br>
        Antal: ${item.quantity}<br>
        ${item.artwork ? '<span style="color: #FF6600;">✓ Custom design</span>' : 'Ingen custom design'}
      </td>
      <td style="padding: 10px; border: 1px solid #ddd; text-align: right;">
        ${formatCurrency(item.price)} × ${item.quantity}<br>
        <strong>${formatCurrency(item.price * item.quantity)}</strong>
      </td>
    </tr>
  `).join('');

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Ny ordre modtaget - ${orderId}</title>
    </head>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 700px; margin: 0 auto; padding: 20px;">
      <div style="background-color: #FF6600; color: white; padding: 20px; border-radius: 8px; text-align: center; margin-bottom: 30px;">
        <h1 style="margin: 0;">🎉 Ny ordre modtaget!</h1>
        <p style="margin: 10px 0 0 0; font-size: 18px;">Ordre ID: <strong>${orderId}</strong></p>
      </div>

      <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
        <h2 style="color: #333; margin-top: 0;">Kundeoplysninger</h2>
        <table style="width: 100%;">
          <tr>
            <td style="padding: 5px 0; font-weight: bold;">Navn:</td>
            <td style="padding: 5px 0;">${orderData.customerInfo.firstName} ${orderData.customerInfo.lastName}</td>
          </tr>
          <tr>
            <td style="padding: 5px 0; font-weight: bold;">Email:</td>
            <td style="padding: 5px 0;"><a href="mailto:${orderData.customerInfo.email}">${orderData.customerInfo.email}</a></td>
          </tr>
          ${orderData.customerInfo.phone ? `
          <tr>
            <td style="padding: 5px 0; font-weight: bold;">Telefon:</td>
            <td style="padding: 5px 0;">${orderData.customerInfo.phone}</td>
          </tr>
          ` : ''}
          <tr>
            <td style="padding: 5px 0; font-weight: bold;">Adresse:</td>
            <td style="padding: 5px 0;">
              ${orderData.customerInfo.address}<br>
              ${orderData.customerInfo.postalCode} ${orderData.customerInfo.city}<br>
              ${orderData.customerInfo.country}
            </td>
          </tr>
        </table>
      </div>

      <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
        <h2 style="color: #333; margin-top: 0;">Bestilte produkter</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <thead>
            <tr style="background-color: #e9ecef;">
              <th style="padding: 10px; border: 1px solid #ddd; text-align: left;">Produkt detaljer</th>
              <th style="padding: 10px; border: 1px solid #ddd; text-align: right;">Pris</th>
            </tr>
          </thead>
          <tbody>
            ${itemsHTML}
          </tbody>
        </table>
      </div>

      <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
        <h2 style="color: #333; margin-top: 0;">Ordre sammendrag</h2>
        <table style="width: 100%;">
          <tr>
            <td style="padding: 5px 0;">Subtotal:</td>
            <td style="text-align: right; padding: 5px 0;">${formatCurrency(orderData.subtotal)}</td>
          </tr>
          <tr>
            <td style="padding: 5px 0;">Levering (${orderData.shippingMethod}):</td>
            <td style="text-align: right; padding: 5px 0;">${formatCurrency(orderData.shippingCost)}</td>
          </tr>
          <tr>
            <td style="padding: 5px 0;">Betalingsmetode:</td>
            <td style="text-align: right; padding: 5px 0;">${orderData.paymentMethod}</td>
          </tr>
          <tr style="border-top: 2px solid #FF6600; font-weight: bold; font-size: 18px;">
            <td style="padding: 10px 0;">Total:</td>
            <td style="text-align: right; padding: 10px 0; color: #FF6600;">${formatCurrency(orderData.totalAmount)}</td>
          </tr>
        </table>
      </div>

      <div style="background-color: #d4edda; border: 1px solid #c3e6cb; color: #155724; padding: 15px; border-radius: 8px;">
        <h3 style="margin-top: 0;">Næste skridt:</h3>
        <ul style="margin: 10px 0;">
          <li>Bekræft ordren i dit system</li>
          <li>Start produktion af de bestilte varer</li>
          <li>Send tracking information til kunden når ordren er afsendt</li>
        </ul>
      </div>

      <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
        <p style="color: #666; font-size: 14px;">
          Denne email blev automatisk genereret fra din Nyhavn Print-on-Demand hjemmeside.
        </p>
      </div>
    </body>
    </html>
  `;
}

async function sendEmailViaResend(emailPayload: ResendEmailPayload): Promise<{ success: boolean; error?: string }> {
  try {
    const resendApiKey = Deno.env.get('RESEND_API_KEY');
    
    if (!resendApiKey) {
      console.error('RESEND_API_KEY not found in environment variables');
      return { success: false, error: 'Email service not configured' };
    }

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
    const orderData: OrderData = await req.json();
    console.log('Received order data:', {
      customerEmail: orderData.customerInfo?.email,
      itemCount: orderData.items?.length,
      totalAmount: orderData.totalAmount
    });

    // Validate required fields
    if (!orderData.customerInfo || !orderData.items || orderData.items.length === 0) {
      console.error('Missing required order data');
      return new Response(
        JSON.stringify({ error: 'Missing required order data' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Validate customer info
    const { customerInfo } = orderData;
    if (!customerInfo.email || !customerInfo.firstName || !customerInfo.lastName || 
        !customerInfo.address || !customerInfo.city || !customerInfo.postalCode) {
      console.error('Missing required customer information');
      return new Response(
        JSON.stringify({ error: 'Missing required customer information' }),
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
      console.error('Missing environment variables');
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

    // Generate unique order ID
    const orderId = generateOrderId();

    // Prepare order data for insertion
    const orderInsertData = {
      customer_name: `${customerInfo.firstName} ${customerInfo.lastName}`,
      customer_email: customerInfo.email.toLowerCase().trim(),
      customer_phone: customerInfo.phone || null,
      shipping_address: customerInfo.address.trim(),
      shipping_city: customerInfo.city.trim(),
      shipping_postal_code: customerInfo.postalCode.trim(),
      shipping_country: customerInfo.country || 'Danmark',
      shipping_method: orderData.shippingMethod || 'standard',
      payment_method: orderData.paymentMethod || 'dankort',
      subtotal: orderData.subtotal,
      shipping_cost: orderData.shippingCost,
      total_amount: orderData.totalAmount,
      status: 'pending'
    };

    console.log('Attempting to insert order into database');

    // Insert order into database
    const { data: orderResult, error: orderError } = await supabase
      .from('orders')
      .insert([orderInsertData])
      .select()
      .single();

    if (orderError) {
      console.error('Database order insertion error:', orderError);
      return new Response(
        JSON.stringify({ 
          error: 'Failed to save order',
          details: orderError.message
        }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    console.log('Order inserted successfully:', orderResult.id);

    // Prepare order items for insertion
    const orderItemsData = orderData.items.map(item => ({
      order_id: orderResult.id,
      product_type: item.id, // 'tshirt' or 'hoodie'
      product_name: item.name,
      size: item.size,
      color: item.color,
      quantity: item.quantity,
      unit_price: item.price,
      total_price: item.price * item.quantity,
      artwork_url: item.artwork || null
    }));

    console.log('Attempting to insert order items into database');

    // Insert order items into database
    const { error: itemsError } = await supabase
      .from('order_items')
      .insert(orderItemsData);

    if (itemsError) {
      console.error('Database order items insertion error:', itemsError);
      // Try to clean up the order if items insertion failed
      await supabase.from('orders').delete().eq('id', orderResult.id);
      
      return new Response(
        JSON.stringify({ 
          error: 'Failed to save order items',
          details: itemsError.message
        }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    console.log('Order items inserted successfully');

    // Send customer confirmation email
    console.log('Sending customer confirmation email');
    const customerEmailPayload: ResendEmailPayload = {
      from: 'onboarding@resend.dev', // Replace with your verified domain
      to: customerInfo.email,
      subject: `Ordrebekræftelse - ${orderId}`,
      html: generateCustomerEmailHTML(orderData, orderId)
    };

    const customerEmailResult = await sendEmailViaResend(customerEmailPayload);
    
    // Send business notification email
    console.log('Sending business notification email');
    const businessEmailPayload: ResendEmailPayload = {
      from: 'onboarding@resend.dev', // Replace with your verified domain
      to: 'nyhavnprintondemand@gmail.com',
      subject: `Ny ordre modtaget - ${orderId}`,
      html: generateBusinessEmailHTML(orderData, orderId)
    };

    const businessEmailResult = await sendEmailViaResend(businessEmailPayload);

    // Log email results
    if (!customerEmailResult.success) {
      console.error('Customer email sending failed:', customerEmailResult.error);
    }
    if (!businessEmailResult.success) {
      console.error('Business email sending failed:', businessEmailResult.error);
    }

    // Return success response
    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Order processed successfully',
        orderId: orderId,
        orderDatabaseId: orderResult.id,
        emailStatus: {
          customer: customerEmailResult.success,
          business: businessEmailResult.success
        }
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