import { getSiteData } from '@/lib/sheets';
import ApplyContent from './ApplyContent';

export default async function ApplyPage() {
  const data = await getSiteData();
  return (
    <ApplyContent
      countries={data.countries}
      contactEmail={data.content.contact_email}
      telegramUsername={data.content.telegram_username}
    />
  );
}
