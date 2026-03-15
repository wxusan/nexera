import { NextRequest, NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';

/**
 * On-demand revalidation endpoint.
 * Call this from Google Apps Script (via a trigger) after editing the Sheet
 * so the site refreshes content immediately instead of waiting up to 1 hour.
 *
 * Usage:
 *   POST https://nexera.uz/api/revalidate
 *   Header: x-revalidate-secret: <REVALIDATE_SECRET>
 *
 * Returns:
 *   { revalidated: true, at: "<ISO timestamp>" }
 */
export async function POST(request: NextRequest) {
  const secret = process.env.REVALIDATE_SECRET;

  // If a secret is configured, enforce it
  if (secret) {
    const incoming = request.headers.get('x-revalidate-secret');
    if (incoming !== secret) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
  }

  revalidateTag('site-data');

  return NextResponse.json({ revalidated: true, at: new Date().toISOString() }, { status: 200 });
}

// Also allow GET so the client can trigger it from the browser during development
export async function GET(request: NextRequest) {
  const secret = process.env.REVALIDATE_SECRET;

  if (secret) {
    const token = request.nextUrl.searchParams.get('secret');
    if (token !== secret) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
  }

  revalidateTag('site-data');

  return NextResponse.json({ revalidated: true, at: new Date().toISOString() }, { status: 200 });
}
