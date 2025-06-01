import type { ComponentChild, JSX } from "preact";
import { clx } from "../../../sdk/clx.ts";

type Props = JSX.IntrinsicElements["div"] & {
  dot: ComponentChild;
};

export default function Dots({ dot, ...props }: Props) {
  return (
    <div data-dots class={clx(props.class, props.className)}>
      {dot}
    </div>
  );
}
