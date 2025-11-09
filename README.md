This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## ECSVault - Elevate Cyber Solutions

A modern, secure website featuring cloud architecture, cybersecurity, DevOps, and AI automation services with an integrated AI-powered chatbot assistant.

## Features

- **Responsive Design**: Modern UI with Tailwind CSS
- **AI Chatbot**: Integrated n8n-powered chatbot for customer assistance
- **Contact Form**: Direct communication with the team
- **Service Showcase**: Comprehensive display of offered services

## Getting Started

### Prerequisites

- Node.js 18+ installed
- n8n instance (cloud or self-hosted) for the chatbot feature

### Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# n8n Chatbot Configuration
N8N_WEBHOOK_URL=your_n8n_webhook_url_here
N8N_BEARER_TOKEN=your_bearer_token_here
```

**Note**: The chatbot will not function without these environment variables properly configured.

### Installation

1. Install dependencies:

```bash
npm install
```

2. Configure your environment variables in `.env.local`

3. Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## AI Chatbot Setup

The website includes an AI-powered chatbot that helps visitors learn about ECS services. The chatbot:

- Appears as a floating button in the bottom-right corner
- Provides quick-start prompts for common questions
- Explains services in simple, non-technical language
- Stores conversation history locally in the browser

### Setting up the n8n Workflow

1. Import the workflow JSON from `Docs/n8n-workflow.json` into your n8n instance
2. Configure the following in n8n:
   - **Webhook node**: Set authentication to "Header Auth" with `Authorization: Bearer <your-token>`
   - **OpenAI node**: Add your OpenAI credentials and select your preferred model (e.g., gpt-4o-mini)
   - **Company Knowledge node**: Update the company profile text with your actual description
3. Activate the workflow
4. Copy the webhook URL and your bearer token to `.env.local`

### Chatbot Features

- **Accessibility**: Full keyboard navigation, ARIA labels, and screen reader support
- **Responsive**: Works on all screen sizes
- **Persistent History**: Conversations saved to localStorage
- **Quick Prompts**: Pre-defined questions for easy discovery
- **Simple Language**: Designed for non-technical audiences

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
