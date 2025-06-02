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
  /**
   * @description Whether to center the slides if they are not scrollable
   */
  centerIfNotScrollable?: boolean;
  dir?: "ltr" | "rtl";
}

const setup = (
  {
    rootId,
    infinite = false,
    align = "start",
    interval = 0,
    centerIfNotScrollable = false,
    dir = "ltr",
  }: Props,
) => {
  function setupEmbla() {
    const root = document.getElementById(rootId);
    if (!root) {
      throw new Error(`Root element with id ${rootId} not found`);
    }

    const viewport = root.querySelector<HTMLElement>("[data-viewport]");
    if (!viewport) {
      throw new Error(`Viewport element with data-viewport not found`);
    }
    const carousel = root.querySelector<HTMLElement>(
      "[data-slider]",
    );

    const nextButton = root.querySelector<HTMLButtonElement>(
      "[data-slide='next']",
    );
    const prevButton = root.querySelector<HTMLButtonElement>(
      "[data-slide='prev']",
    );

    const dots = root.querySelector("[data-dots]");

    const autoplay = interval && interval > 0
      ? EmblaCarouselAutoplay({ stopOnInteraction: false, delay: interval })
      : null;
    const plugins = [autoplay].filter((plugin) => plugin !== null);
    const embla = EmblaCarousel(viewport, {
      loop: infinite,
      align,
      slidesToScroll: "auto",
      direction: dir,
    }, plugins);

    prevButton?.addEventListener("click", () => {
      autoplay?.reset();
      embla.scrollPrev();
    }, false);
    nextButton?.addEventListener("click", () => {
      autoplay?.reset();
      embla.scrollNext();
    }, false);

    let dotNodes: HTMLElement[] = [];

    const setupDots = (): void => {
      if (!dots) {
        return;
      }

      const dotElement = dots.innerHTML;
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
      if (!dotNodes.length) {
        return;
      }

      const previous = embla.previousScrollSnap();
      const selected = embla.selectedScrollSnap();
      dotNodes[previous]?.removeAttribute("data-selected");
      dotNodes[selected]?.setAttribute("data-selected", "");
    };

    const updateButtons = () => {
      const canScrollPrev = embla.canScrollPrev();
      const canScrollNext = embla.canScrollNext();

      if (prevButton) {
        prevButton.disabled = !canScrollPrev;
      }
      if (nextButton) {
        nextButton.disabled = !canScrollNext;
      }
    };

    const onInit = () => {
      setupDots();
      toggleActiveDot();
      updateButtons();
    };

    const onSelect = () => {
      toggleActiveDot();
      updateButtons();
    };

    const onSlidesInView = () => {
      if (
        centerIfNotScrollable && carousel &&
        embla.scrollSnapList().length < embla.slidesInView().length
      ) {
        carousel.classList.add("justify-center");
      }
    };

    embla
      .on("init", onInit)
      .on("reInit", onInit)
      .on("slidesInView", onSlidesInView)
      .on("select", onSelect);
  }

  if (document.readyState === "complete") {
    setupEmbla();
  } else {
    document.addEventListener("DOMContentLoaded", setupEmbla);
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
