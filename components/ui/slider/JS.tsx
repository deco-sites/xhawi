import { useScript } from "@deco/deco/hooks";
import EmblaCarousel from "embla-carousel";
import EmblaCarouselAutoplay from "embla-carousel-autoplay";

declare global {
  interface Window {
    EmblaCarousel: typeof EmblaCarousel;
    EmblaCarouselAutoplay: typeof EmblaCarouselAutoplay;
  }
}

export interface Props {
  rootId: string;
  align?: "start" | "center" | "end";
  /**
   * @description The interval between slides in milliseconds
   */
  interval?: number;
  infinite?: boolean;
}

const setup = (
  {
    rootId,
    infinite,
    align,
    interval,
  }: Props,
) => {
  const root = document.getElementById(rootId);
  if (!root) {
    throw new Error(`Root element with id ${rootId} not found`);
  }

  const viewport = root.querySelector<HTMLElement>("[data-viewport]");
  if (!viewport) {
    throw new Error(`Viewport element with data-viewport not found`);
  }

  const nextButton = root.querySelector("[data-slide='next']");
  const prevButton = root.querySelector("[data-slide='prev']");
  const dots = root.querySelector("[data-dots]");

  const autoplay = interval && interval > 0
    ? EmblaCarouselAutoplay({ stopOnInteraction: false, delay: interval })
    : null;
  const plugins = [autoplay].filter((plugin) => plugin !== null);
  const embla = EmblaCarousel(viewport, {
    loop: infinite,
    align,
    slidesToScroll: "auto",
  }, plugins);

  prevButton?.addEventListener("click", () => {
    autoplay?.reset();
    embla.scrollPrev();
  }, false);
  nextButton?.addEventListener("click", () => {
    autoplay?.reset();
    embla.scrollNext();
  }, false);

  if (dots) {
    let dotNodes: HTMLElement[] = [];
    const dotElement = dots.innerHTML;

    const setupDots = (): void => {
      dots.innerHTML = embla
        .scrollSnapList()
        .map(() => dotElement)
        .join("");

      const scrollTo = (index: number): void => {
        embla.scrollTo(index);
      };

      dotNodes = Array.from(dots.querySelectorAll("[data-dot]"));
      dotNodes.forEach((dotNode, index) => {
        dotNode.addEventListener("click", () => {
          autoplay?.reset();
          scrollTo(index);
        }, false);
      });
    };

    const toggleActiveDot = (): void => {
      const previous = embla.previousScrollSnap();
      const selected = embla.selectedScrollSnap();
      dotNodes[previous]?.removeAttribute("data-selected");
      dotNodes[selected]?.setAttribute("data-selected", "");
    };

    embla
      .on("init", setupDots)
      .on("reInit", setupDots)
      .on("init", toggleActiveDot)
      .on("reInit", toggleActiveDot)
      .on("select", toggleActiveDot);
  }
};

export default function JS(props: Props) {
  return (
    <script
      type="module"
      defer
      dangerouslySetInnerHTML={{
        __html: useScript(setup, props),
      }}
    />
  );
}
