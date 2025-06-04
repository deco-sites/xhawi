import type { ComponentChildren } from "preact";
import { JSX } from "preact";
import { clx } from "../../../sdk/clx.ts";

type Props = JSX.IntrinsicElements["button"] & {
  children: ComponentChildren;
};

export default function Dot({ children, ...props }: Props) {
  return (
    <button
      type="button"
      data-dot
      {...props}
      class={clx("focus:outline-none group", props.class, props.className)}
    >
      {children}
    </button>
  );
}
