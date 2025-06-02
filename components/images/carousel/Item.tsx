import Image, { type ImageProps } from "../Image.tsx";

/**
 * @title {{{title.text}}}
 */
export interface ItemProps {
  image: {
    desktop: ImageProps;
    mobile: ImageProps;
    alt: string;
  };
  title: {
    text: string;
    /**
     * @format color-input
     */
    color?: string;
  };
  /**
   * @format textarea
   */
  description?: string;
  button?: {
    text?: string;
    link?: string;
  };
  /**
   * @ignore
   */
  preload?: boolean;
  /**
   * @ignore
   */
  dir: "ltr" | "rtl";
}

export default function Item(props: ItemProps) {
  const { image, title, description, button, preload = false, dir } = props;

  return (
    <div class="w-full h-full inline-block flex-none" dir={dir}>
      <section class="relative flex h-full justify-center transition-all lg:items-center lg:justify-normal  cursor-pointer">
        <Image
          sources={{
            desktop: { ...image.desktop, media: "(min-width: 481px)" },
            mobile: { ...image.mobile, media: "(max-width: 480px)" },
            className: "max-h-[100%] min-h-full w-full",
          }}
          alt={image.alt}
          class="absolute z-0 h-[400px] lg:w-full sm:h-[310px] md:h-[310px] lg:h-[310px] w-full"
          preload={preload}
          loading={preload ? "eager" : "lazy"}
        />
        <div
          style={{ color: title.color || "white" }}
          class="z-0 lg:flex lg:flex-col pt-8 text-center ltr:lg:px-32 ltr:lg:text-left rtl:lg:px-32 lg:rtl:text-end"
        >
          <span class="font-sans text-[10px] font-semibold uppercase leading-[18px] lg:text-[12px]">
          </span>
          <span class="block font-halogen text-[32px] font-normal leading-[48px] lg:text-[40px]">
            <p>{title.text}</p>
          </span>
          <span class="block py-4 font-sans text-sm font-normal leading-6 lg:text-base">
            {description}
          </span>
          {button && button.link && button.text && (
            <a
              href={button.link}
              class="inline-flex items-center justify-center whitespace-nowrap rounded-md ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 p-6 bg-black text-omantel-electric-green hover:bg-omantel-jet-grey hover:text-white active:bg-omantel-jet-grey active:border-2 active:border-omantel-electric-green focus:border-white focus:ring-2 active:ring-omantel-electric-green active:text-white disabled:bg-omantel-platinum disabled:text-omantel-grey h-[36px] w-[180px] text-base font-medium leading-6 lg:h-[48px]"
            >
              {button.text}
            </a>
          )}
        </div>
      </section>
    </div>
  );
}
