import { Product } from "apps/commerce/types.ts";
import { clx } from "../../../sdk/clx.ts";
import { formatPrice } from "../../../sdk/format.ts";
import { getColors, getHighlight } from "../../../sdk/products.ts";
import { relative } from "../../../sdk/url.ts";
import { useOffer } from "../../../sdk/useOffer.ts";
import Image from "../../images/Image.tsx";

interface Props {
  product: Product;
  labels: {
    priceInclusiveOfVAT: string;
    omr: string;
    fewItemsLeft: string;
    inStock: string;
  };
  currentLanguage: string;
}

// const IMAGE_WIDTH = 500;
// const IMAGE_HEIGHT = 500;

function Card(props: Props) {
  const { product, labels, currentLanguage } = props;

  // TODO: Handle product without image
  const image = product.image?.[0]!;
  const url = relative(product.url);
  const name = product.name;
  const brand = product.brand;

  const {
    inventoryLevel,
    price,
  } = useOffer(product.offers);

  const highlight = getHighlight(product, currentLanguage);

  const currentColor = product.additionalProperty?.find((property) =>
    property.name === "Color"
  )?.value?.split("|")?.[1];

  const colors = getColors(product).filter(({ color }) =>
    color !== currentColor
  );

  return (
    <div
      class="flex h-[390px] items-start justify-start lg:h-auto"
      id="product1"
    >
      <div class="w-inherit relative h-full w-full max-w-sm overflow-hidden rounded-lg border bg-white p-4 lg:flex-nowrap">
        {highlight && (
          <button
            type="button"
            class="inline-flex items-center justify-center whitespace-nowrap font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-primary-foreground false sale-btn absolute top-0 h-8 truncate rounded-none rounded-ee-md rounded-ss-md bg-omantel-secondary-blue p-1 px-3.5 text-xs uppercase hover:bg-omantel-blue ltr:left-0 rtl:left-auto rtl:right-0 lg:w-auto"
          >
            {highlight}
          </button>
        )}
        <div>
          <a
            id="product1Link"
            hreflang="en-US"
            href={url}
          >
            <Image
              alt={image.alternateName}
              sources={{
                // TODO: Handle product without image
                src: image.url!,
              }}
              loading="lazy"
              class="mx-auto h-[150px] max-h-[300px] w-full max-w-[300px] rounded-md border-0 object-contain md:max-h-[300px] lg:h-[300px]"
            />
          </a>
        </div>
        <h2
          class="product-rating mb-2 mt-2 text-[12px] font-semibold uppercase text-gray-500"
          id="product1Brand"
        >
          {brand?.name}
        </h2>
        <p
          class="mb-3 h-[20px] truncate text-xs font-normal lg:text-[16px]"
          id="product1BrandName"
        >
          {name}
        </p>
        <div
          class="inline-flex h-[25px] items-center gap-2 pb-0 pt-0 lg:gap-2 lg:pb-2 lg:pt-2"
          id="product1Rating"
        >
          <span
            class="product-rating-count text-xs"
            id="product1RatingCount"
          >
          </span>
        </div>

        <p
          class=" text-omantel-faded-black flex items-center gap-2 text-[10px] font-normal lg:text-[14px] lg:font-medium"
          id="product1StockAvailable"
        >
          <button
            type="button"
            class="inline-flex items-center justify-center whitespace-nowrap font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-primary-foreground relative rounded-full text-[0] border product-colors h-1.5 w-1.5 p-0 lg:h-1.5 lg:w-1.5 border-bg-omantel-dark-green bg-omantel-dark-green hover:bg-omantel-dark-green"
            data-testid="colored-button"
          >
          </button>
          {labels.inStock}
          {typeof inventoryLevel === "number" && inventoryLevel < 10 &&
            (
              <span class="text-[10px] font-normal text-omantel-alert-dark lg:text-xs">
                ({labels.fewItemsLeft})
              </span>
            )}
        </p>
        <div
          class="py-0 text-xs text-omantel-secondary-blue lg:py-2 lg:text-sm "
          id="product1Price"
        >
          <span class="rtl:inline-flex">
            <span class="omantel-secondary-blue omr-text text-xs rtl:order-2 lg:text-sm">
              {labels.omr}
            </span>{" "}
            <span class="omantel-secondary-blue new-price text-lg font-semibold lg:text-xl">
              {formatPrice(price)}
            </span>
          </span>
        </div>
        <p
          class="text-[12px] text-gray-400 lg:text-sm"
          id="product1TaxDescription"
        >
          {labels.priceInclusiveOfVAT}
        </p>
        <div
          class="flex h-6 flex-row items-center justify-start gap-1 align-middle lg:gap-1"
          id="product1Colors"
        >
          {currentColor && (
            <a
              class="flex items-center justify-center rounded-2xl p-0.5 shadow-[0px_0px_0px_2px_#95c655]"
              hreflang="en-US"
              href={product.url}
            >
              <button
                type="button"
                class="inline-flex items-center justify-center whitespace-nowrap font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 relative h-4 w-4 rounded-full p-2 text-[0] lg:h-4 lg:w-4 border border-omantel-grey color-button cursor-pointer"
                style={{
                  backgroundColor: currentColor,
                }}
              >
              </button>
            </a>
          )}
          {colors.map((color) => (
            <a
              class={clx(
                "flex items-center justify-center rounded-2xl",
                colors.length === 1 && !currentColor
                  ? "p-0.5 shadow-[0px_0px_0px_2px_#95c655]"
                  : "p-px",
              )}
              hreflang="en-US"
              href={color.url}
            >
              <button
                type="button"
                class="inline-flex items-center justify-center whitespace-nowrap font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 relative h-4 w-4 rounded-full p-2 text-[0] lg:h-4 lg:w-4 border border-omantel-grey color-button cursor-pointer"
                style={{
                  backgroundColor: color.color,
                }}
              >
              </button>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

function LoadingFallback() {
  return (
    <div
      class="flex h-[390px] items-start justify-start lg:h-auto"
      id="product1"
    >
      <div class="w-inherit relative h-full w-full max-w-sm overflow-hidden rounded-lg border bg-white p-4 lg:flex-nowrap">
        <div>
          <div class="mx-auto h-[150px] max-h-[300px] w-full max-w-[300px] rounded-md border-0 object-contain md:max-h-[300px] lg:h-[300px]" />
        </div>
        <h2
          class="product-rating mb-2 mt-2 text-[12px] font-semibold uppercase invisible"
          id="product1Brand"
        >
          brand
        </h2>
        <p
          class="mb-3 h-[20px] truncate text-xs font-normal lg:text-[16px] invisible"
          id="product1BrandName"
        >
          name
        </p>
        <div
          class="inline-flex h-[25px] items-center gap-2 pb-0 pt-0 lg:gap-2 lg:pb-2 lg:pt-2"
          id="product1Rating"
        >
          <span
            class="product-rating-count text-xs"
            id="product1RatingCount"
          >
          </span>
        </div>
        <p
          class=" text-omantel-faded-black invisible flex items-center gap-2 text-[10px] font-normal lg:text-[14px] lg:font-medium"
          id="product1StockAvailable"
        >
          <button
            type="button"
            class="inline-flex items-center justify-center whitespace-nowrap font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-primary-foreground relative rounded-full text-[0] border product-colors h-1.5 w-1.5 p-0 lg:h-1.5 lg:w-1.5 border-bg-omantel-dark-green bg-omantel-dark-green hover:bg-omantel-dark-green"
            data-testid="colored-button"
          >
          </button>In
          Stock<span class="text-[10px] font-normal text-omantel-alert-dark lg:text-xs">
            0
          </span>
        </p>
        <div
          class="py-0 text-xs text-omantel-secondary-blue lg:py-2 lg:text-sm invisible"
          id="product1Price"
        >
          <span class="rtl:inline-flex">
            <span class="omantel-secondary-blue omr-text text-xs rtl:order-2 lg:text-sm">
              OMR
            </span>{" "}
            <span class="omantel-secondary-blue new-price text-lg font-semibold lg:text-xl">
              0
            </span>
          </span>
        </div>
        <p
          class="text-[12px] text-gray-400 lg:text-sm invisible"
          id="product1TaxDescription"
        >
          Price inclusive of VAT
        </p>
        <div
          class="flex h-6 flex-row items-center justify-start gap-1 align-middle lg:gap-1"
          id="product1Colors"
        >
          <span
            class="p-0 text-sm font-bold text-omantel-grey underline"
            hreflang="en-US"
          >
          </span>
        </div>
      </div>
    </div>
  );
}

Card.LoadingFallback = LoadingFallback;

export default Card;
