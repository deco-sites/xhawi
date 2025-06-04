import { Product, PropertyValue } from "apps/commerce/types.ts";
import { relative } from "./url.ts";

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

// Colors

function getColor(properties?: PropertyValue[]) {
  const property = properties?.find((property) => property.name === "Color");

  if (!property) {
    return undefined;
  }

  return {
    hex: property.value?.split("|")?.[1],
    name: property.value?.split("|")?.[0],
  };
}

export function getColors(product: Product, currentLanguage: string) {
  const currentColor = getColor(product.additionalProperty);

  console.log(currentColor);

  const colors = product.isVariantOf?.hasVariant?.map((variant) => {
    const color = getColor(variant.additionalProperty);

    return {
      url: `/${currentLanguage}${relative(variant.url)}`,
      hex: color?.hex,
      name: color?.name,
    };
  }).filter((
    color,
    index,
    arr,
  ): color is { url: string; hex: string; name: string } =>
    !!color.hex && !!color.url &&
    index === arr.findIndex((c) => c.hex === color.hex)
  ) || [];

  return {
    colors,
    currentColor,
  };
}

// Specifications

export function getSpecifications(product: Product) {
  const specifications = product.isVariantOf?.additionalProperty?.filter((
    property,
  ) =>
    property.valueReference === "SPECIFICATION" && property.name &&
    property.value
  ).map((property) => ({
    name: property.name,
    value: property.value,
  }));

  return specifications;
}
