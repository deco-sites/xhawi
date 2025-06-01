import Item, {
  type ItemProps,
} from "../../components/categories/trendingCategories/Item.tsx";
import Slider from "../../components/ui/slider/index.ts";

interface Props {
  categories: ItemProps[];
}

export default function TrendingCategories(props: Props) {
  const { categories } = props;

  return (
    <div class="container-fluid bg-white">
      <div class="container-width max-h-72 lg:max-h-[100%]">
        <div class="category-carousel mt-4 flex flex-col lg:mt-0 lg:px-0 lg:py-[48px] py-[30px]">
          <Slider.Root
            js={{
              align: "center",
              infinite: false,
              centerIfNotScrollable: true,
            }}
          >
            <div
              class="category-carousel-heading sm-0:text-base/[24px] text-om-black my-3 w-full font-semibold ltr:pr-[100px] rtl:pl-[100px] sm:text-2xl/[36px] lg:h-[48px]"
              id="CategoryCarouselHeading"
            >
              Trending categories
            </div>
            <Slider.Carousel class="[--slide-size:133px] lg:[--slide-size:229px]">
              {categories.map((category, index) => (
                <Slider.Item
                  index={index}
                  data-index={index}
                  tabindex={-1}
                  aria-hidden="false"
                >
                  <Item {...category} />
                </Slider.Item>
              ))}
            </Slider.Carousel>
          </Slider.Root>
        </div>
      </div>
    </div>
  );
}

export function LoadingFallback(props: Props) {
  return <TrendingCategories {...props} />;
}
