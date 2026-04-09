import { NextResponse } from "next/server";

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

if (!apiBaseUrl) {
  throw new Error("NEXT_PUBLIC_API_BASE_URL is not defined");
}

export async function POST(request: Request) {
  const body = await request.json();

  const response = await fetch(`${apiBaseUrl}/contact`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body),
    cache: "no-store"
  });

  const data = await response.json();
  return NextResponse.json(data, { status: response.status });
}
