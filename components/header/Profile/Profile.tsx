import { useId } from "../../../sdk/useId.ts";
import Icon from "../../ui/Icon.tsx";
import ProfilePopup from "./Popup.tsx";

export default function Profile() {
  const id = useId();

  return (
    <div class="user-profile-login relative flex items-center" id="profile">
      <button
        type="button"
        role="menuitem"
        data-controller={id}
        aria-haspopup="menu"
        aria-expanded="false"
        data-state="closed"
        class="flex cursor-default select-none items-center text-sm font-medium outline-none data-[state=open]:bg-accent data-[state=open]:text-accent-foreground data-[state=open]: rounded-[2px] border-omantel-electric-green-inverted1 p-0.5 hover:bg-transparent focus:bg-transparent focus:text-white lg:p-1.5 [&[aria-expanded='false']]:text-white [&[aria-expanded='true']]:bg-omantel-grey [&[aria-expanded='true']]:text-white"
        tabindex={-1}
        data-orientation="horizontal"
      >
        <div class="flex items-center">
          <Icon
            alt="User profile"
            id="profile-icon"
            size={24}
            class="h-7 w-7 text-white"
          />
          <div class="ml-1 w-[74px] ltr:text-left rtl:mr-2 rtl:text-right">
            <div class="flex flex-col">
              <span class="w-[74px] truncate text-xs font-normal">
                Hi,<span class="ml-1 ltr:pl-0 rtl:pl-[px]" id="name">
                  Guest
                </span>
              </span>
              <span class="text-sm font-medium">Account</span>
            </div>
          </div>
        </div>
      </button>
      <ProfilePopup parentId={id} />
    </div>
  );
}
