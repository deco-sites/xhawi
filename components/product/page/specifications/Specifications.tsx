import { useSection } from "@deco/deco/hooks";
import { clx } from "../../../../sdk/clx.ts";
import { getSpecifications } from "../../../../sdk/products.ts";

interface Props {
  possibilities: NonNullable<
    ReturnType<typeof getSpecifications>["possibilities"]
  >;
  selectedPossibilities: NonNullable<
    ReturnType<typeof getSpecifications>["selectedPossibilities"]
  >;
}

export default function Specifications(props: Props) {
  const { possibilities, selectedPossibilities } = props;

  return (
    <>
      {Object.entries(possibilities)?.map(([name, values]) => (
        <div class="flex flex-col gap-2 border-t pt-6">
          <div class="size-selection-label text-base font-medium">
            {name}: {selectedPossibilities[name]}
          </div>
          <div class="flex flex-wrap">
            {values.map((value) => (
              <button
                type="button"
                disabled={!value.url || !value.inStock}
                hx-get={useSection({ href: value.url })}
                hx-target="closest section"
                hx-swap="outerHTML"
                hx-push-url={value.url}
                class={clx(
                  "inline-flex items-center justify-center whitespace-nowrap ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground size-selection-button mb-2 mr-2 h-8 cursor-pointer rounded-sm px-3 py-[6px] text-sm border-2 font-medium text-black",
                  (!value.url || !value.inStock) &&
                    "border-input bg-background border text-omantel-grey",
                  selectedPossibilities[name] === value.value &&
                    "bg-omantel-electric-green-1 text-black border-omantel-border-green",
                )}
              >
                {value.value}
              </button>
            ))}
          </div>
        </div>
      ))}
    </>
  );
}
