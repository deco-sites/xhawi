import { clx } from "../../../sdk/clx.ts";
import Popup from "../../ui/Popup.tsx";

interface Props {
  parentId: string;
  labels: {
    signIn: string;
    newUser: string;
    signUp: string;
  };
  dir: "ltr" | "rtl";
}

export default function ProfilePopup({ parentId, labels, dir }: Props) {
  return (
    <>
      <Popup.Backdrop controlledBy={parentId} />
      <div
        dir={dir}
        data-controlled-by={parentId}
        data-state="closed"
        class="data-[state=closed]:hidden absolute left-0 top-[calc(100%+6px)] ltr:-translate-x-[45%] lg:translate-x-0 transform min-w-max will-change-transform z-50"
      >
        <Popup
          class={clx(
            "z-50 min-w-[12rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md slide-in-from-top-2 mr-4 mt-[12px] w-80 gap-4 rounded-t-none px-0 lg:mt-[14px] lg:rtl:-ml-[170px] outline-none max-w-[380px]",
            "data-[state=closed]:hidden",
            "data-[state=open]:fade-in-0",
            "data-[state=open]:zoom-in-95",
            "data-[state=open]:animate-in",
          )}
          controlledBy={parentId}
          role="menu"
          aria-orientation="vertical"
          dir={dir}
          side="bottom"
          align="start"
        >
          <div
            class="relative flex cursor-default select-none items-center rounded-sm text-sm outline-none focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 hover:bg-transparent focus:bg-transparent flex-col px-4 py-6"
            role="menuitem"
            tabindex={-1}
            data-orientation="vertical"
          >
            <a
              hreflang="en-US"
              class="inline-flex items-center justify-center transition duration-200 bg-omantel-electric-green text-black hover:bg-omantel-dark-green active:bg-omantel-dark-green focus:bg-omantel-dark-green active:border-2 active:border-omantel-dark-green active:ring-omantel-dark-green focus:border-omantel-dark-green focus:active:border-white focus:active:ring-2 h-full w-full rounded-md px-4 py-3 text-base lg:w-[274px]"
              href="/signin"
            >
              {labels.signIn}
            </a>
            <p class="text-center text-omantel-faded-black">
              <span class="new-user">{labels.newUser}</span>{" "}
              <a
                hreflang="en-US"
                class="inline-flex items-center justify-center transition duration-200  rounded-md pt-4 text-sm text-omantel-secondary-blue hover:text-black"
                id="signupLink"
                href="/signup"
              >
                {labels.signUp} &gt;
              </a>
            </p>
          </div>
        </Popup>
      </div>
    </>
  );
}
