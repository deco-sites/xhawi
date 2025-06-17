import { getColors } from "../../../../sdk/products.ts";
import Color from "./Color.tsx";

interface Props {
  colors: ReturnType<typeof getColors>;
  labels: {
    color: string;
  };
}

export default function Colors(props: Props) {
  const { colors: { colors, currentColor }, labels } = props;

  return (
    <div class="colors flex flex-col gap-2 border-t pt-6">
      <div class="text-sm lg:text-base font-medium">
        {labels.color}: {currentColor?.name}
      </div>
      <div class="flex">
        {colors.map((color) => (
          <Color
            key={color.hex}
            color={color.hex}
            selected={color.hex === currentColor?.hex}
            productURL={color.url}
          />
        ))}
      </div>
    </div>
  );
}
