import { SIDE_MENU_ID } from "../../../constants.ts";
import Icon from "../../ui/Icon.tsx";

export default function SideMenuButton() {
  return (
    <div class="opacity-1 items-center lg:hidden lg:opacity-0 rtl:pr-4 flex">
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded="false"
        data-state="closed"
        data-controller={SIDE_MENU_ID}
      >
        <Icon class="text-white" id="menu" size={24} />
      </button>
    </div>
  );
}
