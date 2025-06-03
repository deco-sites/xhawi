import { useScript } from "@deco/deco/hooks";
import Icon, { AvailableIcons } from "../../../ui/Icon.tsx";

function Social({
  url,
  icon,
  label,
}: { url: string; label: string; icon: AvailableIcons }) {
  return (
    <div
      role="menuitem"
      class="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
      tabindex={-1}
      data-orientation="vertical"
      data-radix-collection-item=""
    >
      <a
        target="_blank"
        rel="noopener noreferrer"
        class="flex items-center"
        href={url}
      >
        <span class="relative m-auto flex h-6 w-6 justify-center items-center rounded-full bg-[#26282B] text-white">
          <Icon id={icon} size={10} />
        </span>
        <span class="ml-4">{label}</span>
      </a>
    </div>
  );
}

function CopyLink(props: { url: string }) {
  const { url } = props;

  return (
    <div
      role="menuitem"
      class="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
      tabindex={-1}
    >
      <button
        type="button"
        class="flex items-center"
        data-controller="share-button"
        hx-on:click={useScript((url: string) => {
          navigator.clipboard.writeText(url);
        }, url)}
      >
        <span class="relative m-auto flex h-6 w-6 justify-center items-center rounded-full bg-[#26282B] text-white">
          <Icon id="link-copy" size={10} />
        </span>
        <span class="ml-4">copy link</span>
      </button>
    </div>
  );
}

interface Props {
  productUrl: string;
}

export default function SharePopup(props: Props) {
  const { productUrl } = props;

  const encodedUrl = encodeURIComponent(productUrl);

  return (
    <>
      <div
        class="fixed inset-0 z-0 data-[state=closed]:hidden"
        data-controlled-by="share-button"
        data-controller="share-button"
        data-state="closed"
      />
      <div
        data-controlled-by="share-button"
        data-state="closed"
        dir="ltr"
        class="z-50 min-w-[12rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:hidden data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 slide-in-from-top-2 p-2"
        tabindex={-1}
      >
        <Social
          url={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
          label="facebook"
          icon="facebook"
        />
        <Social
          url={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=`}
          label="X"
          icon="X"
        />
        <Social
          url={`https://pinterest.com/pin/create/link/?url=${encodedUrl}&amp;amp;description=`}
          label="pinterest"
          icon="pinterest"
        />
        <CopyLink url={productUrl} />
      </div>
    </>
  );
}
