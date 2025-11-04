# Email Notifications Setup Guide

## Overview

This guide explains how to set up email notifications for contact form submissions using Resend.

## Prerequisites

- Supabase already configured (see [SUPABASE_SETUP.md](SUPABASE_SETUP.md))
- Resend account (free tier: 3,000 emails/month)

## Step 1: Create Resend Account

1. Go to [resend.com/signup](https://resend.com/signup)
2. Sign up for a free account
3. Verify your email address

## Step 2: Get Your API Key

1. Log into [resend.com](https://resend.com)
2. Go to **API Keys** in the sidebar
3. Click **Create API Key**
4. Give it a name (e.g., "ECSVault Production")
5. Copy the API key (starts with `re_`)

**Important:** Save this key immediately - you can't see it again!

## Step 3: Configure Environment Variables

1. Open your `.env.local` file
2. Add your Resend API key:

```bash
RESEND_API_KEY=re_your_actual_api_key_here
```

3. Update the admin email (the email that will receive notifications):

```bash
ADMIN_EMAIL=your-actual-email@example.com
```

## Step 4: Verify Setup (Optional)

### Using Resend Test Mode

By default, the API route uses `onboarding@resend.dev` as the sender, which works in test mode without domain verification.

**Test mode limitations:**
- Emails only sent to the email address you signed up with
- Good for testing

### Production Setup (Recommended)

For production, you should:

1. **Add Your Domain to Resend:**
   - Go to **Domains** in Resend dashboard
   - Click **Add Domain**
   - Enter your domain (e.g., `ecsvault.com`)
   - Add the DNS records Resend provides to your domain

2. **Update the API Route:**

   Edit `app/api/contact/route.ts` and change the `from` field:

   ```typescript
   from: 'Contact Form <noreply@ecsvault.com>', // Your verified domain
   ```

## Step 5: Test the Form

1. Restart your development server:
   ```bash
   npm run dev
   ```

2. Navigate to your website's contact form

3. Fill out and submit a test message

4. Check your email inbox (spam/junk folder too!)

## Email Template

The email notification includes:
- Sender's name
- Company (if provided)
- Email address (clickable mailto link)
- Message content
- Timestamp

## Troubleshooting

### "Failed to send email" Error

**Check these common issues:**

1. **API Key Invalid:**
   - Verify your `RESEND_API_KEY` in `.env.local`
   - Make sure there are no extra spaces or quotes
   - Regenerate the key in Resend dashboard if needed

2. **Email Not Received:**
   - Check spam/junk folder
   - Verify `ADMIN_EMAIL` is correct in `.env.local`
   - In test mode, email must match your Resend signup email

3. **Server Console Errors:**
   - Check the terminal where `npm run dev` is running
   - Look for detailed error messages from Resend

### Check Server Logs

When you submit the form, check your terminal for:
```
Email sent successfully: { id: '...' }
```

Or error messages:
```
Email sending failed: [error details]
```

## Advanced Configuration

### Custom Email Template

You can customize the email HTML in `app/api/contact/route.ts`:

```typescript
html: `
  <div style="your-custom-styles">
    Your custom template
  </div>
`
```

### Add Auto-Reply to User

To send a confirmation email to the person who submitted the form, add this to `app/api/contact/route.ts` after the admin notification:

```typescript
// Send confirmation to user
await resend.emails.send({
  from: 'ECSVault <noreply@ecsvault.com>',
  to: email,
  subject: 'Thanks for contacting ECSVault',
  html: `
    <h2>Thanks for reaching out!</h2>
    <p>We've received your message and will get back to you soon.</p>
  `
});
```

### Multiple Recipients

To send notifications to multiple people:

```typescript
to: ['sales@ecsvault.com', 'support@ecsvault.com']
```

### Add Attachments

```typescript
await resend.emails.send({
  from: 'Contact Form <noreply@ecsvault.com>',
  to: process.env.ADMIN_EMAIL,
  subject: `New Contact Form Submission`,
  html: '...',
  attachments: [
    {
      filename: 'document.pdf',
      content: pdfBuffer,
    }
  ]
});
```

## Rate Limits

**Resend Free Tier:**
- 3,000 emails/month
- 100 emails/day

**Pro Plan ($20/month):**
- 50,000 emails/month
- 500 emails/day

For high-volume needs, consider:
- Pro or Business plan
- Rate limiting on your contact form
- Storing submissions in Supabase (already done) and checking Supabase dashboard instead

## Security Best Practices

✅ **Already Implemented:**
- API key stored in `.env.local` (never committed to git)
- Server-side validation of form inputs
- Email sanitization (HTML escaping)
- Rate limiting can be added via Vercel/middleware

❌ **Don't:**
- Never commit `.env.local` to git
- Don't expose your Resend API key client-side
- Don't send sensitive data in emails (PII, passwords, etc.)

## Monitoring

**Check Email Delivery:**
1. Go to [resend.com/emails](https://resend.com/emails)
2. View all sent emails
3. Check delivery status, bounces, and errors

## Support

- **Resend Docs:** [resend.com/docs](https://resend.com/docs)
- **Resend Support:** support@resend.com
- **Community:** [Resend Discord](https://discord.gg/resend)

## Cost Estimate

For typical business website:
- **~50 submissions/month** = Free tier is perfect
- **100-500 submissions/month** = Consider Pro plan ($20/month)
- **1000+ submissions/month** = Business plan or alternative solution
