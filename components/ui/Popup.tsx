import { clx } from "../../sdk/clx.ts";
import type { JSX } from "preact";

type Props = JSX.IntrinsicElements["div"] & {
  controlledBy: string;
  side?: "bottom" | "top" | "left" | "right";
  align?: "start" | "center" | "end";
};

function Popup(props: Props) {
  const {
    controlledBy,
    side = "bottom",
    align = "start",
    children,
    class: _class,
    className,
    ...rest
  } = props;

  return (
    <div
      data-controlled-by={controlledBy}
      role="menu"
      aria-orientation="vertical"
      dir="ltr"
      data-side={side}
      data-align={align}
      data-state="closed"
      tabIndex={-1}
      {...rest}
      class={clx(_class, className)}
    >
      {children}
    </div>
  );
}

function Backdrop({ controlledBy }: { controlledBy: string }) {
  return (
    <div
      data-controller={controlledBy}
      data-controlled-by={controlledBy}
      data-state="closed"
      class="z-[49] fixed inset-0 data-[state=closed]:hidden"
    />
  );
}

Popup.Backdrop = Backdrop;

export default Popup;
