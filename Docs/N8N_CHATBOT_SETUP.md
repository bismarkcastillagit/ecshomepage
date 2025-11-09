# n8n Chatbot Setup Guide

This guide will help you set up the AI-powered chatbot for the ECSVault website using n8n.

## Overview

The chatbot uses:
- **n8n** for workflow orchestration
- **OpenAI GPT-4o-mini** for natural language processing
- **Bearer token authentication** for security
- **Webhook** for communication with the website

## Prerequisites

1. An n8n instance (cloud or self-hosted)
   - Cloud: https://n8n.io
   - Self-hosted: https://docs.n8n.io/hosting/
2. An OpenAI API account with API key
   - Sign up at: https://platform.openai.com

## Step 1: Import the Workflow

1. Log in to your n8n instance
2. Click on **Workflows** in the left sidebar
3. Click the **+** button or **Import from File**
4. Select the `Docs/n8n-workflow.json` file
5. The workflow "ECS Chatbot (Webhook → OpenAI → JSON)" will be imported

## Step 2: Configure OpenAI Credentials

1. In n8n, go to **Credentials** in the left sidebar
2. Click **+ Add Credential**
3. Search for and select **OpenAI**
4. Enter your OpenAI API key
5. Name it "OpenAI account" (or update the workflow to match your credential name)
6. Click **Save**

## Step 3: Configure the Webhook Node

1. Open the imported workflow
2. Click on the **Webhook (Chat In)** node
3. Configure authentication:
   - Set **Authentication** to "Header Auth"
   - Set **Header Name** to `Authorization`
   - Set **Header Value** to `Bearer YOUR_SECRET_TOKEN_HERE`
   - Replace `YOUR_SECRET_TOKEN_HERE` with a strong, random token
   - Save this token - you'll need it for the `.env.local` file

4. Note the webhook URL (it will look like: `https://your-n8n-instance.com/webhook/ai-chat`)

## Step 4: Customize Company Knowledge

1. Click on the **Company Knowledge** node
2. Edit the `company_profile` value to describe your actual company
3. Use simple, non-technical language
4. Include:
   - What your company does
   - Who you help
   - Typical outcomes/benefits
5. Keep it to 2-3 sentences

Example:
```
ECS Vault helps businesses with cloud computing, cybersecurity, and automation. 
We make technology simple and secure for companies by moving them to the cloud safely, 
protecting data from hackers, and automating repetitive tasks.
```

## Step 5: Test the Workflow

1. Click **Execute Workflow** (or the play button)
2. The workflow should now be listening for webhook requests
3. Click **Test Workflow**
4. Send a test request:

```json
{
  "messages": [
    {
      "role": "user",
      "content": "What does your company do?"
    }
  ],
  "metadata": {
    "audience": "non-technical",
    "source": "test"
  }
}
```

5. You should receive a response with a `reply` field

## Step 6: Activate the Workflow

1. Click the toggle switch at the top to activate the workflow
2. The workflow will now process requests 24/7

## Step 7: Configure Your Website

1. In your website project root, create a `.env.local` file
2. Add the following variables:

```env
N8N_WEBHOOK_URL=https://your-n8n-instance.com/webhook/ai-chat
N8N_BEARER_TOKEN=YOUR_SECRET_TOKEN_HERE
```

3. Replace the values with your actual webhook URL and bearer token
4. Restart your Next.js development server

## Step 8: Test the Chatbot

1. Open your website at http://localhost:3000
2. Click the purple chat button in the bottom-right corner
3. Try asking: "What does your company do?"
4. The chatbot should respond with information about your company

## Workflow Node Breakdown

### 1. Webhook (Chat In)
- Receives POST requests from the website
- Secured with Bearer token authentication

### 2. Normalize Input
- Validates and structures the incoming data
- Ensures messages array exists

### 3. Company Knowledge
- Stores your company information
- Can be easily updated without changing code

### 4. Build Chat Messages
- Creates a system prompt for OpenAI
- Instructs the AI to use simple language
- Includes conversation history

### 5. OpenAI Chat
- Sends messages to OpenAI API
- Uses GPT-4o-mini model (cost-effective and fast)
- Temperature 0.3 for consistent responses

### 6. Prepare Reply
- Extracts the AI response
- Formats it for the website

### 7. Respond to Webhook
- Sends the reply back to the website

## Customization Options

### Change AI Model
In the **OpenAI Chat** node:
- `gpt-4o-mini` - Fast and affordable (recommended)
- `gpt-4o` - More capable, higher cost
- `gpt-3.5-turbo` - Fastest, lowest cost

### Adjust Response Style
In the **Build Chat Messages** node, modify the system prompt:
- Change tone (friendly, professional, casual)
- Adjust response length
- Add specific instructions

### Add More Context
In the **Company Knowledge** node:
- Add more fields (pricing, locations, contact info)
- Include FAQs
- Add industry-specific information

## Troubleshooting

### Chatbot not responding
- Check that the workflow is activated in n8n
- Verify environment variables in `.env.local`
- Check browser console for error messages
- Verify bearer token matches between n8n and `.env.local`

### Slow responses
- Switch to `gpt-4o-mini` or `gpt-3.5-turbo`
- Check your n8n instance performance
- Verify OpenAI API rate limits

### Incorrect information
- Update the **Company Knowledge** node
- Modify the system prompt in **Build Chat Messages**
- Lower the temperature in **OpenAI Chat** for more consistent responses

## Security Best Practices

1. **Use strong bearer tokens**: Generate random tokens (32+ characters)
2. **Keep tokens secret**: Never commit `.env.local` to git
3. **Use HTTPS**: Always use secure connections for n8n webhooks
4. **Rate limiting**: Consider adding rate limiting in n8n or your hosting provider
5. **Monitor usage**: Keep an eye on OpenAI API usage and costs

## Cost Estimation

With GPT-4o-mini:
- Input: ~$0.15 per 1M tokens
- Output: ~$0.60 per 1M tokens
- Average conversation (~20 messages): ~$0.01
- 1000 conversations: ~$10

## Support

For issues with:
- **n8n**: https://docs.n8n.io or https://community.n8n.io
- **OpenAI**: https://platform.openai.com/docs
- **Website integration**: Check `app/api/chat/route.ts` and `app/components/ChatWidget.tsx`

