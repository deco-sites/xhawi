import { clx } from "../../sdk/clx.ts";
import type { JSX } from "preact";

type Props = JSX.IntrinsicElements["div"] & {
  controlledBy: string;
  side?: "bottom" | "top" | "left" | "right";
  align?: "start" | "center" | "end";
  state?: "open" | "closed";
};

function Popup(props: Props) {
  const {
    controlledBy,
    side = "bottom",
    align = "start",
    children,
    class: _class,
    className,
    state = "closed",
    ...rest
  } = props;

  return (
    <div
      data-controlled-by={controlledBy}
      role="menu"
      aria-orientation="vertical"
      data-side={side}
      data-align={align}
      data-state={state}
      tabIndex={-1}
      {...rest}
      class={clx(_class, className)}
    >
      {children}
    </div>
  );
}

function Backdrop({
  controlledBy,
  state = "closed",
}: {
  controlledBy: string;
  state?: "open" | "closed";
}) {
  return (
    <div
      data-controller={controlledBy}
      data-controlled-by={controlledBy}
      data-state={state}
      class="z-[49] fixed inset-0 data-[state=closed]:hidden"
    />
  );
}

Popup.Backdrop = Backdrop;

export default Popup;
