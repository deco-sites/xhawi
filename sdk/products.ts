import { Product } from "apps/commerce/types.ts";

export function placeholderProduct(): Product {
  return {
    "@type": "Product",
    name: "Placeholder Product",
    image: [],
    productID: "placeholder",
    sku: "placeholder",
    brand: {
      "@type": "Brand",
      name: "Placeholder Brand",
    },
  };
}

export function getHighlight(product: Product, currentLanguage: string) {
  const index = currentLanguage === "ar" ? 1 : 0;

  return product.additionalProperty?.find((property) =>
    property.description === "highlight"
  )?.value?.split("|")?.[index];
}

export function getColors(product: Product) {
  return product.isVariantOf?.hasVariant?.map((variant) => ({
    url: variant.url,
    color: variant.additionalProperty?.find((property) =>
      property.name === "Color"
    )?.value?.split("|")?.[1],
  })).filter((color, index, arr): color is { url: string; color: string } =>
    !!color.color && !!color.url &&
    index === arr.findIndex((c) => c.color === color.color)
  ) || [];
}
