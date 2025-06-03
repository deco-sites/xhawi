import { BreadcrumbList } from "apps/commerce/types.ts";

function Item(props: { name: string; href: string; isLast?: boolean }) {
  const { name, href, isLast = false } = props;

  return (
    <div class="flex flex-wrap items-center gap-1.5 break-words text-sm text-muted-foreground sm:gap-2.5 pb-3">
      <li class="inline-flex items-center gap-1.5">
        {isLast
          ? (
            <span
              role="link"
              aria-disabled="true"
              aria-current="page"
              class="text-foreground font-medium capitalize"
            >
              {name}
            </span>
          )
          : <a hreflang="en-US" class="capitalize" href={href}>{name}</a>}
      </li>
      {!isLast && (
        <li
          role="presentation"
          aria-hidden="true"
          // class="[&>svg]:size-3.5"
        >
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
            class="lucide lucide-chevron-right rtl:rotate-180"
          >
            <path d="m9 18 6-6-6-6"></path>
          </svg>
        </li>
      )}
    </div>
  );
}

interface Props {
  breadcrumbList: BreadcrumbList;
}

export default function Breadcrumb(props: Props) {
  const { breadcrumbList } = props;

  return (
    <div class="p-4 lg:min-h-[100px] lg:px-12 lg:py-6">
      <div class="hidden lg:block">
        <nav aria-label="breadcrumb">
          <ol class="flex flex-wrap items-center gap-1.5 break-words text-sm text-muted-foreground sm:gap-2.5 pb-3">
            <Item
              href="/"
              name="Home"
            />
            {breadcrumbList.itemListElement.map((item, index) => (
              <Item
                href={item.item}
                name={item.name ?? ""}
                isLast={index === breadcrumbList.itemListElement.length - 1}
              />
            ))}
          </ol>
        </nav>
      </div>
    </div>
  );
}
