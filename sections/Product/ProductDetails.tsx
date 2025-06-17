import { useDevice } from "@deco/deco/hooks";
import { ProductDetailsPage } from "apps/commerce/types.ts";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import AddToCartButton from "../../components/product/page/AddToCartButton.tsx";
import Breadcrumb from "../../components/product/page/Breadcrumb.tsx";
import Colors from "../../components/product/page/colors/Colors.tsx";
import DeliveryInformation, {
  DeliveryInformationProps,
} from "../../components/product/page/DeliveryInformation.tsx";
import ImageGallery from "../../components/product/page/ImageGallery.tsx";
import QuantitySelector from "../../components/product/page/QuantitySelector.tsx";
import ShareButton from "../../components/product/page/share/Button.tsx";
import SharePopup from "../../components/product/page/share/Popup.tsx";
import Specifications from "../../components/product/page/specifications/Specifications.tsx";
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
  deliveryInformation?: DeliveryInformationProps;
}

export default function ProductDetails(props: Props) {
  const { page, deliveryInformation } = props;

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
    listPrice,
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
  const {
    productSpecifications,
    selectedPossibilities,
    possibilities,
  } = getSpecifications(product, { language });

  const analyticsItem = mapProductToAnalyticsItem({
    product,
    price,
    listPrice,
    index: 0,
  });

  return (
    <div class="min-h-144 relative w-full">
      <div
        id="pdp-info"
        data-cart-item={encodeURIComponent(JSON.stringify({
          item: analyticsItem,
          platformProps: {
            allowedOutdatedData: ["paymentData"],
            orderItems: [{
              quantity: 1,
              seller: seller,
              id: product.productID,
            }],
          },
        }))}
      />
      <Breadcrumb
        breadcrumbList={breadcrumbList}
        labels={translations.breadcrumb}
      />

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
                  <Colors
                    colors={colors}
                    labels={translations.product}
                  />
                  {possibilities && selectedPossibilities && (
                    <Specifications
                      possibilities={possibilities}
                      selectedPossibilities={selectedPossibilities}
                    />
                  )}
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
                <div class="mb-2 flex flex-wrap items-center justify-between gap-3">
                  <QuantitySelector />
                  <div class="flex-grow">
                    <AddToCartButton
                      labels={translations.product}
                    />
                  </div>
                </div>
                <div class="border-b py-6">
                  <div class="mb-2 flex gap-3 text-sm">
                    <Icon id="shipping" size={20} />
                    <div>{translations.product.shipsFrom}:</div>
                    <div class="font-semibold">{sellerName}</div>
                  </div>
                  <div class="mb-2 flex gap-3 text-sm">
                    <Icon id="sold-by" size={20} />
                    <div>{translations.product.soldBy}:</div>
                    <div class="font-semibold">{sellerName}</div>
                    <span class="pl-2"></span>
                  </div>
                  <div class="flex gap-3 text-sm">
                    <Icon id="secure-payment" size={20} />
                    <div>{translations.product.payment}:</div>
                    <div class="font-semibold">
                      {translations.product.sourceTransaction}
                    </div>
                  </div>
                </div>
                {deliveryInformation && (
                  <div class="flex flex-row gap-6 border-b py-6">
                    <DeliveryInformation {...deliveryInformation} />
                  </div>
                )}
                <div>
                  <div class="w-full px-0 py-0" data-orientation="vertical">
                    <Dropdown.Root
                      asRadio
                      name="product-details"
                      class="border-b mb-6 mt-10 rounded-lg border-none bg-omantel-smoke p-6"
                    >
                      <Dropdown.Trigger class="flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline peer-checked:[&>svg]:rotate-180">
                        <h3 class="text-xl">
                          {translations.product.description}
                        </h3>
                      </Dropdown.Trigger>
                      <Dropdown.Content class="text-sm transition-all duration-200">
                        {description}
                      </Dropdown.Content>
                    </Dropdown.Root>
                    <Dropdown.Root
                      asRadio
                      name="product-details"
                      class="border-b rounded-lg border-none bg-omantel-smoke p-6"
                    >
                      <Dropdown.Trigger class="flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline peer-checked:[&>svg]:rotate-180">
                        <h3 class="text-xl">
                          {translations.product.specifications}
                        </h3>
                      </Dropdown.Trigger>
                      <Dropdown.Content class="text-sm transition-all duration-200">
                        {productSpecifications?.map((specification) => (
                          <div class="flex w-[308px] flex-col justify-start gap-1 border-[#DDD] py-6 pr-2 xl:w-[308px] [&:nth-child(n+5)]:border-t">
                            <div class="product-specification-content-model text-base font-bold">
                              {specification.name}
                            </div>
                            <div class="text-base font-light text-omantel-faded-black">
                              {specification.value}
                            </div>
                          </div>
                        ))}
                      </Dropdown.Content>
                    </Dropdown.Root>
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
                          <span class="flex rtl:flex-row-reverse">
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
                    {colors.colors.length > 1 && (
                      <Colors
                        colors={colors}
                        labels={translations.product}
                      />
                    )}
                    {possibilities && selectedPossibilities && (
                      <Specifications
                        possibilities={possibilities}
                        selectedPossibilities={selectedPossibilities}
                      />
                    )}
                    <div class="flex flex-row gap-6 border-t pt-6 rtl:flex-row-reverse rtl:justify-end">
                      <div class="flex flex-row justify-center items-center gap-4 text-sm">
                        <Icon id="shipping" size={20} />
                        <div class="flex flex-col justify-center">
                          <div class="ships-from text-omantel-faded-black">
                            {translations.product.shipsFrom}:
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
                            {translations.product.soldBy}:
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
                            {translations.product.payment}:
                          </div>
                          <div class="payment-text font-medium">
                            {translations.product.sourceTransaction}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="flex flex-wrap items-center gap-2 border-t pt-6">
                      <QuantitySelector />
                      <AddToCartButton
                        labels={translations.product}
                      />
                    </div>
                    {deliveryInformation && (
                      <div class="flex flex-row gap-6 border-t pt-6">
                        <DeliveryInformation {...deliveryInformation} />
                      </div>
                    )}
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
                          {translations.product.description}
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
                          {translations.product.specifications}
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
                          {productSpecifications?.map((specification) => (
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
