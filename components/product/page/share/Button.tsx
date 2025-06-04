import Icon from "../../../ui/Icon.tsx";

export default function ShareButton() {
  return (
    <div
      role="menubar"
      class="flex items-center space-x-1 w-fit rounded-md bg-background lg:p-1 border-0"
      tabindex={0}
      style="outline: none;"
    >
      <button
        type="button"
        data-controller="share-button"
        aria-haspopup="menu"
        aria-expanded="false"
        data-state="closed"
        class="flex cursor-default select-none items-center rounded-sm px-3 py-1.5 text-sm font-medium outline-none focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground"
        tabindex={-1}
      >
        <Icon
          id="share"
          size={20}
          class="text-[#21272A]"
        />
      </button>
    </div>
  );
}
