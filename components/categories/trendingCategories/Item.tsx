import Image, { ImagePropsWithAlt } from "../../images/Image.tsx";

/**
 * @title {{{name}}}
 */
export interface ItemProps {
  name: string;
  url: string;
  image: ImagePropsWithAlt;
}

export default function Item({ name, url, image }: ItemProps) {
  return (
    <a
      hreflang="en-US"
      tabindex={-1}
      href={url}
      class="w-full inline-block"
    >
      <div class="mr-1 flex flex-col items-center justify-center text-center lg:mr-5">
        <div class="flex h-24 w-24 items-center justify-center overflow-hidden rounded-full bg-omantel-smoke p-3 lg:h-48 lg:w-48">
          <Image
            sources={image}
            alt={image.alt}
            loading="lazy"
            class="size-20 lg:size-32"
          />
        </div>
        <div class="p-3 text-xs font-medium lg:text-base">
          {name}
        </div>
      </div>
    </a>
  );
}
