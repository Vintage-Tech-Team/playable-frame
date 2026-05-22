export const siteConfig = {
  name: process.env.NEXT_PUBLIC_SITE_NAME ?? "EstateUtil",
  description:
    "Modern real estate productivity platform — calculators, global utilities, and measurement converters.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  apiUrl: process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001/api",
};
