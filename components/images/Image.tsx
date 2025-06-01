import { ImageWidget } from "apps/admin/widgets.ts";
import DecoImage from "apps/website/components/Image.tsx";
import { Picture, Source } from "apps/website/components/Picture.tsx";

export interface ImageProps {
  src: ImageWidget;
  width?: number;
  height?: number;
}

type ResponsiveSources = {
  desktop: ImageProps & { media?: string };
  mobile: ImageProps & { media?: string };
  className?: string;
};
type Sources = ImageProps | ResponsiveSources;

interface Props {
  sources: Sources;
  alt?: string;
  loading?: "eager" | "lazy";
  preload?: boolean;
  class?: string;
}

function isResponsive(sources: Sources): sources is ResponsiveSources {
  return "desktop" in sources && "mobile" in sources;
}

export default function Image({
  sources,
  alt,
  loading = "lazy",
  preload = false,
  class: className,
}: Props) {
  if (
    (isResponsive(sources) && !sources.desktop.src && !sources.mobile.src) ||
    (!isResponsive(sources) && !sources.src)
  ) {
    console.warn("No image source provided", { sources, alt });
    return null;
  }

  if (isResponsive(sources)) {
    return (
      <Picture className={className} preload={preload}>
        <Source
          src={sources.desktop.src}
          width={sources.desktop.width || 0}
          height={sources.desktop.height}
          media={sources.desktop.media || "(min-width: 768px)"}
          fetchPriority={loading === "eager" ? "high" : "low"}
          loading={loading}
        />
        <Source
          src={sources.mobile.src}
          width={sources.mobile.width || 0}
          height={sources.mobile.height}
          media={sources.mobile.media || "(max-width: 767px)"}
          fetchPriority={loading === "eager" ? "high" : "low"}
          loading={loading}
        />
        <img
          class={sources.className}
          src={sources.desktop.src}
          alt={alt}
          loading={loading}
          width={sources.desktop.width || 0}
          height={sources.desktop.height}
        />
      </Picture>
    );
  }

  return (
    <DecoImage
      className={className}
      src={sources.src}
      alt={alt}
      width={sources.width || 0}
      height={sources.height}
    />
  );
}
