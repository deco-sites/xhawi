import { useDevice } from "@deco/deco/hooks";
import { Product } from "apps/commerce/types.ts";
import Card from "../../components/product/shelf/Card.tsx";
import Icon from "../../components/ui/Icon.tsx";
import Slider from "../../components/ui/slider/index.ts";
import { placeholderProduct } from "../../sdk/products.ts";

interface Props {
  products: Product[] | null;
  title: string;
  /**
   * @ignore
   */
  isLoadingFallback?: boolean;
}

export default function ProductShelf(props: Props) {
  const { title, isLoadingFallback = false } = props;

  if (!props.products?.length && !isLoadingFallback) {
    return null;
  }

  const products = isLoadingFallback
    ? Array.from({ length: 12 }).map(() => placeholderProduct())
    : props.products || [];
  const isMobile = useDevice() !== "desktop";

  return (
    <div class="container-fluid !bg-omantel-background-grey">
      <div class="container-width">
        <div id="homePageproductCarousel1">
          <div class="Product-carousel min-h-110 flex flex-col p-0 transition-all lg:mx-[0px!important] lg:max-h-192 [&_.slick-slide]:p-2.5">
            <div class="ProductCarouselMobile_1 lg:pt-[48px] pt-[30px]">
              <div class="Product-carousel-heading sm-0:text-base/[24px] text-om-black mb-[16px] h-[40px] w-full overflow-hidden text-ellipsis whitespace-nowrap p-[8px] font-semibold ltr:pr-[100px] rtl:pl-[100px] sm:text-2xl/[36px] lg:mb-[24px] lg:h-[48px]">
                {title}
              </div>
              {!isMobile && (
                <div
                  class="carouselSliderContainer desktop relative hidden lg:block"
                  style="direction: ltr;"
                >
                  <Slider.Root
                    js={{ align: "start" }}
                    class="react-multi-carousel-list carousel-container "
                    dir="ltr"
                  >
                    <Slider.Carousel
                      class="react-multi-carousel-track "
                      style="transition: none; overflow: hidden; transform: translate3d(0px, 0px, 0px);"
                    >
                      {products.map((product, index) => (
                        <Slider.Item
                          index={index}
                          data-index={index}
                          aria-hidden="false"
                          class="react-multi-carousel-item react-multi-carousel-item--active carousel-item"
                          style="flex: 1 0 25%; position: relative; width: auto;"
                        >
                          {isLoadingFallback
                            ? <Card.LoadingFallback />
                            : <Card product={product} />}
                        </Slider.Item>
                      ))}
                    </Slider.Carousel>
                    <div
                      class="custom-button !top-[-58px] flex justify-center gap-2 lg:!top-[-72px]"
                      style="text-align: center;"
                    >
                      <button
                        type="button"
                        disabled
                        class="'border-[#ddd] flex h-[40px] w-[40px] items-center justify-center rounded-full bg-white lg:h-[48px] lg:w-[48px] rotate-180"
                        style="margin-right: 10px;"
                      >
                        <Icon
                          id="right-arrow-small"
                          width={18}
                          height={18}
                          class="opacity-20"
                        />
                      </button>
                      <button
                        type="button"
                        class="flex h-[40px] w-[40px] items-center  justify-center rounded-full border border-[#dddddd] bg-white lg:h-[48px] lg:w-[48px]"
                      >
                        <Icon
                          id="right-arrow-small"
                          width={18}
                          height={18}
                          class="opacity-100"
                        />
                      </button>
                    </div>
                  </Slider.Root>
                </div>
              )}
              {isMobile && (
                <div
                  class="carouselSliderContainer relative lg:hidden"
                  style="direction: ltr;"
                >
                  <Slider.Root
                    js={{ align: "start" }}
                    class="react-multi-carousel-list carousel-container [--slide-spacing:0rem] [--slide-size:207px]"
                    dir="ltr"
                  >
                    <Slider.Carousel class="react-multi-carousel-track">
                      {products.map((product, index) => (
                        <Slider.Item
                          index={index}
                          data-index={index}
                          aria-hidden="false"
                          class="react-multi-carousel-item react-multi-carousel-item--active carousel-item"
                        >
                          {isLoadingFallback
                            ? <Card.LoadingFallback />
                            : <Card product={product} />}
                        </Slider.Item>
                      ))}
                    </Slider.Carousel>
                    <div
                      class="custom-button !top-[-58px] flex justify-center gap-2 lg:!top-[-72px]"
                      style="text-align: center;"
                    >
                      <Slider.PrevButton
                        type="button"
                        disabled
                        class="'border-[#ddd] flex h-[40px] w-[40px] items-center justify-center rounded-full bg-white lg:h-[48px] lg:w-[48px] rotate-180"
                        style="margin-right: 10px;"
                      >
                        <Icon
                          id="right-arrow-small"
                          width={18}
                          height={18}
                          class="opacity-20"
                        />
                      </Slider.PrevButton>
                      <Slider.NextButton
                        type="button"
                        class="flex h-[40px] w-[40px] items-center  justify-center rounded-full border border-[#dddddd] bg-white lg:h-[48px] lg:w-[48px]"
                      >
                        <Icon
                          id="right-arrow-small"
                          width={18}
                          height={18}
                          class="opacity-100"
                        />
                      </Slider.NextButton>
                    </div>
                  </Slider.Root>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function LoadingFallback(_props: Props) {
  const props: Props = {
    products: [],
    title: _props.title,
    isLoadingFallback: true,
  };

  return <ProductShelf {...props} />;
}
