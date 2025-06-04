import { useSection } from "@deco/deco/hooks";
import { clx } from "../../../../sdk/clx.ts";
import { relative } from "../../../../sdk/url.ts";

interface Props {
  color: string;
  selected?: boolean;
  productURL: string;
}

export default function Color(props: Props) {
  const { color, selected = false, productURL } = props;

  return (
    <button
      hx-get={useSection({ href: relative(productURL) })}
      hx-target="closest section"
      hx-swap="outerHTML"
      hx-push-url={relative(productURL)}
      type="button"
      class={clx(
        "inline-flex items-center justify-center whitespace-nowrap font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 relative p-2 text-[0] lg:size-4 mr-4 size-8 cursor-pointer rounded-full",
        selected
          ? clx(
            "border-2 border-gray-50 shadow-[0px_0px_0px_5px_#95c655] outline outline-[3px] outline-white",
            "lg:border-2 lg:shadow-[0px_0px_0px_2px_#95c655] lg:outline-none",
          )
          : "border border-omantel-grey",
      )}
      data-testid="colored-button"
      style={`background-color: ${color};`}
    >
    </button>
  );
}
