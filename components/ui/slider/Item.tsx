import type { JSX } from "preact";
import { clx } from "../../../sdk/clx.ts";

type Props = JSX.IntrinsicElements["li"] & {
  index: number;
};

export default function Item({ index, ...props }: Props) {
  return (
    <li
      {...props}
      data-slider-item={index}
      class={clx("embla__slide", props.class, props.className)}
    />
  );
}
