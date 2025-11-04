import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { supabase } from '@/lib/supabase';

const resend = new Resend(process.env.RESEND_API_KEY);

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

    // Insert into Supabase
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
      return NextResponse.json(
        { error: 'Failed to save submission' },
        { status: 500 }
      );
    }

    // Send email notification using Resend
    try {
      const emailResult = await resend.emails.send({
        from: 'ECSVault Contact Form <noreply@ecsvault.com>', // Resend's test sender
        to: process.env.ADMIN_EMAIL || 'sales@ecsvault.com',
        subject: `New Contact Form Submission from ${name}`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #C471FF;">New Contact Form Submission</h2>

            <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <p style="margin: 10px 0;"><strong>Name:</strong> ${name}</p>
              ${company ? `<p style="margin: 10px 0;"><strong>Company:</strong> ${company}</p>` : ''}
              <p style="margin: 10px 0;"><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            </div>

            <div style="margin: 20px 0;">
              <h3 style="color: #333;">Message:</h3>
              <p style="white-space: pre-wrap; line-height: 1.6;">${message}</p>
            </div>

            <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 30px 0;" />

            <p style="color: #666; font-size: 12px;">
              This email was sent from the ECSVault website contact form.<br />
              Submitted on: ${new Date().toLocaleString()}
            </p>
          </div>
        `,
      });

      console.log('Email sent successfully:', emailResult);
    } catch (emailError: any) {
      // Log email error but don't fail the request
      // The submission is already saved to database
      console.error('Email sending failed:', emailError);

      return NextResponse.json(
        {
          success: true,
          message: 'Form submitted successfully, but email notification failed',
          emailError: emailError.message
        },
        { status: 200 }
      );
    }

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
