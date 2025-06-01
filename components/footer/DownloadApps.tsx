import Image, { ImagePropsWithAlt } from "../images/Image.tsx";

/**
 * @title {{{image.alt}}}
 */
interface Download {
  url: string;
  image: ImagePropsWithAlt;
}

export interface DownloadAppsProps {
  title: string;
  downloads: Download[];
}

export default function DownloadApps(props: DownloadAppsProps) {
  const { title, downloads } = props;

  return (
    <div class="mt-10 flex flex-col">
      <h2 class="text-base font-bold">{title}</h2>
      <div class="mt-4 flex flex-row gap-2 lg:gap-4">
        {downloads.map((download) => (
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={download.url}
          >
            <Image sources={download.image} />
          </a>
        ))}
      </div>
    </div>
  );
}
