import type { RequestURLParam } from "apps/website/functions/requestToParam.ts";
import { useI18n } from "../../sdk/i18n.ts";

interface Props {
  sellerId: RequestURLParam;
}

export default function SellerPage(props: Props) {
  const { sellerId } = props;
  const { goTo } = useI18n(props);

  return (
    <div class="overflow-hidden">
      <div class="container-fluid">
        <div class="anchorshop-container-width">
          <div class="pt-6">
            <div class="">
              <div class="lg:block">
                <nav aria-label="breadcrumb">
                  <ol class="flex flex-wrap items-center gap-1.5 break-words text-sm text-muted-foreground sm:gap-2.5 pb-3">
                    <div class="flex flex-wrap items-center gap-1.5 break-words text-sm text-muted-foreground sm:gap-2.5 pb-3">
                      <li class="inline-flex items-center gap-1.5">
                        <a hreflang="en-US" class="capitalize" href="/en">
                          Home
                        </a>
                      </li>
                      <li
                        role="presentation"
                        aria-hidden="true"
                        class="[&amp;>svg]:size-3.5"
                      >
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
                          class="lucide lucide-chevron-right rtl:rotate-180"
                        >
                          <path d="m9 18 6-6-6-6"></path>
                        </svg>
                      </li>
                    </div>
                    <div class="flex flex-wrap items-center gap-1.5 break-words text-sm text-muted-foreground sm:gap-2.5 pb-3">
                      <li class="inline-flex items-center gap-1.5">
                        <a
                          hreflang="en-US"
                          class="capitalize"
                          href="/en/seller"
                        >
                          seller
                        </a>
                      </li>
                      <li
                        role="presentation"
                        aria-hidden="true"
                        class="[&amp;>svg]:size-3.5"
                      >
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
                          class="lucide lucide-chevron-right rtl:rotate-180"
                        >
                          <path d="m9 18 6-6-6-6"></path>
                        </svg>
                      </li>
                    </div>
                    <div class="flex flex-wrap items-center gap-1.5 break-words text-sm text-muted-foreground sm:gap-2.5 pb-3">
                      <li class="inline-flex items-center gap-1.5">
                        <a
                          hreflang="en-US"
                          class="capitalize"
                          href={goTo(`/seller/${sellerId}`)}
                        >
                          {sellerId}
                        </a>
                      </li>
                      <li
                        role="presentation"
                        aria-hidden="true"
                        class="[&amp;>svg]:size-3.5"
                      >
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
                          class="lucide lucide-chevron-right rtl:rotate-180"
                        >
                          <path d="m9 18 6-6-6-6"></path>
                        </svg>
                      </li>
                    </div>
                    <div class="flex flex-wrap items-center gap-1.5 break-words pb-3 text-sm text-muted-foreground sm:gap-2.5">
                      <li class="inline-flex items-center gap-1.5">
                        <span
                          role="link"
                          aria-disabled="true"
                          aria-current="page"
                          class="text-foreground font-medium capitalize"
                        >
                          about
                        </span>
                      </li>
                    </div>
                  </ol>
                </nav>
              </div>
            </div>
            <div>
              <h1 class="hidden">StoreFront About Page</h1>
              <div class="mb-4 flex border-b border-[#c1c1c1] px-4 text-[12px] lg:hidden">
              </div>
              <div class="">
                <div
                  id="storeFrontBanner"
                  data-testid="storeFrontBanner"
                  class="relative flex h-[343] min-h-[343px] flex-row items-start justify-start rounded-[8px] bg-cover  bg-center px-4 pt-[20px] md:flex-row lg:min-h-[288px] lg:items-center lg:justify-between lg:px-10 lg:pt-0 items-center"
                  style="background-image:url(undefined);margin-top:auto"
                >
                  <div class="justify-content:space-between lg: flex h-full w-full flex-col items-center justify-center text-center lg:flex-row lg:items-start lg:justify-start lg:px-20 lg:text-left">
                    <span class=" block h-[56px] w-[56px] lg:h-[116px] lg:w-[116px]">
                      <img
                        alt=""
                        id="storeFrontBannerImage"
                        width="50"
                        height="50"
                        decoding="async"
                        data-nimg="1"
                        class="h-[180px] max-h-full w-[56px] max-w-full rounded-full bg-[#fff] lg:h-[116px] lg:w-[116px]"
                        style="color:transparent"
                        src=""
                      />
                    </span>
                    <div class="ax-w-fit flex flex-col items-center lg:items-start ltr:lg:pl-4 rtl:lg:pr-4">
                      <span class="mx-0 items-center pb-3 font-halogen text-[20px] font-semibold text-white lg:mx-0 lg:items-start lg:text-[28px]">
                      </span>
                      <a
                        href={goTo(
                          `/seller/${sellerId}/products?q=${sellerId}`,
                        )}
                        class="inline-flex items-center justify-center whitespace-nowrap rounded-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 p-6 bg-omantel-electric-green font-Rubik text-sm text-black hover:bg-omantel-dark-green active:bg-omantel-dark-green focus:bg-omantel-dark-green active:border-2 active:border-omantel-dark-green focus:ring-2 active:ring-omantel-dark-green focus:ring-omantel-dark-green disabled:bg-omantel-platinum disabled:text-omantel-grey w-[180px]"
                        id="storeFrontButton"
                      >
                        View Seller products
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div
                class="px-4 py-4 pb-4 text-omantel-faded-black lg:px-12 lg:py-0"
                id="SellerInfo"
              >
                <div class="anchor-shop-tab">
                  <div class="anchor-shop-tab__container hidden gap-6 border-b border-[#ddd] lg:flex">
                    <div class="anchor-shop-tab__tab margin-right-4">
                      <span class="anchor-shop-tab__tab-link inline-flex cursor-pointer py-3   border-b-2 border-omantel-electric-green font-medium">
                        Seller Reviews
                      </span>
                    </div>
                    <div class="anchor-shop-tab__tab margin-right-4">
                      <span class="anchor-shop-tab__tab-link inline-flex cursor-pointer py-3  ">
                        About Seller
                      </span>
                    </div>
                    <div class="anchor-shop-tab__tab margin-right-4">
                      <span class="anchor-shop-tab__tab-link inline-flex cursor-pointer py-3  ">
                        Return Policy
                      </span>
                    </div>
                  </div>
                </div>
                <div class="anchor-shop-tab__select-container block py-4 lg:hidden">
                  <button
                    type="button"
                    role="combobox"
                    aria-controls="radix-:R169uujtqsva:"
                    aria-expanded="false"
                    aria-autocomplete="none"
                    dir="ltr"
                    data-state="closed"
                    class="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background data-[placeholder]:opacity-50 focus:outline-none focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&amp;>span]:line-clamp-1 data-[placeholder]:lg:text-sm anchor-shop-tab__select"
                  >
                    <span style="pointer-events:none">Seller Reviews</span>
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
                      class="lucide lucide-chevron-down h-4 w-4 text-black opacity-100"
                      aria-hidden="true"
                    >
                      <path d="m6 9 6 6 6-6"></path>
                    </svg>
                  </button>
                </div>
                <div class="container-fluid">
                  <div class="container-width">
                    <div>
                      <div class="ratting-wrapper flex  flex-col p-4 lg:flex-row lg:p-12">
                        <div class="basis-2/5 pr-4 lg:ltr:pr-16 lg:rtl:pl-16">
                          <p
                            class="mb-[24px] text-2xl font-semibold"
                            id="reviewsHeading"
                          >
                            Reviews
                          </p>
                          <div class="flex h-full items-start justify-start">
                            <div class=" basis-full">
                              <div class="animate-pulse space-y-4">
                                <div class="mb-6 mt-7 flex">
                                  <div class="h-10 w-16 rounded bg-gray-300">
                                  </div>
                                  <div class="ml-4">
                                    <div class="h-6 w-24 rounded bg-gray-300">
                                    </div>
                                    <div class="mt-2 h-4 w-32 rounded bg-gray-300">
                                    </div>
                                  </div>
                                </div>
                                <div>
                                  <div class="mb-2 flex justify-between">
                                    <div class="h-4 w-12 rounded bg-gray-300">
                                    </div>
                                    <div class="h-4 w-8 rounded bg-gray-300">
                                    </div>
                                  </div>
                                  <div class="h-3 w-full rounded bg-gray-300">
                                  </div>
                                </div>
                                <div>
                                  <div class="mb-2 flex justify-between">
                                    <div class="h-4 w-12 rounded bg-gray-300">
                                    </div>
                                    <div class="h-4 w-8 rounded bg-gray-300">
                                    </div>
                                  </div>
                                  <div class="h-3 w-full rounded bg-gray-300">
                                  </div>
                                </div>
                                <div>
                                  <div class="mb-2 flex justify-between">
                                    <div class="h-4 w-12 rounded bg-gray-300">
                                    </div>
                                    <div class="h-4 w-8 rounded bg-gray-300">
                                    </div>
                                  </div>
                                  <div class="h-3 w-full rounded bg-gray-300">
                                  </div>
                                </div>
                                <div>
                                  <div class="mb-2 flex justify-between">
                                    <div class="h-4 w-12 rounded bg-gray-300">
                                    </div>
                                    <div class="h-4 w-8 rounded bg-gray-300">
                                    </div>
                                  </div>
                                  <div class="h-3 w-full rounded bg-gray-300">
                                  </div>
                                </div>
                                <div>
                                  <div class="mb-2 flex justify-between">
                                    <div class="h-4 w-12 rounded bg-gray-300">
                                    </div>
                                    <div class="h-4 w-8 rounded bg-gray-300">
                                    </div>
                                  </div>
                                  <div class="h-3 w-full rounded bg-gray-300">
                                  </div>
                                </div>
                                <div class="mt-6 h-10 w-48 rounded bg-gray-300">
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="w-full border-r-0 pl-0 lg:ltr:border-l lg:ltr:pl-16 lg:rtl:border-r lg:rtl:pr-16">
                          <div class="review-list-container">
                            <div class="rating-filter-container flex border-b border-[#DDD] py-4 lg:ltr:justify-end lg:rtl:justify-end">
                              <div class="sort-by-dropdown hidden flex-row flex-wrap gap-2 align-middle ltr:justify-end rtl:justify-start lg:flex English ">
                                <label class="text-sm peer-disabled:cursor-not-allowed peer-disabled:opacity-70 font-normal leading-10">
                                  Sort:
                                </label>
                                <button
                                  type="button"
                                  role="combobox"
                                  aria-controls="radix-:R9ba9uujtqsva:"
                                  aria-expanded="false"
                                  aria-autocomplete="none"
                                  dir="ltr"
                                  data-state="closed"
                                  class="flex h-10 items-center justify-between rounded-md border-input bg-background text-sm ring-offset-background data-[placeholder]:opacity-50 focus:outline-none focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&amp;>span]:line-clamp-1 data-[placeholder]:lg:text-sm sort-by-label-dropdown w-max min-w-max border-0 p-0 font-medium text-omantel-secondary-blue"
                                >
                                  <span style="pointer-events:none">
                                    Most Recent
                                  </span>
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
                                    class="lucide lucide-chevron-down h-4 w-4 text-black opacity-100"
                                    aria-hidden="true"
                                  >
                                    <path d="m6 9 6 6 6-6"></path>
                                  </svg>
                                </button>
                                <span class="mx-[5px] mt-[10px] h-4 w-[0.8px] bg-omantel-grey">
                                </span>
                                <label class="text-sm peer-disabled:cursor-not-allowed peer-disabled:opacity-70 font-normal leading-10">
                                  Ratings:
                                </label>
                                <button
                                  type="button"
                                  role="combobox"
                                  aria-controls="radix-:Rlba9uujtqsva:"
                                  aria-expanded="false"
                                  aria-autocomplete="none"
                                  dir="ltr"
                                  data-state="closed"
                                  class="flex h-10 items-center justify-between rounded-md border-input bg-background text-sm ring-offset-background data-[placeholder]:opacity-50 focus:outline-none focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&amp;>span]:line-clamp-1 data-[placeholder]:lg:text-sm sort-by-label-dropdown w-max min-w-max border-0 p-0 font-medium text-omantel-secondary-blue"
                                >
                                  <span style="pointer-events:none">All</span>
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
                                    class="lucide lucide-chevron-down h-4 w-4 text-black opacity-100"
                                    aria-hidden="true"
                                  >
                                    <path d="m6 9 6 6 6-6"></path>
                                  </svg>
                                </button>
                                <span class="mx-[5px] mt-[10px] h-4 w-[0.8px] bg-omantel-grey">
                                </span>
                                <label class="text-sm peer-disabled:cursor-not-allowed peer-disabled:opacity-70 font-normal leading-10">
                                  Language:
                                </label>
                                <button
                                  type="button"
                                  role="combobox"
                                  aria-controls="radix-:R11ba9uujtqsva:"
                                  aria-expanded="false"
                                  aria-autocomplete="none"
                                  dir="ltr"
                                  data-state="closed"
                                  class="flex h-10 items-center justify-between rounded-md border-input bg-background text-sm ring-offset-background data-[placeholder]:opacity-50 focus:outline-none focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&amp;>span]:line-clamp-1 data-[placeholder]:lg:text-sm sort-by-label-dropdown w-max min-w-max border-0 p-0 font-medium text-omantel-secondary-blue"
                                >
                                  <span style="pointer-events:none">
                                    English
                                  </span>
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
                                    class="lucide lucide-chevron-down h-4 w-4 text-black opacity-100"
                                    aria-hidden="true"
                                  >
                                    <path d="m6 9 6 6 6-6"></path>
                                  </svg>
                                </button>
                              </div>
                              <div class="filter-btn block font-medium lg:hidden">
                                <button
                                  type="button"
                                  aria-haspopup="dialog"
                                  aria-expanded="false"
                                  aria-controls="radix-:R2ba9uujtqsva:"
                                  data-state="closed"
                                  class="btn flex items-center lg:hidden"
                                >
                                  <img
                                    alt="Filter menu"
                                    loading="lazy"
                                    width="20"
                                    height="20"
                                    decoding="async"
                                    data-nimg="1"
                                    class="inline h-6 w-6 ltr:mr-3 rtl:ml-3"
                                    style="color:transparent"
                                    src="/icons/filter.svg"
                                  />Filters
                                </button>
                              </div>
                            </div>
                            <div class="review-list py-4">
                              <div class="flex items-center justify-center font-medium">
                                No Reviews Found
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
