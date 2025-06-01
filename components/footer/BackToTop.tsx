import Icon from "../ui/Icon.tsx";

export default function BackToTop() {
  return (
    <button
      type="button"
      hx-on:click="window.scrollTo({ top: 0, behavior: 'smooth' })"
      class="absolute mt-20 flex h-8 w-8 cursor-pointer items-center justify-center rounded-[50%] bg-black p-1 ltr:right-14 rtl:left-14 md:h-11 md:w-11 md:p-0 text-white"
    >
      <Icon
        id="arrow-up"
        size={20}
        class="lg:w-6"
      />
    </button>
  );
}
