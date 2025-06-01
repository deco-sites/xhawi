import type { JSX } from "preact";
import { clx } from "../../../sdk/clx.ts";

export default function Carousel(props: JSX.IntrinsicElements["ul"]) {
  return (
    <div data-viewport class="embla__viewport">
      <ul
        {...props}
        class={clx(
          "embla__container",
          props.class,
          props.className,
        )}
        data-slider
      />
    </div>
  );
}
