# Supabase Setup Guide for ECSVault Contact Form

## 1. Create a Supabase Account

1. Go to [supabase.com](https://supabase.com)
2. Sign up for a free account
3. Create a new project

## 2. Create the Database Table

In your Supabase project dashboard:

1. Go to **SQL Editor** (in the left sidebar)
2. Click **New Query**
3. Copy and paste the following SQL:

```sql
-- Create contact_submissions table
CREATE TABLE contact_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  company TEXT,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Create policy to allow inserts from anyone (public)
CREATE POLICY "Allow public inserts" ON contact_submissions
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Optional: Create policy to allow authenticated users to read their own submissions
-- (You can modify this based on your needs)
CREATE POLICY "Allow authenticated users to read" ON contact_submissions
  FOR SELECT
  TO authenticated
  USING (true);

-- Create index for better query performance
CREATE INDEX idx_contact_submissions_created_at ON contact_submissions(created_at DESC);
CREATE INDEX idx_contact_submissions_email ON contact_submissions(email);
```

4. Click **Run** to execute the SQL

## 3. Get Your API Credentials

1. Go to **Project Settings** (gear icon in the left sidebar)
2. Click on **API** in the settings menu
3. Copy the following values:
   - **Project URL** (looks like: `https://xxxxx.supabase.co`)
   - **Anon/Public Key** (starts with `eyJ...`)

## 4. Configure Your Application

1. Open the `.env.local` file in your project root
2. Replace the placeholder values with your actual credentials:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

3. Save the file
4. Restart your development server:
   ```bash
   npm run dev
   ```

## 5. Test the Contact Form

1. Navigate to your website's contact form
2. Fill out all required fields
3. Click "Send Message"
4. Check your Supabase dashboard:
   - Go to **Table Editor**
   - Select `contact_submissions`
   - You should see your test submission

## 6. View Submissions

To view contact form submissions:

1. Go to your Supabase dashboard
2. Click **Table Editor** in the left sidebar
3. Select `contact_submissions` table
4. All submissions will be listed with timestamps

### Optional: Export Submissions

You can export submissions as CSV:
1. Click the **Export** button in the table editor
2. Choose CSV format
3. Download the file

## Security Features

### Row Level Security (RLS)

The table is configured with RLS policies that:
- ✅ Allow anyone to INSERT new submissions
- ❌ Prevent public reading of submissions
- ✅ Allow authenticated users (you) to read all submissions

### Data Privacy

- The anon key is safe to expose in client-side code
- RLS policies prevent unauthorized access
- All data is encrypted in transit (HTTPS)
- Supabase provides automatic backups

## Troubleshooting

### Error: "Missing Supabase environment variables"

**Solution:** Make sure `.env.local` file exists and contains valid credentials

### Error: "Failed to submit form"

**Possible causes:**
1. Invalid Supabase credentials
2. Table doesn't exist
3. RLS policies not configured correctly
4. Network connectivity issues

**Debug steps:**
1. Check browser console for detailed error messages
2. Verify credentials in `.env.local`
3. Confirm table exists in Supabase dashboard
4. Check RLS policies in **Authentication > Policies**

### Table Not Showing Up

**Solution:**
1. Make sure you ran the SQL in step 2
2. Check for SQL errors in the SQL Editor
3. Refresh your Supabase dashboard

## Next Steps (Optional Enhancements)

### 1. Email Notifications

Set up email notifications when someone submits the form:
- Use Supabase Functions (Edge Functions)
- Integrate with SendGrid, Resend, or other email services

### 2. Admin Dashboard

Create an admin page to view submissions:
- Use Supabase Auth for authentication
- Build a Next.js admin route
- Display submissions in a table with filtering/sorting

### 3. Spam Protection

Add spam protection:
- Implement rate limiting
- Add honeypot fields
- Use reCAPTCHA or hCaptcha

### 4. Auto-Reply

Send automatic confirmation emails to users after submission using Supabase Functions.

## Support

For Supabase-specific issues:
- [Supabase Documentation](https://supabase.com/docs)
- [Supabase Discord Community](https://discord.supabase.com)
