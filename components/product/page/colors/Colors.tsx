import { getColors } from "../../../../sdk/products.ts";
import Color from "./Color.tsx";

interface Props {
  colors: ReturnType<typeof getColors>;
}

export default function Colors(props: Props) {
  const { colors } = props;

  return (
    <div class="colors flex flex-col gap-2 border-t pt-6">
      <div class="text-base font-medium">Color: White</div>
      <div class="flex">
        {colors.map((color, index) => (
          <Color key={color.color} color={color.color} selected={index === 0} />
        ))}
      </div>
    </div>
  );
}
