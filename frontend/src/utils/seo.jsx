import React, { useEffect } from 'react';

export default function SEO({ title, description, schemaType = "LocalBusiness", pageUrl = "" }) {
  useEffect(() => {
    // 1. Update Title
    const formattedTitle = title ? `${title} | Aura & Co. Luxury Design` : "Aura & Co. | Luxury Interior Design Studio";
    document.title = formattedTitle;

    // 2. Helper to set or create meta tags
    const setMetaTag = (attrName, attrVal, content) => {
      let element = document.querySelector(`meta[${attrName}="${attrVal}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attrName, attrVal);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // 3. Update Standard Meta Tags
    const defaultDesc = "Aura & Co. is an award-winning luxury interior design studio specializing in bespoke residential, commercial, and luxury villa spaces.";
    setMetaTag('name', 'description', description || defaultDesc);
    setMetaTag('name', 'keywords', 'luxury interior design, bespoke architecture, office design, custom villa design, residential styling, premium home decor');
    setMetaTag('name', 'robots', 'index, follow');

    // 4. Update Open Graph Tags
    setMetaTag('property', 'og:title', formattedTitle);
    setMetaTag('property', 'og:description', description || defaultDesc);
    setMetaTag('property', 'og:type', 'website');
    setMetaTag('property', 'og:url', `https://auradesignstudio.com${pageUrl}`);
    setMetaTag('property', 'og:image', 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80');

    // 5. Update Twitter Cards
    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:title', formattedTitle);
    setMetaTag('name', 'twitter:description', description || defaultDesc);
    setMetaTag('name', 'twitter:image', 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80');

    // 6. Inject Structured JSON-LD Schema
    let schemaScript = document.getElementById('seo-schema');
    if (!schemaScript) {
      schemaScript = document.createElement('script');
      schemaScript.setAttribute('type', 'application/ld+json');
      schemaScript.setAttribute('id', 'seo-schema');
      document.head.appendChild(schemaScript);
    }

    const structuredData = {
      "@context": "https://schema.org",
      "@type": schemaType,
      "name": "Aura & Co.",
      "image": "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
      "@id": "https://auradesignstudio.com",
      "url": "https://auradesignstudio.com",
      "telephone": "+1-310-555-0199",
      "priceRange": "$$$$",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "8420 Wilshire Blvd",
        "addressLocality": "Beverly Hills",
        "addressRegion": "CA",
        "postalCode": "90211",
        "addressCountry": "US"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 34.0652,
        "longitude": -118.3735
      },
      "openingHoursSpecification": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday"
        ],
        "opens": "09:00",
        "closes": "18:00"
      },
      "sameAs": [
        "https://www.instagram.com",
        "https://www.linkedin.com",
        "https://www.pinterest.com"
      ]
    };

    schemaScript.innerHTML = JSON.stringify(structuredData);

    // Clean up on unmount (optional: but keep for SEO indexers)
  }, [title, description, schemaType, pageUrl]);

  return null;
}
