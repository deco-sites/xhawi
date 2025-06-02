import Item, { type ItemProps } from "../../components/brandCarousel/Item.tsx";
import Icon from "../../components/ui/Icon.tsx";
import Slider from "../../components/ui/slider/index.ts";
import { useI18n } from "../../sdk/i18n.ts";

interface Props {
  title: string;
  brands: ItemProps[];
}

function paginate<T>(arr: T[], size: number): T[][] {
  return Array.from(
    { length: Math.ceil(arr.length / size) },
    (_, i) => arr.slice(i * size, (i + 1) * size),
  );
}

export default function BrandCarousel(props: Props) {
  const { brands, title } = props;
  const { dir } = useI18n(props);

  const brandPages = paginate(brands, 8);

  return (
    <div class="pb-4 lg:pb-0 lg:min-h-[540px]">
      <div class="bg-white">
        <div class="container-fluid">
          <div class="container-width">
            <div class="flex flex-col lg:py-[48px] py-[30px]" dir={dir}>
              <Slider.Root
                js={{ align: "start", infinite: false, dir }}
                class="relative"
              >
                <div
                  class="sm-0:text-base/[24px] text-om-black mb-[16px] h-[40px] w-full overflow-hidden text-ellipsis whitespace-nowrap p-[8px] font-semibold ltr:pr-[100px] rtl:pl-[100px] sm:text-2xl/[36px] lg:mb-[24px] lg:h-[48px]"
                  id="brandCarouselHeading"
                >
                  {title}
                </div>
                <div class="flex gap-3 absolute top-0 right-0 rtl:left-0 rtl:right-auto">
                  <Slider.PrevButton class="z-10 flex size-10 lg:size-12 items-center justify-center rounded-full border border-omantel-platinum p-0 text-center text-black transition-all duration-300 ease-in-out disabled:cursor-not-allowed group">
                    <Icon
                      id="right-arrow-small"
                      size={12}
                      class="rotate-180 group-disabled:opacity-25 transition-opacity duration-300 rtl:rotate-180"
                    />
                  </Slider.PrevButton>
                  <Slider.NextButton class="z-10 flex size-10 lg:size-12 items-center justify-center rounded-full border border-omantel-platinum p-0 text-center text-black transition-all duration-300 ease-in-out disabled:cursor-not-allowed group">
                    <Icon
                      id="right-arrow-small"
                      size={12}
                      class="group-disabled:opacity-25 transition-opacity duration-300 rtl:rotate-180"
                    />
                  </Slider.NextButton>
                </div>
                <div class="slider-container" style={{ direction: dir }}>
                  <Slider.Carousel dir={dir}>
                    {brandPages.map((brands, index) => (
                      <Slider.Item
                        index={index}
                        data-index={index}
                        tabindex={-1}
                        class="grid grid-cols-2 gap-2 lg:grid-cols-4 lg:gap-6"
                      >
                        {brands.map((brand, index) => (
                          <Item key={index} {...brand} />
                        ))}
                      </Slider.Item>
                    ))}
                  </Slider.Carousel>
                </div>
              </Slider.Root>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function LoadingFallback(props: Props) {
  return <BrandCarousel {...props} />;
}

/**
<Slider.Item
                      index={0}
                      data-index="0"
                      tabindex={-1}
                      class="grid grid-cols-2 gap-2 lg:grid-cols-4 lg:gap-6"
                    >
                      <Item
                        url="/en/b/samsung"
                        image={{
                          src:
                            "https://images.ctfassets.net/1bwyifda87ii/6adgt3RQak4gnKzObvBZIq/7dd14feba1b7c6137bd0661e62dbff86/Homepage_Banner_Desiktop___318x168___Samsung_logo.jpg",
                          alt: "Samsung",
                        }}
                      />
                      <Item
                        url="/en/b/jabra"
                        image={{
                          src:
                            "https://images.ctfassets.net/1bwyifda87ii/2wh0w2oPLUdZVMCzFbG5Wi/4fb475ac9a3bd3c4582b13e58d21602c/Homepage_Banner_Desiktop___318x168___Jabra_logo.jpg",
                          alt: "Jabra",
                        }}
                      />
                      <Item
                        url="/en/b/huawei"
                        image={{
                          src:
                            "https://images.ctfassets.net/1bwyifda87ii/xB9zrNLPUTWs7c19S4L1z/c150ae070d406ef5d9a8a897edc30711/Anchorshop___318x318___logo_Huawei.png",
                          alt: "Huawei",
                        }}
                      />
                      <Item
                        url="/en/b/osmo"
                        image={{
                          src:
                            "https://images.ctfassets.net/1bwyifda87ii/12hDHtX8KpYMGEDD4vdkcv/c627575b64d6dabf699dcdb1597c2fab/ShopByBrand___318x168___OSMO_logo.jpg",
                          alt: "OSMO",
                        }}
                      />
                      <Item
                        url="/en/b/dermaloop"
                        image={{
                          src:
                            "https://images.ctfassets.net/1bwyifda87ii/4tIXfnjwQMSWitzxdR9Uje/5e7343556e21567609b556b4928d5833/ShopByBrand___318x168___Dermaloop_logo.jpg",
                          alt: "Dermaloop",
                        }}
                      />
                      <Item
                        url="/en/b/nam"
                        image={{
                          src:
                            "https://images.ctfassets.net/1bwyifda87ii/1NKeXSs7t7LYhPgp8LheHY/ce48d3688a2ea15ce764d996f2051e6c/Homepage_Banner_Desiktop___318x168___NAM_store_logo.jpg",
                          alt: "NAM",
                        }}
                      />
                      <Item
                        url="/en/b/pasabahce"
                        image={{
                          src:
                            "https://images.ctfassets.net/1bwyifda87ii/GJUSv0OoKYk69NrMyOmGB/54cbacc7f7e882e512f88324103d7d9e/ShopByBrand___318x168___Pasabahce_logo.jpg",
                          alt: "Pasabahce",
                        }}
                      />
                      <Item
                        url="/en/b/hama"
                        image={{
                          src:
                            "https://images.ctfassets.net/1bwyifda87ii/2TC9r0pYp8xib8V5DCQH59/a845fa9a5591efe8dc13e906486b2f31/Homepage_Banner_Desiktop___318x168___Hama_logo.jpg",
                          alt: "Hama",
                        }}
                      />
                    </Slider.Item>
                    <Slider.Item
                      index={1}
                      data-index="1"
                      tabindex={-1}
                      class="grid grid-cols-2 gap-2 lg:grid-cols-4 lg:gap-6"
                    >
                      <Item
                        url="/en/b/iddesign"
                        image={{
                          src:
                            "https://images.ctfassets.net/1bwyifda87ii/1mWZyr3uDwr5JuThClj3SU/8bb572baba2345f56d87e3246facab23/ShopByBrand___318x168___ID_Design_logo.jpg",
                          alt: "ID Design",
                        }}
                      />
                    </Slider.Item>
 */
