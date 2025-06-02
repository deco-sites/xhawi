interface Subsubcategory {
  label: string;
  url: string;
}

interface Subcategory {
  label: string;
  url: string;
  subcategories?: Subsubcategory[];
}

export interface NavbarItemProps {
  label: string;
  url?: string;
  subcategories?: Subcategory[];
}

export default function NavbarItem(props: NavbarItemProps) {
  const { label, url } = props;

  return (
    <li class="level-1-category flex-wrap">
      <button
        type="button"
        id="radix-:R1hsva:-trigger-radix-:R1dhsva:"
        data-state="closed"
        aria-expanded="false"
        aria-controls="radix-:R1hsva:-content-radix-:R1dhsva:"
        class="group h-10 w-max justify-center px-4 py-2 text-sm font-medium transition-colors focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 group hover:text-accent-white flex items-center rounded-none bg-omantel-electric-green text-black hover:rounded-none hover:border-transparent hover:bg-white focus:bg-white data-[state=open]:bg-white"
      >
        <a
          class="level-1-category-link"
          href={url}
        >
          {label}
        </a>{" "}
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
          class="lucide lucide-chevron-down relative top-[1px] ml-1 h-3 w-3 transition duration-200 group-data-[state=open]:rotate-180"
          aria-hidden="true"
        >
          <path d="m6 9 6 6 6-6"></path>
        </svg>
      </button>
    </li>
  );
}
