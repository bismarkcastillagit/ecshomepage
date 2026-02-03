import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// Simple email notification (console log if no email service configured)
async function sendNotification(data: { name: string; company?: string; email: string; message: string }) {
  const adminEmail = process.env.ADMIN_EMAIL || 'bismark@ecsvault.com';
  
  // For now, just log the submission
  console.log('=== New Contact Form Submission ===');
  console.log('To:', adminEmail);
  console.log('From:', data.name, `<${data.email}>`);
  if (data.company) console.log('Company:', data.company);
  console.log('Message:', data.message);
  console.log('Timestamp:', new Date().toISOString());
  console.log('===================================');
  
  return { success: true };
}

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body = await request.json();
    const { name, company, email, message, website } = body;

    // Honeypot check - if website field is filled, it's a bot
    if (website) {
      console.log('Spam submission detected via honeypot');
      // Return success to fool bots, but don't save or send email
      return NextResponse.json(
        { success: true, message: 'Form submitted successfully' },
        { status: 200 }
      );
    }

    // Validate required fields
    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Insert into Supabase if configured
    if (supabase) {
      const { error: dbError } = await supabase
        .from('contact_submissions')
        .insert([
          {
            name: name.trim(),
            company: company?.trim() || null,
            email: email.trim(),
            message: message.trim(),
          },
        ]);

      if (dbError) {
        console.error('Database error:', dbError);
        // Continue anyway - we'll still try to send notification
      }
    } else {
      console.log('Supabase not configured - skipping database storage');
    }

    // Send notification
    await sendNotification({
      name: name.trim(),
      company: company?.trim(),
      email: email.trim(),
      message: message.trim(),
    });

    return NextResponse.json(
      { success: true, message: 'Form submitted successfully' },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
