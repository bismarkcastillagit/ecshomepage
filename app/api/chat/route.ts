import { NextRequest, NextResponse } from 'next/server';

interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

interface ChatRequest {
  messages: Message[];
  metadata?: {
    audience?: string;
    source?: string;
  };
}

interface N8NResponse {
  reply?: string;
  message?: string;
  content?: string;
  output?: string;
  error?: string;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as ChatRequest;
    
    // Validate required fields
    if (!body.messages || !Array.isArray(body.messages)) {
      return NextResponse.json(
        { error: 'Invalid request: messages array is required' },
        { status: 400 }
      );
    }

    // Validate environment variables
    const webhookUrl = process.env.N8N_WEBHOOK_URL;
    const bearerToken = process.env.N8N_BEARER_TOKEN;

    if (!webhookUrl) {
      console.error('Missing n8n configuration');
      return NextResponse.json(
        { error: 'Chat service is not configured' },
        { status: 500 }
      );
    }

    // Prepare payload for n8n
    const payload = {
      messages: body.messages,
      metadata: {
        audience: body.metadata?.audience || 'non-technical',
        source: body.metadata?.source || 'ecshomepage',
        timestamp: new Date().toISOString(),
      },
    };

    // Forward request to n8n webhook
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };
    
    // Add bearer token if configured (optional for testing without auth)
    if (bearerToken) {
      headers['Authorization'] = `Bearer ${bearerToken}`;
    }
    
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers,
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      console.error('n8n webhook error:', response.status, response.statusText);
      return NextResponse.json(
        { error: 'Chat service temporarily unavailable' },
        { status: 502 }
      );
    }

    // Parse response - handle both JSON and plain text from n8n
    const rawText = await response.text();
    let data: N8NResponse;
    
    try {
      data = JSON.parse(rawText) as N8NResponse;
    } catch {
      // n8n returned plain text (e.g., when using "Text" respond mode)
      data = { reply: rawText };
    }
    
    // Extract reply from various possible response formats
    const reply = data.reply || data.output || data.message || data.content || '';

    if (!reply) {
      console.error('No reply in n8n response:', data);
      return NextResponse.json(
        { error: 'Invalid response from chat service' },
        { status: 502 }
      );
    }

    return NextResponse.json({ reply });
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: 'An error occurred processing your request' },
      { status: 500 }
    );
  }
}

