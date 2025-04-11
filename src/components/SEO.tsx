import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
}

const SEO = ({
  title = 'carpedtm • Las Vegas Web Developer & Graphic Artist',
  description = 'Las Vegas-based web designer and graphic artist specializing in branding, custom website design, and unique visuals. Elevate your brand or small business with expert web development and graphic design that stands out.',
  keywords = 'Las Vegas web designer, Las Vegas creative agency, custom website design Las Vegas, Las Vegas UX/UI designer, modern website design for small businesses, Las Vegas digital branding services, Las Vegas creative portfolio designer, Las Vegas visual artist',
  image = '/og-image.jpg',
  url = window.location.href,
  type = 'website'
}: SEOProps) => {
  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      {/* Geographic Meta Tags */}
      <meta name="geo.region" content="US-NV" />
      <meta name="geo.placename" content="Las Vegas" />
      <meta name="geo.position" content="36.1699;-115.1398" />
      <meta name="ICBM" content="36.1699, -115.1398" />
      
      {/* Open Graph / Social Media */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          "name": "carpedtm • Las Vegas Web Developer & Graphic Artist",
          "image": image,
          "description": "Las Vegas-based web designer and graphic artist specializing in branding, custom website design, and unique visuals. Elevate your brand or small business with expert web development and graphic design that stands out.",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Las Vegas",
            "addressRegion": "NV",
            "postalCode": "89101",
            "addressCountry": "US"
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": 36.1699,
            "longitude": -115.1398
          },
          "url": url,
          "email": "info.carpedtm@gmail.com",
          "sameAs": [
            "https://www.instagram.com/carpe.dtm",
            "https://x.com/carpedtm"
          ]
        })}
      </script>
    </Helmet>
  );
};

export default SEO; 