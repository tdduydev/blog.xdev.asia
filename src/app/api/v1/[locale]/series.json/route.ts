export const dynamic = "force-static";

import { buildSeriesTree } from "@/lib/content-api";
import { LOCALES, type Locale } from "@/lib/i18n/config";

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ locale: string }> }
) {
  const { locale } = await params;
  return Response.json(buildSeriesTree(locale as Locale));
}
