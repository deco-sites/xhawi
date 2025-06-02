import Icon from "../../ui/Icon.tsx";

interface Props {
  labels: {
    hi: string;
    guest: string;
    account: string;
  };
  id: string;
}

export default function ProfileButton(props: Props) {
  const { id, labels } = props;

  return (
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
          id="profile-icon"
          size={24}
          class="h-7 w-7 text-white"
        />
        <div class="ml-1 w-[74px] ltr:text-left rtl:mr-2 rtl:text-right">
          <div class="flex flex-col">
            <span class="w-[74px] truncate text-xs font-normal">
              {labels.hi},<span
                class="ml-1 ltr:pl-0 rtl:pl-[px]"
                id="name"
              >
                {labels.guest}
              </span>
            </span>
            <span class="text-sm font-medium">{labels.account}</span>
          </div>
        </div>
      </div>
    </button>
  );
}
