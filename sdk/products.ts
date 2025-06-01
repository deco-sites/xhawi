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
