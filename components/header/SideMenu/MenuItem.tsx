import { useId } from "../../../sdk/useId.ts";

/**
 * @title {{{label}}}
 */
interface SubCategory {
  label: string;
  url: string;
}

/**
 * @title {{{label}}}
 */
export interface MenuItemProps {
  label: string;
  url?: string;
  subcategories?: SubCategory[];
  /**
   * @ignore
   */
  dir?: "ltr" | "rtl";
}

function SubCategoryItem({ label, url }: SubCategory) {
  return (
    <li>
      <div class="flex cursor-pointer border-t border-[#DCDCDC] py-3 pl-4 pr-8 text-sm text-[#625D5D]">
        <a hreflang="en-US" href={url}>
          <span type="button" class="text-left">{label}</span>
        </a>
      </div>
    </li>
  );
}

export default function MenuItem({ label, subcategories, dir }: MenuItemProps) {
  const id = useId();
  return (
    <div
      class="border-b"
      dir={dir}
    >
      <input type="checkbox" id={id} name="menu-item" class="peer hidden" />
      <h3
        data-orientation="vertical"
        data-state="closed"
        class="flex"
      >
        <button
          type="button"
          data-as-radio={id}
          class="flex flex-1 items-center justify-between transition-all hover:underline [&[data-state=open]>svg]:rotate-180 px-4 py-6 text-base font-medium"
          dir={dir}
        >
          {label}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="lucide lucide-chevron-down h-4 w-4 shrink-0 transition-transform duration-200 [.peer:checked~h3_&]:rotate-180"
          >
            <path d="m6 9 6 6 6-6"></path>
          </svg>
        </button>
      </h3>
      <div
        data-state="closed"
        id="radix-:r1e:"
        hidden
        role="region"
        aria-labelledby="radix-:r1d:"
        data-orientation="vertical"
        class="overflow-hidden text-sm grid grid-rows-[0fr] transition-[grid-template-rows] duration-300 ease-in-out peer-checked:grid-rows-[1fr]"
      >
        <div class="[.peer:checked~div>&]:pb-4 pt-0 max-h-[400px] overflow-scroll bg-[#F4F3F3]">
          <ul>
            {subcategories?.map((subcategory) => (
              <SubCategoryItem key={subcategory.url} {...subcategory} />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
