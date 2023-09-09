import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import OpenAI from "openai";

import { increaseApiCount, checkApiLimit } from "@/lib/api-limit";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const instructionMessage = {
  role: "system",
  content:
    "You are a code genrator. ou must answer ONLY IN MARKDOWN CODE SNIPPETS. Use code comments for explanations.",
};

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { messages } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!openai.apiKey) {
      return new NextResponse("OpenAI API Key not configured.", {
        status: 500,
      });
    }

    if (!messages) {
      return new NextResponse("Messages are required", { status: 400 });
    }

    const freeTrial = await checkApiLimit();

    if (!freeTrial) {
      return new NextResponse("Free trial has expired!", { status: 403 });
    }

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [instructionMessage, ...messages],
    });

    await increaseApiCount();

    if (response.choices && response.choices.length > 0) {
      return new NextResponse(
        JSON.stringify(response.choices[0].message.content),
        {
          headers: { "Content-Type": "application/json" },
          status: 200,
        }
      );
    } else {
      return new NextResponse("Unexpected response from OpenAI", {
        status: 500,
      });
    }
  } catch (error: any) {
    console.error("[CODE_ERROR]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
