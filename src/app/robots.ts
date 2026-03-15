import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://nexera.uz';

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/.next/'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
