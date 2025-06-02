import Dots from "../../components/images/carousel/Dots.tsx";
import Item, { ItemProps } from "../../components/images/carousel/Item.tsx";
import Icon from "../../components/ui/Icon.tsx";
import Slider from "../../components/ui/slider/index.ts";
import { useI18n } from "../../sdk/i18n.ts";

interface Props {
  items: ItemProps[];
  /**
   * @description Helps with performance by preloading images. Should be set to true if the carousel is the first thing the user sees.
   */
  preload?: boolean;
}

export default function Carousel(props: Props) {
  const { items, preload = false } = props;
  const { dir } = useI18n(props);

  return (
    <div class="bg-omantel-background-grey">
      <div class="container-width">
        <Slider.Root
          js={{ align: "center", interval: 5000, dir }}
          class="relative overflow-hidden h-[400px] sm:h-[310px] md:h-[310px] lg:h-[310px]"
          dir={dir}
        >
          <Slider.Carousel class="w-full h-full flex absolute top-0">
            {items.map((item, index) => (
              <Slider.Item index={index}>
                <Item
                  key={item.title}
                  {...item}
                  dir={dir}
                  preload={preload && index === 0}
                />
              </Slider.Item>
            ))}
          </Slider.Carousel>
          <Slider.PrevButton
            class="align-middle select-none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-12 max-w-[48px] max-h-[48px] text-sm text-white active:bg-white/30 absolute left-0 top-2/4 ml-2 hidden -translate-y-2/4 -rotate-90 rounded-sm bg-gray-800 opacity-30 hover:bg-gray-800 hover:opacity-60 lg:left-4 lg:ml-4 lg:block px-0 py-[8px] h-[24px] w-24px"
            type="button"
          >
            <span class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
              <Icon id="chevron-up" size={12} />
            </span>
          </Slider.PrevButton>
          <Slider.NextButton
            class="align-middle select-none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-12 max-w-[48px] max-h-[48px] text-sm text-white active:bg-white/30 absolute !right-0 top-2/4 mr-2 hidden -translate-y-2/4 rotate-90 rounded-sm bg-gray-800 opacity-30 hover:bg-gray-800 hover:opacity-60 lg:!right-4 lg:mr-4 lg:block px-0 py-[8px] h-[24px] w-24px"
            type="button"
          >
            <span class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
              <Icon id="chevron-up" size={12} />
            </span>
          </Slider.NextButton>
          <Dots />
        </Slider.Root>
      </div>
    </div>
  );
}
