import { useDevice, useScript } from "@deco/deco/hooks";
import { ImageObject } from "apps/commerce/types.ts";
import { useId } from "../../../sdk/useId.ts";
import Icon from "../../ui/Icon.tsx";
import Slider from "../../ui/slider/index.ts";
import SliderJS from "./SliderJS.tsx";

interface Props {
  images: ImageObject[];
  highlight?: string;
}

function Thumbnail(props: { image: ImageObject; index: number; id: string }) {
  const { image, index, id } = props;

  return (
    <div>
      <label
        htmlFor={id}
        class="-mt-[1px] flex h-[90px] w-[90px] cursor-pointer overflow-hidden rounded-xl border-[1px] bg-transparent p-0 focus:outline-none border-[#DDDDDD] group-data-[selected]:border-[#95C655]"
        data-index={index}
        aria-label={`Select slide ${index + 1}`}
        tabindex={-1}
      >
        <img
          alt={image.alternateName}
          loading="lazy"
          src={image.url!}
          width={90}
          height={90}
          class="rounded-xl object-contain p-1.5"
        />
      </label>
    </div>
  );
}

export default function ImageGallery(props: Props) {
  const { images: _images, highlight } = props;
  const isMobile = useDevice() !== "desktop";

  const images: (ImageObject & { id: string })[] = _images.map((image) => ({
    ...image,
    id: useId(),
  }));

  if (isMobile) {
    return (
      <Slider.Root
        js={{ infinite: true, slidesToScroll: 1 }}
        dir="ltr"
      >
        <Slider.Carousel>
          {images.map((image, index) => (
            <Slider.Item
              index={index}
              tabindex={-1}
            >
              <div class="react-transform-wrapper transform-component-module_wrapper__SPB86 ">
                <div
                  class="react-transform-component transform-component-module_content__FBWxo "
                  style="transform: translate(0px, 0px) scale(1);"
                >
                  <img
                    height={398}
                    class="object-contain aspect-square"
                    src={image.url}
                    alt={image.alternateName}
                  />
                </div>
              </div>
              <div class="tools flex justify-center gap-1">
                <button>
                  <img
                    alt="Zoom In"
                    loading="lazy"
                    width="28"
                    height="28"
                    decoding="async"
                    data-nimg="1"
                    class="!p-0"
                    src="/icons/zoom-icon.svg"
                    data-cookiecategory="21"
                    style="color: transparent;"
                  />
                </button>
              </div>
            </Slider.Item>
          ))}
        </Slider.Carousel>
        <Slider.Dots
          class="flex items-center justify-center gap-5 mb-3"
          dot={
            <Slider.Dot class="size-5">
              <span class="size-5 text-black leading-5 text-[28px] text-center opacity-25 group-data-[selected]:opacity-75">
                •
              </span>
            </Slider.Dot>
          }
        />
      </Slider.Root>
    );
  }

  return (
    <div
      class="pdp-image-container flex pr-[24px]"
      id="PDPImageGallery"
    >
      <Slider.Root
        js={{
          infinite: true,
          axis: "vertical",
          slidesToScroll: 1,
          component: SliderJS,
        }}
        class="relative mr-6 mt-[30px] h-full w-[90px] pt-1 shrink-0"
      >
        <Slider.PrevButton
          class="prev-arrow right-12 top-1/2 z-10 h-8 -translate-y-2/4 cursor-pointer p-0 text-center text-black opacity-75 transition-all duration-300 ease-in-out hover:border-[#000000] hover:opacity-100 disabled:cursor-not-allowed disabled:opacity-25 flex items-center justify-center w-full disabled:hidden"
          aria-label="Previous slide"
        >
          <Icon id="arrow-up-2" size={30} />
        </Slider.PrevButton>
        <Slider.Carousel class="flex-col h-[360px] [--slide-size:90px] [--slide-spacing:0px]">
          {images.map((image, index) => (
            <Slider.Item index={index} class="pb-4 group">
              <Thumbnail image={image} index={index} id={image.id} />
            </Slider.Item>
          ))}
        </Slider.Carousel>
        <Slider.NextButton
          class="next-arrow border-om-grey-0 top-1/2 z-10 mt-[36px] h-8 -translate-y-2/4 cursor-pointer p-0 text-center text-black opacity-75 transition-all duration-300 ease-in-out hover:border-[#000000] hover:opacity-100 disabled:cursor-not-allowed disabled:opacity-25 flex items-center justify-center w-full disabled:hidden"
          aria-label="Next slide"
        >
          <Icon id="arrow-down-2" size={30} />
        </Slider.NextButton>
      </Slider.Root>
      <div class="focus-image relative flex max-h-min min-h-[548px] w-full flex-col items-center justify-center overflow-hidden rounded-2xl rounded-tl-none">
        {highlight && (
          <button
            type="button"
            class="inline-flex items-center justify-center whitespace-nowrap font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-primary-foreground sale-btn absolute top-0 z-[5] h-8 rounded-none rounded-ee-md rounded-ss-md rounded-tl-none bg-omantel-secondary-blue p-1 px-3.5 text-sm hover:bg-omantel-blue ltr:left-0 rtl:left-auto rtl:right-0 lg:text-base uppercase"
            id="product-d-Caption"
          >
            {highlight}
          </button>
        )}
        {images.map((image, index) => (
          <div>
            <input
              type="radio"
              name="image-gallery"
              id={image.id}
              class="hidden peer"
              checked={index === 0}
            />
            <div
              class="absolute inset-0 hidden peer-checked:block"
              style="height: 548px; width: auto; overflow: hidden;"
              hx-on:mouseenter="this.style.setProperty('--scale', '2')"
              hx-on:mouseleave="this.style.setProperty('--scale', '1')"
              hx-on:mousemove={useScript(() => {
                // @ts-expect-error Ignore type error
                const div = this as HTMLElement;
                const e = event as MouseEvent;

                const { left, top } = div.getBoundingClientRect();
                const x = (e.pageX - left - window.scrollX) /
                  div.offsetWidth * 100;
                const y = (e.pageY - top - window.scrollY) /
                  div.offsetHeight * 100;

                div.style.setProperty("--x", `${x}%`);
                div.style.setProperty("--y", `${y}%`);
              })}
            >
              <div
                class="absolute inset-0"
                style={{
                  transformOrigin: "var(--x) var(--y)",
                  height: "100%",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center center",
                  backgroundSize: "contain",
                  transition: "transform 0.1s ease-out",
                  backgroundImage: `url('${image.url}')`,
                  transform: "scale(var(--scale))",
                }}
              >
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
