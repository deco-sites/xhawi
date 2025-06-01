import Image, { ImagePropsWithAlt } from "../images/Image.tsx";

export interface CopyrightProps {
  logo: ImagePropsWithAlt;
  /**
   * @format textarea
   */
  copyright: string;
}

export default function Copyright(props: CopyrightProps) {
  const { logo, copyright } = props;

  return (
    <div class="flex items-center text-sm text-left lg:text-center">
      <div class="footer-logo-container mr-3 lg:mr-0">
        <Image
          sources={logo}
          loading="lazy"
          class="mb-[4px] ml-[5px] mr-4 inline-flex"
        />
      </div>
      <div class="footer-copyrights pr-9 text-sm">
        {copyright}
      </div>
    </div>
  );
}
