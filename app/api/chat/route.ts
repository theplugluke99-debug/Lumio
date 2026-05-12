import Anthropic from '@anthropic-ai/sdk';
import { NextRequest } from 'next/server';
import { SYSTEM_PROMPT } from '@/lib/prompts/lumio-prospect';

export const dynamic = 'force-dynamic';

type ApiMessage = { role: 'user' | 'assistant'; content: string };

export async function POST(req: NextRequest) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey || apiKey === 'your_anthropic_api_key_here') {
    return Response.json({ error: 'API key not configured' }, { status: 500 });
  }

  let messages: ApiMessage[];
  try {
    ({ messages } = await req.json());
  } catch {
    return Response.json({ error: 'Invalid request body' }, { status: 400 });
  }

  if (!Array.isArray(messages) || messages.length === 0) {
    return Response.json({ error: 'Messages required' }, { status: 400 });
  }

  const client = new Anthropic({ apiKey });

  try {
    const stream = client.messages.stream({
      model: 'claude-sonnet-4-6',
      max_tokens: 1000,
      system: SYSTEM_PROMPT,
      messages,
    });

    const readable = new ReadableStream({
      async start(controller) {
        try {
          for await (const event of stream) {
            if (
              event.type === 'content_block_delta' &&
              event.delta.type === 'text_delta'
            ) {
              controller.enqueue(new TextEncoder().encode(event.delta.text));
            }
          }
        } finally {
          controller.close();
        }
      },
    });

    return new Response(readable, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'no-cache',
      },
    });
  } catch (error) {
    console.error('Anthropic API error:', error);
    return Response.json({ error: 'AI service unavailable' }, { status: 503 });
  }
}
