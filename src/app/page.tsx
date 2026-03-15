import { getSiteData } from '@/lib/sheets';
import HomeClient from '@/components/sections/HomeClient';

export const revalidate = 3600; // ISR — rebuild every hour

export default async function Home() {
  const data = await getSiteData();
  return <HomeClient data={data} />;
}
