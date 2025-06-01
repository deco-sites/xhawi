import { Product } from "apps/commerce/types.ts";
import Card from "../../components/product/shelf/Card.tsx";
import Icon from "../../components/ui/Icon.tsx";
import Slider from "../../components/ui/slider/index.ts";
import { placeholderProduct } from "../../sdk/products.ts";
import { clx } from "../../sdk/clx.ts";

interface Props {
  products: Product[] | null;
  title: string;
  spacing?: {
    /**
     * @title Bottom spacing
     * @description Whether to add bottom spacing to the product shelf
     */
    bottom?: boolean;
  };
  /**
   * @ignore
   */
  isLoadingFallback?: boolean;
}

export default function ProductShelf(props: Props) {
  const { title, isLoadingFallback = false, spacing } = props;

  if (!props.products?.length && !isLoadingFallback) {
    return null;
  }

  const products = isLoadingFallback
    ? Array.from({ length: 12 }).map(() => placeholderProduct())
    : props.products || [];

  return (
    <div class="container-fluid !bg-omantel-background-grey">
      <div class="container-width">
        <div id="homePageproductCarousel1">
          <div class="Product-carousel min-h-110 flex flex-col p-0 transition-all lg:mx-[0px!important] lg:max-h-192 [&_.slick-slide]:p-2.5">
            <Slider.Root
              js={{ align: "start" }}
              class={clx(
                "lg:pt-[48px] pt-[30px] [--slide-spacing:0rem] [--slide-size:207px]",
                spacing?.bottom && "lg:pb-[48px] pb-[30px]",
              )}
            >
              <div class="Product-carousel-heading sm-0:text-base/[24px] text-om-black mb-[16px] h-[40px] w-full overflow-hidden text-ellipsis whitespace-nowrap p-[8px] font-semibold ltr:pr-[100px] rtl:pl-[100px] sm:text-2xl/[36px] lg:mb-[24px] lg:h-[48px]">
                {title}
              </div>
              <div
                class="custom-button !top-[28px] flex justify-center gap-2 lg:!top-[-72px]"
                style="text-align: center;"
              >
                <Slider.PrevButton
                  type="button"
                  class="flex size-10 items-center justify-center rounded-full border border-[#dddddd] bg-white lg:size-12 rotate-180 mr-2.5 group"
                >
                  <Icon
                    id="right-arrow-small"
                    width={18}
                    height={18}
                    class="group-disabled:opacity-20 transition-opacity duration-300"
                  />
                </Slider.PrevButton>
                <Slider.NextButton
                  type="button"
                  class="flex size-10 items-center justify-center rounded-full border border-[#dddddd] bg-white lg:size-12 group"
                >
                  <Icon
                    id="right-arrow-small"
                    width={18}
                    height={18}
                    class="group-disabled:opacity-20 transition-opacity duration-300"
                  />
                </Slider.NextButton>
              </div>
              <div
                class="carouselSliderContainer relative"
                style="direction: ltr;"
              >
                <div
                  class="react-multi-carousel-list carousel-container"
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
                </div>
              </div>
            </Slider.Root>
          </div>
        </div>
      </div>
    </div>
  );
}

export function LoadingFallback(_props: Props) {
  const props: Props = {
    ..._props,
    products: [],
    isLoadingFallback: true,
  };

  return <ProductShelf {...props} />;
}
