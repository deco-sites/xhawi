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
  axis?: "horizontal" | "vertical";
  slidesToScroll?: number | "auto";
}

const setup = (
  {
    rootId,
    infinite = false,
    align = "start",
    interval = 0,
    centerIfNotScrollable = false,
    dir = "ltr",
    axis = "horizontal",
    slidesToScroll = "auto",
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

    const autoplay = interval && interval > 0
      ? EmblaCarouselAutoplay({ stopOnInteraction: false, delay: interval })
      : null;
    const plugins = [autoplay].filter((plugin) => plugin !== null);
    const embla = EmblaCarousel(viewport, {
      loop: infinite,
      align,
      slidesToScroll,
      direction: dir,
      axis: axis === "vertical" ? "y" : "x",
    }, plugins);

    prevButton?.addEventListener("click", () => {
      autoplay?.reset();
      embla.scrollPrev();
    }, false);
    nextButton?.addEventListener("click", () => {
      autoplay?.reset();
      embla.scrollNext();
    }, false);

    const setupDots = (): void => {
      const scrollTo = (index: number): void => {
        embla.scrollTo(index);
      };

      embla.slideNodes().forEach((node, index) => {
        node.addEventListener("click", () => {
          autoplay?.reset();
          scrollTo(index);
        }, false);
      });
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

      const currentSnapIndex = embla.selectedScrollSnap();
      const nodes = embla.slideNodes();
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        if (i === currentSnapIndex) {
          node.setAttribute("data-selected", "");
          node.querySelector("label")?.click();
        } else {
          node.removeAttribute("data-selected");
        }
      }
    };

    const onInit = () => {
      setupDots();
      updateButtons();
    };

    const onSelect = () => {
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
