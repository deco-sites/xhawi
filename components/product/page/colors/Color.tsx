import { clx } from "../../../../sdk/clx.ts";

interface Props {
  color: string;
  selected?: boolean;
}

export default function Color(props: Props) {
  const { color, selected = false } = props;

  return (
    <button
      type="button"
      class={clx(
        "inline-flex items-center justify-center whitespace-nowrap font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 relative p-2 text-[0] lg:h-4 lg:w-4 mr-4 h-8 w-8 cursor-pointer rounded-full",
        selected
          ? "selected-color border-2 border-gray-50 shadow-[0px_0px_0px_2px_#95c655]"
          : "border border-omantel-grey",
      )}
      data-testid="colored-button"
      style={`background-color: ${color};`}
    >
    </button>
  );
}
