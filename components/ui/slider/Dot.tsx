import type { ComponentChildren } from "preact";

export default function Dot({ children }: {
  children: ComponentChildren;
}) {
  return (
    <button type="button" data-dot class="focus:outline-none group">
      {children}
    </button>
  );
}
