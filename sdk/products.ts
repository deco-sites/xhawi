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
  const property = properties?.find((property) =>
    property.name === "Color" || property.name === "اللون"
  );

  const isArabic = property?.name === "اللون";

  if (!property) {
    return undefined;
  }

  return {
    hex: isArabic
      ? property.value?.split("|")?.[0]
      : property.value?.split("|")?.[1],
    name: isArabic
      ? property.value?.split("|")?.[1]
      : property.value?.split("|")?.[0],
  };
}

export function getColors(product: Product, currentLanguage: string) {
  const currentColor = getColor(product.additionalProperty);

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

export function getSpecifications(
  product: Product,
  { language }: { language: string },
) {
  const variants = product.isVariantOf?.hasVariant;

  const productSpecifications = product.isVariantOf?.additionalProperty?.filter(
    (
      property,
    ) =>
      property.valueReference === "SPECIFICATION" && property.name &&
      property.value,
  ).map((property) => ({
    name: property.name,
    value: property.value,
  }));

  const skuSpecifications = product.additionalProperty?.filter((
    property,
  ) =>
    property.valueReference === "SPECIFICATION" && property.name &&
    property.value
  ).map((property) => ({
    name: property.name,
    value: property.value,
  }));

  const currentColor = getColor(product.additionalProperty);

  const allPossibilities =
    variants?.flatMap((variant) =>
      variant.additionalProperty?.filter((
        property,
      ) =>
        property.valueReference === "SPECIFICATION" && property.name &&
        property.value
      )
    ).reduce<Record<string, string[]>>(
      (acc, curr) => {
        if (
          !curr || !curr.name || !curr.value ||
          curr.name === "Color" || curr.name === "اللون"
        ) {
          return acc;
        }

        acc[curr.name] ??= [];
        if (!acc[curr.name].includes(curr.value)) {
          acc[curr.name].push(curr.value);
        }

        return acc;
      },
      {},
    ) || {};

  const possibilities: Record<
    string,
    { value: string; url?: string; inStock: boolean }[]
  > = Object.entries(
    allPossibilities,
  ).reduce<Record<string, { value: string; url?: string; inStock: boolean }[]>>(
    (acc, [name, values]) => {
      const variantsColor = variants?.filter((variant) =>
        getColor(variant.additionalProperty)?.name === currentColor?.name
      );

      acc[name] = values.map((value) => {
        const variant = variantsColor?.find((variant) =>
          variant.additionalProperty?.some((property) =>
            property.name === name && property.value === value
          )
        );

        return ({
          value,
          url: variant ? `/${language}${relative(variant.url)}` : undefined,
          inStock: variant?.offers?.offers?.some(
            (offer) => offer.availability === "https://schema.org/InStock",
          ) || false,
        });
      });

      return acc;
    },
    {},
  );

  const selectedPossibilities = skuSpecifications?.reduce<
    Record<string, string>
  >(
    (acc, curr) => {
      if (!curr || !curr.name || !curr.value) {
        return acc;
      }

      acc[curr.name] ??= curr.value;

      return acc;
    },
    {},
  );

  return {
    productSpecifications,
    possibilities,
    selectedPossibilities,
  };
}
