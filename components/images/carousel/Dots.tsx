import Slider from "../../ui/slider/index.ts";

function Dot() {
  return (
    <Slider.Dot>
      <div class="block cursor-pointer rounded-2xl transition-all content-[''] h-2 w-2 group-data-[selected]:w-14 bg-white" />
    </Slider.Dot>
  );
}

export default function Dots() {
  return (
    <Slider.Dots
      dot={<Dot />}
      class="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2"
    />
  );
}
