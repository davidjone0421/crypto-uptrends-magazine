import { Helmet } from "react-helmet-async";

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: string;
}

const SITE_NAME = "Crypto UpTrends";
const DEFAULT_DESC = "Stay ahead with the latest cryptocurrency news, Bitcoin analysis, altcoin updates, and real-time market data.";
const DEFAULT_IMAGE = "https://cryptouptrends.com/favicon.png";
const BASE_URL = "https://cryptouptrends.com";

export function SEO({
  title,
  description = DEFAULT_DESC,
  image = DEFAULT_IMAGE,
  url,
  type = "website",
}: SEOProps) {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} | Latest Cryptocurrency & Market News`;
  const fullUrl = url ? `${BASE_URL}${url}` : BASE_URL;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={fullUrl} />

      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={SITE_NAME} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
}
