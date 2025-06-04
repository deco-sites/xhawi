import { useDevice } from "@deco/deco/hooks";
import { ProductDetailsPage } from "apps/commerce/types.ts";
import AddToCartButton from "../../components/product/page/AddToCartButton.tsx";
import Breadcrumb from "../../components/product/page/Breadcrumb.tsx";
import Colors from "../../components/product/page/colors/Colors.tsx";
import ImageGallery from "../../components/product/page/ImageGallery.tsx";
import QuantitySelector from "../../components/product/page/QuantitySelector.tsx";
import ShareButton from "../../components/product/page/share/Button.tsx";
import SharePopup from "../../components/product/page/share/Popup.tsx";
import Dropdown from "../../components/ui/Dropdown.tsx";
import Icon from "../../components/ui/Icon.tsx";
import Section from "../../components/ui/Section.tsx";
import { formatPrice } from "../../sdk/format.ts";
import { useI18n } from "../../sdk/i18n.ts";
import {
  getColors,
  getHighlight,
  getSpecifications,
} from "../../sdk/products.ts";
import { useOffer } from "../../sdk/useOffer.ts";

export interface Props {
  /** @title Integration */
  page: ProductDetailsPage | null;
}

export default function ProductDetails(props: Props) {
  const { page } = props;

  if (!page) {
    return (
      <div class="w-full flex justify-center items-center py-28">
        <div class="flex flex-col items-center justify-center gap-6">
          <span class="font-medium text-2xl">Page not found</span>
          <a href="/" class="btn no-animation">
            Go back to Home
          </a>
        </div>
      </div>
    );
  }

  const product = page.product;
  const breadcrumbList = page.breadcrumbList;

  const { language, translations } = useI18n(props);
  const {
    inventoryLevel,
    price,
    sellerName,
    seller,
  } = useOffer(product.offers);
  const isMobile = useDevice() !== "desktop";

  const name = product.name;
  const description = product.description;
  const images = product.image || [];
  const productUrl = product.url!;
  const brand = product.brand;
  const highlight = getHighlight(product, language);
  const colors = getColors(product, language);
  const specifications = getSpecifications(product);

  return (
    <div class="min-h-144 relative w-full">
      <Breadcrumb breadcrumbList={breadcrumbList} />

      <div class="container-fluid">
        <div class="container-width">
          {isMobile
            ? (
              <>
                <div class="relative">
                  <ImageGallery images={images} />
                  <div class="absolute top-0 flex-shrink-0 ltr:right-0 rtl:left-0">
                    <div class="relative flex flex-col items-end">
                      <ShareButton />
                      <SharePopup productUrl={productUrl} />
                    </div>
                  </div>
                </div>
                <div>
                  {brand?.name && (
                    <div class="text-xs font-semibold uppercase">
                      <a href={`/b/${brand?.name?.toLowerCase()}`}>
                        {brand?.name}
                      </a>
                    </div>
                  )}
                  <div class="mb-4 text-xl font-normal">
                    {name}
                  </div>
                  <div class="mb-4 flex items-center gap-1">
                    <div class="in-stock-label h-2 w-2 rounded-full bg-omantel-dark-green">
                    </div>
                    <div class="ml-2 text-sm font-medium text-omantel-grey">
                      {translations.product.inStock}
                      {typeof inventoryLevel === "number" &&
                        inventoryLevel < 10 &&
                        (
                          <span class="text-omantel-alert-dark ltr:ml-2 rtl:mr-2">
                            {translations.product.fewItemsLeft}
                          </span>
                        )}
                    </div>
                  </div>
                </div>
                <div class="pb-4">
                  <Colors colors={colors} />
                </div>
                <div>
                  <div class="pt-3">
                    <div class="flex items-center gap-2">
                      <div class="text-2xl font-bold text-omantel-secondary-blue">
                        <span class="mr-1 text-[14px]">
                          {translations.product.omr}
                        </span>
                        <span>{formatPrice(price)}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="mb-4 text-xs text-[#808080]">
                  {translations.product.priceInclusiveOfVAT}
                </div>
                <div class=" mb-2 flex flex-wrap items-center justify-between gap-3">
                  <div class="numeric-stepper-container flex items-center gap-2">
                    <button
                      class="decrement flex items-center justify-center rounded border lg:border-2  disabled:opacity-50 h-12 w-12 border-[#EBEBEB] lg:border-black"
                      disabled=""
                    >
                      -
                    </button>
                    <div class="">
                      <input
                        class="flex rounded-md valid:placeholder-shown:border-gray-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-omantel-dark-green disabled:cursor-not-allowed dark:border-gray-800 dark:bg-gray-950 dark:ring-offset-gray-950 dark:placeholder:text-gray-400 dark:focus-visible:ring-gray-300 focus:border-omantel-dark-green valid:border-omantel-faded-black valid:text-omantel-faded-black focus:valid:text-omantel-grey-3 quantity-value border lg:border-2 text-center disabled:opacity-50 h-12 w-20 border-[#EBEBEB] lg:border-black sm:w-36"
                        readonly=""
                        value="1"
                      />
                    </div>
                    <button class="increment flex items-center justify-center rounded border lg:border-2 disabled:cursor-not-allowed disabled:opacity-50 h-12 w-12 border-[#EBEBEB] lg:border-black">
                      +
                    </button>
                  </div>
                  <div class="flex-grow ">
                    <div class="flex flex-col gap-2">
                      <button class="inline-flex items-center justify-center whitespace-nowrap rounded-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 p-6 bg-omantel-electric-green font-Rubik text-sm text-black hover:bg-omantel-dark-green active:bg-omantel-dark-green focus:bg-omantel-dark-green active:border-2 active:border-omantel-dark-green focus:ring-2 active:ring-omantel-dark-green focus:ring-omantel-dark-green disabled:bg-omantel-platinum disabled:text-omantel-grey h-12 w-full">
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
                <div class="border-b py-6">
                  <div class="mb-2 flex gap-3 text-sm">
                    <img
                      alt="shipfrom"
                      loading="lazy"
                      width="20"
                      height="20"
                      decoding="async"
                      data-nimg="1"
                      src="/icons/shipping.svg"
                      data-cookiecategory="21"
                      style="color: transparent;"
                    />
                    <div>Ships from:</div>
                    <div class="font-semibold">Huawei</div>
                  </div>
                  <div class="mb-2 flex gap-3 text-sm">
                    <img
                      alt="sellerName"
                      loading="lazy"
                      width="20"
                      height="20"
                      decoding="async"
                      data-nimg="1"
                      src="/icons/soldby.svg"
                      data-cookiecategory="21"
                      style="color: transparent;"
                    />
                    <div>Sold by:</div>
                    <div class="font-semibold">Huawei</div>
                    <span class="pl-2"></span>
                  </div>
                  <div class="flex gap-3 text-sm">
                    <img
                      alt="Payment"
                      loading="lazy"
                      width="20"
                      height="20"
                      decoding="async"
                      data-nimg="1"
                      src="/icons/securepayment.svg"
                      data-cookiecategory="21"
                      style="color: transparent;"
                    />
                    <div>Payment:</div>
                    <div class="font-semibold">Secure transaction</div>
                  </div>
                </div>
                <div class="flex flex-row gap-6 border-b py-6">
                  <div class="flex flex-col gap-4">
                    <div class="delivery-Information-label text-base font-medium">
                      Delivery Information
                    </div>
                    <div>
                      <div class="same-day-delivery-text text-sm font-semibold">
                        Same Day Delivery
                      </div>
                      <div class="same-day-delivery-description max-w-[260px] text-xs">
                        Orders placed after 3 PM GST cannot be fulfilled on the
                        same day
                      </div>
                    </div>
                    <div>
                      <div class="next-day-delivery-text text-sm font-semibold">
                        Next Day Delivery
                      </div>
                      <div class="next-day-delivery-description max-w-[260px] text-xs">
                        Receive your order within the next day
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <div class="w-full px-0 py-0" data-orientation="vertical">
                    <div
                      data-state="open"
                      data-orientation="vertical"
                      class="border-b mb-6 mt-10 rounded-lg border-none bg-omantel-smoke p-6"
                    >
                      <h3
                        data-orientation="vertical"
                        data-state="open"
                        class="flex"
                      >
                        <button
                          type="button"
                          aria-controls="radix-:r2m:"
                          aria-expanded="true"
                          data-state="open"
                          data-orientation="vertical"
                          id="radix-:r2l:"
                          class="flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180"
                          data-radix-collection-item=""
                        >
                          <div class="text-xl">Product Description</div>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            class="lucide lucide-chevron-down h-4 w-4 shrink-0 transition-transform duration-200"
                          >
                            <path d="m6 9 6 6 6-6"></path>
                          </svg>
                        </button>
                      </h3>
                      <div
                        data-state="open"
                        id="radix-:r2m:"
                        role="region"
                        aria-labelledby="radix-:r2l:"
                        data-orientation="vertical"
                        class="overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
                        style="--radix-accordion-content-height: var(--radix-collapsible-content-height); --radix-accordion-content-width: var(--radix-collapsible-content-width); transition-duration: 0s; animation-name: none;"
                      >
                        <div class="pb-4 pt-0">
                          <div class="py-4 text-[#697077]">
                            <p>
                              HUAWEI Pura 70 Pro is a high-end smartphone
                              released in May 2024, featuring a 6.6-inch LTPO
                              OLED display with a resolution of 1256 x 2760
                              pixels and a 120Hz refresh rate. It is powered by
                              the Kirin 9000S1 chipset and comes with 12GB of
                              RAM and storage options ranging from 256GB to 1TB.
                              The device boasts a triple camera setup: a 50 MP
                              wide lens with variable aperture (f/1.4-4.0), a 12
                              MP periscope telephoto lens with 5x optical zoom,
                              and a 13 MP ultrawide lens. The front camera is 13
                              MP. The Pura 70 Pro runs on HarmonyOS 4.2 and is
                              equipped with a 4900 mAh battery supporting 66W
                              wired and 50W wireless charging
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      data-state="closed"
                      data-orientation="vertical"
                      class="border-b rounded-lg border-none bg-omantel-smoke p-6"
                    >
                      <h3
                        data-orientation="vertical"
                        data-state="closed"
                        class="flex"
                      >
                        <button
                          type="button"
                          aria-controls="radix-:r2o:"
                          aria-expanded="false"
                          data-state="closed"
                          data-orientation="vertical"
                          id="radix-:r2n:"
                          class="flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180"
                          data-radix-collection-item=""
                        >
                          <div class="text-xl">Product Specifications</div>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            class="lucide lucide-chevron-down h-4 w-4 shrink-0 transition-transform duration-200"
                          >
                            <path d="m6 9 6 6 6-6"></path>
                          </svg>
                        </button>
                      </h3>
                      <div
                        data-state="closed"
                        id="radix-:r2o:"
                        hidden=""
                        role="region"
                        aria-labelledby="radix-:r2n:"
                        data-orientation="vertical"
                        class="overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
                        style="--radix-accordion-content-height: var(--radix-collapsible-content-height); --radix-accordion-content-width: var(--radix-collapsible-content-width);"
                      >
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )
            : (
              <>
                <div class="grid w-full grid-cols-2 pb-6 transition-all duration-200 ease-linear transform opacity-100 translate-x-0">
                  <div class="relative max-w-2xl">
                    <ImageGallery images={images} highlight={highlight} />
                    <div class="absolute top-0 h-10 w-[60px] flex-shrink-0 ltr:right-0 rtl:left-0">
                      <div class="relative">
                        <ShareButton />
                        <SharePopup productUrl={productUrl} />
                      </div>
                    </div>
                  </div>
                  <div class="flex flex-col gap-6 rounded-lg border p-10 pt-8">
                    <div class="flex flex-col gap-4">
                      {brand?.name && (
                        <div class="brand-name -mb-3 text-xs font-semibold uppercase">
                          <a href={`/b/${brand.name}`}>{brand.name}</a>
                        </div>
                      )}
                      <div class="product-name font-halogen text-[32px] font-normal leading-9">
                        {name}
                      </div>
                      <div class="in-stock-label flex flex-row items-center gap-2">
                        <div class="in-stock-label h-2 w-2 rounded-full bg-omantel-dark-green">
                        </div>
                        <div class="text-base font-normal text-omantel-grey">
                          {translations.product.inStock}
                          {typeof inventoryLevel === "number" &&
                            inventoryLevel < 10 &&
                            (
                              <span class="text-omantel-alert-dark ltr:ml-2 rtl:mr-2">
                                {translations.product.fewItemsLeft}
                              </span>
                            )}
                        </div>
                      </div>
                      <div>
                        <div class="flex items-center gap-3 text-omantel-secondary-blue">
                          <span class="ar-row-reverse">
                            <span class=" omr-label text-[16px]  font-bold">
                              {translations.product.omr}
                            </span>{" "}
                            <span class="display-price pl-1 text-2xl font-semibold">
                              {formatPrice(price)}
                            </span>
                          </span>
                        </div>
                        <label class="peer-disabled:cursor-not-allowed peer-disabled:opacity-70 tax-description text-sm font-normal text-omantel-grey">
                          {translations.product.priceInclusiveOfVAT}
                        </label>
                      </div>
                    </div>
                    {colors.colors.length > 1 && <Colors colors={colors} />}
                    <div class="ar-row-reverse ar-justify-content-fe flex flex-row gap-6 border-t pt-6">
                      <div class="flex flex-row justify-center items-center gap-4 text-sm">
                        <Icon id="shipping" size={20} />
                        <div class="flex flex-col justify-center">
                          <div class="ships-from text-omantel-faded-black">
                            Ships from:
                          </div>
                          <div class="ships-from-seller-name font-medium">
                            {sellerName}
                          </div>
                        </div>
                      </div>
                      <div class="flex flex-row justify-center items-center gap-4 text-sm ">
                        <Icon id="sold-by" size={20} />
                        <div class="flex flex-col justify-center">
                          <div class="sold-by text-omantel-faded-black">
                            Sold by:
                          </div>
                          <a
                            href={`/seller/${seller}/about`}
                            class="sold-by-seller-name cursor-pointer font-medium"
                          >
                            {sellerName}
                          </a>
                        </div>
                      </div>
                      <div class="flex flex-row justify-center items-center gap-4 text-sm">
                        <Icon id="secure-payment" size={20} />
                        <div class="flex flex-col justify-center">
                          <div class="payment text-omantel-faded-black">
                            Payment:
                          </div>
                          <div class="payment-text font-medium">
                            Secure transaction
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="flex flex-wrap items-center gap-2 border-t pt-6">
                      <QuantitySelector />
                      <AddToCartButton />
                    </div>
                    <div class="flex flex-row gap-6 border-t pt-6">
                      <div class="flex flex-col gap-6">
                        <div class="delivery-Information-label text-base font-medium">
                          Delivery Information
                        </div>
                        <div class="flex flex-row justify-between">
                          <div>
                            <div class="same-day-delivery-text text-sm font-medium">
                              Same Day Delivery
                            </div>
                            <div class="same-day-delivery-description max-w-[260px] text-xs">
                              Orders placed after 3 PM GST cannot be fulfilled
                              on the same day
                            </div>
                          </div>
                          <div>
                            <div class="next-day-delivery-text text-sm font-semibold">
                              Next Day Delivery
                            </div>
                            <div class="next-day-delivery-description max-w-[260px] text-xs">
                              Receive your order within the next day
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="flex flex-col pt-12">
                  <div class="w-full px-0 py-0 " data-orientation="vertical">
                    <Dropdown.Root
                      asRadio
                      name="product-details"
                      class="border-b rounded-lg bg-omantel-smoke p-6 px-10"
                    >
                      <Dropdown.Trigger class="flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline peer-checked:[&>svg]:rotate-180">
                        <h3 class="text-2xl font-semibold">
                          Product Description
                        </h3>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          class="lucide lucide-chevron-down h-4 w-4 shrink-0 transition-transform duration-200"
                        >
                          <path d="m6 9 6 6 6-6"></path>
                        </svg>
                      </Dropdown.Trigger>
                      <Dropdown.Content class="text-sm transition-all duration-200">
                        {description}
                      </Dropdown.Content>
                    </Dropdown.Root>
                    <Dropdown.Root
                      asRadio
                      name="product-details"
                      class="border-b mt-10 rounded-lg bg-omantel-smoke p-6 px-10"
                    >
                      <Dropdown.Trigger class="flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline peer-checked:[&>svg]:rotate-180">
                        <h3 class="text-2xl font-semibold">
                          Product Specifications
                        </h3>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          class="lucide lucide-chevron-down h-4 w-4 shrink-0 transition-transform duration-200"
                        >
                          <path d="m6 9 6 6 6-6"></path>
                        </svg>
                      </Dropdown.Trigger>
                      <Dropdown.Content class="text-sm transition-all duration-200">
                        <div class="product-specification-full-content border-l-child relative grid grid-cols-[25%_25%_25%_25%] py-4">
                          {specifications?.map((specification) => (
                            <div class="flex w-[308px] flex-col justify-start gap-1 border-[#DDD] py-6 pr-2 xl:w-[308px] [&:nth-child(n+5)]:border-t">
                              <div class="product-specification-content-model text-base font-bold">
                                {specification.name}
                              </div>
                              <div class="text-base font-light text-omantel-faded-black">
                                {specification.value}
                              </div>
                            </div>
                          ))}
                        </div>
                      </Dropdown.Content>
                    </Dropdown.Root>
                  </div>
                </div>
              </>
            )}
        </div>
      </div>
    </div>
  );
}

export const LoadingFallback = () => <Section.Placeholder height="635px" />;
