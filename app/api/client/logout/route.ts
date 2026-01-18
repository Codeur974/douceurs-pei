import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST() {
  const cookieStore = await cookies();

  cookieStore.delete('client-token');
  cookieStore.delete('client-id');

  return NextResponse.json({ success: true });
}
