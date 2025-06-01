import Image, { ImagePropsWithAlt } from "../images/Image.tsx";

/**
 * @title {{{image.alt}}}
 */
export interface ItemProps {
  url: string;
  image: ImagePropsWithAlt;
}

export default function Item({ url, image }: ItemProps) {
  return (
    <a
      hreflang="en-US"
      href={url}
    >
      <div class="relative flex h-[100px] lg:h-[168px]  lg:max-h-full lg:w-[318px] lg:max-w-[99%] flex-row items-center justify-center rounded-[8px] border border-[#E0E0E0] bg-white bg-clip-border  py-[19px] text-gray-700 shadow-none">
        <div class="lg:h-[130px]- brand-image-wrapper  relative m-0 flex h-[78px] w-[120px] shrink-0  justify-center overflow-hidden  bg-white  text-gray-700 lg:max-h-full lg:w-[200px] lg:max-w-full">
          <Image
            alt={image.alt}
            loading="lazy"
            sources={{
              width: image.width || 318,
              height: image.height || 168,
              src: image.src,
            }}
          />
        </div>
      </div>
    </a>
  );
}
