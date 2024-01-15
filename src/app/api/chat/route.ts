import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";
import { kv } from "@vercel/kv";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const runtime = "edge";

export async function POST(req: Request) {
  const { messages } = await req.json();
  const key = JSON.stringify(messages);

  const cached = await kv.get(key);
  if (cached) {
    return new Response(cached as BodyInit);
  }

  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo-1106",
    stream: true,
    messages,
  });

  const stream = OpenAIStream(response, {
    async onFinal(completion) {
      await kv.set(key, completion);
      await kv.expire(key, 60 * 60);
    },
  });

  return new StreamingTextResponse(stream);
}
