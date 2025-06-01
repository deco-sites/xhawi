import { Product } from "apps/commerce/types.ts";
import { relative } from "../../../sdk/url.ts";
import { useOffer } from "../../../sdk/useOffer.ts";
import Image from "../../images/Image.tsx";

interface Props {
  product: Product;
}

const IMAGE_WIDTH = 500;
const IMAGE_HEIGHT = 500;

function Card(props: Props) {
  const { product } = props;

  // TODO: Handle product without image
  const image = product.image?.[0]!;
  const url = relative(product.url);
  const name = product.name;
  const brand = product.brand;

  const {
    inventoryLevel,
    price,
  } = useOffer(product.offers);

  return (
    <div
      class="flex h-[390px] items-start justify-start lg:h-auto"
      id="product1"
    >
      <div class="w-inherit relative h-full w-full max-w-sm overflow-hidden rounded-lg border bg-white p-4 lg:flex-nowrap">
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
                width: IMAGE_WIDTH,
                height: IMAGE_HEIGHT,
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
          </button>In
          Stock<span class="text-[10px] font-normal text-omantel-alert-dark lg:text-xs">
            ({inventoryLevel})
          </span>
        </p>
        <div
          class="py-0 text-xs text-omantel-secondary-blue lg:py-2 lg:text-sm "
          id="product1Price"
        >
          <span class="rtl:inline-flex">
            <span class="omantel-secondary-blue omr-text text-xs rtl:order-2 lg:text-sm">
              OMR
            </span>{" "}
            <span class="omantel-secondary-blue new-price text-lg font-semibold lg:text-xl">
              {price}
            </span>
          </span>
        </div>
        <p
          class="text-[12px] text-gray-400 lg:text-sm"
          id="product1TaxDescription"
        >
          Price inclusive of VAT
        </p>
        <div
          class="flex h-6 flex-row items-center justify-start gap-1 align-middle lg:gap-1"
          id="product1Colors"
        >
          <a
            class="p-0 text-sm font-bold text-omantel-grey underline"
            hreflang="en-US"
            href={url}
          >
          </a>
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
