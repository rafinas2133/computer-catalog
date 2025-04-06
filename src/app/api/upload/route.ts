import { NextResponse } from 'next/server';
import { put, del } from '@vercel/blob';

export async function POST(request: Request): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);
  const filename = searchParams.get('filename');

  if (!filename) {
    return NextResponse.json(
      { message: "Missing 'filename' in query params" },
      { status: 400 }
    );
  }

  if (!request.body) {
    return NextResponse.json(
      { message: "Missing file data in request body" },
      { status: 400 }
    );
  }
 
  const blob = await put(filename, request.body, {
    access: 'public',
  });
 
  return NextResponse.json(blob);
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const urlToDelete = searchParams.get('url') as string;

  if (!urlToDelete) {
    return new Response(JSON.stringify({ error: "Missing 'url' parameter" }), { status: 400 });
  }

  await del(urlToDelete);

  return new Response(null, { status: 204 });
}