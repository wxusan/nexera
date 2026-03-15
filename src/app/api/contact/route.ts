import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { google } from 'googleapis';

const contactSchema = z.object({
  name:    z.string().min(2),
  email:   z.string().email(),
  message: z.string().min(5),
});

type ContactData = z.infer<typeof contactSchema>;

async function appendToContacts(data: ContactData): Promise<void> {
  const key     = process.env.GOOGLE_SERVICE_ACCOUNT_KEY;
  const sheetId = process.env.GOOGLE_SHEETS_ID;
  if (!key || !sheetId) return;

  const auth = new google.auth.GoogleAuth({
    credentials: JSON.parse(key),
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });
  const sheets = google.sheets({ version: 'v4', auth });

  await sheets.spreadsheets.values.append({
    spreadsheetId: sheetId,
    range: 'Contacts!A:D',
    valueInputOption: 'USER_ENTERED',
    requestBody: {
      values: [[
        new Date().toLocaleString('uz-UZ', { timeZone: 'Asia/Tashkent' }),
        data.name,
        data.email,
        data.message,
      ]],
    },
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data = contactSchema.parse(body);

    await appendToContacts(data);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Contact API error:', error);

    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Validation failed', details: error.errors }, { status: 400 });
    }

    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
