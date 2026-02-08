import {
  jsonLdSchema,
  jsonLdWebSiteSchema,
  jsonLdWebPageSchema,
} from "@/lib/metadata";

const schemas = [jsonLdSchema, jsonLdWebSiteSchema, jsonLdWebPageSchema];

export function JsonLd() {
  return (
    <>
      {schemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}
