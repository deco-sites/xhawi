import type { JSX } from "preact/jsx-runtime";
import { clx } from "../../../sdk/clx.ts";
import { useId } from "../../../sdk/useId.ts";
import JS, { type Props as JSProps } from "./JS.tsx";

type Props = JSX.IntrinsicElements["div"] & {
  js?: Omit<JSProps, "rootId"> & {
    component?: (props: JSProps) => JSX.Element;
  };
};

export default function Root({
  id: _id,
  js,
  ...props
}:
  & JSX.IntrinsicElements["div"]
  & Omit<Props, "rootId">) {
  const id = typeof _id === "string" ? _id : `slider-${useId()}`;

  const Script = js?.component ?? JS;

  return (
    <>
      <div
        {...props}
        id={id}
        data-root
        class={clx("embla", props.class, props.className)}
      />
      <Script rootId={id} {...js} />
    </>
  );
}
