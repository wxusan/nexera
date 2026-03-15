import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { google } from 'googleapis';

const intakeSchema = z.object({
  fullName:    z.string().min(2),
  phone:       z.string().min(9),
  email:       z.string().email(),
  serviceType: z.string().min(1),
  country:     z.string().min(1),
  message:     z.string().optional(),
});

type IntakeData = z.infer<typeof intakeSchema>;

async function appendToLeads(data: IntakeData): Promise<void> {
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
    range: 'Leads!A:G',
    valueInputOption: 'USER_ENTERED',
    requestBody: {
      values: [[
        new Date().toLocaleString('uz-UZ', { timeZone: 'Asia/Tashkent' }),
        data.fullName,
        data.phone,
        data.email,
        data.serviceType,
        data.country,
        data.message ?? '',
      ]],
    },
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data = intakeSchema.parse(body);

    await appendToLeads(data);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Intake API error:', error);

    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Validation failed', details: error.errors }, { status: 400 });
    }

    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
