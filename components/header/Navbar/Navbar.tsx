import type { NavbarItemProps } from "./Item.tsx";
import NavbarItem from "./Item.tsx";

interface Props {
  dir: "ltr" | "rtl";
  items: NavbarItemProps[];
}

export default function Navbar(props: Props) {
  const { dir, items } = props;

  return (
    <nav
      aria-label="Main"
      data-orientation="horizontal"
      dir={dir}
      class="relative z-10 mt-0 hidden bg-omantel-electric-green text-white lg:flex lg:ltr:pl-12 lg:rtl:pr-12 [&>*]:border-none [&>*]:bg-white"
    >
      <div style="position:relative">
        <ul
          data-orientation="horizontal"
          class="group flex flex-1 list-none focus:bg-gray-800 navItem-container flex-wrap bg-omantel-electric-green space-x-0"
          id="level1Category"
          dir={dir}
        >
          {items.map((item) => <NavbarItem key={item.label} {...item} />)}
        </ul>
      </div>
      <div class="absolute left-0 top-full flex justify-center"></div>
    </nav>
  );
}
