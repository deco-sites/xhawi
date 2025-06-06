import { asset } from "$fresh/runtime.ts";
import type { JSX } from "preact";

export type AvailableIcons =
  | "chevron-right"
  | "chevron-up"
  | "menu"
  | "profile-icon"
  | "right-arrow-small"
  | "search-md"
  | "shopping-cart"
  | "globe-outline"
  | "globe"
  | "close"
  | "seller-search"
  | "arrow-up"
  | "trend-up"
  | "close-small"
  | "arrow-up-2"
  | "arrow-down-2"
  | "share"
  | "link-copy"
  | "facebook"
  | "pinterest"
  | "X"
  | "secure-payment"
  | "shipping"
  | "sold-by"
  | "zoom"
  | "filter"
  | "delete"
  | "cart-button";

interface Props extends JSX.SVGAttributes<SVGSVGElement> {
  /**
   * Symbol id from element to render. Take a look at `/static/icons.svg`.
   *
   * Example: <Icon id="search" />
   */
  id: AvailableIcons;
  size?: number;
}

function Icon(
  { id, size = 24, width, height, ...otherProps }: Props,
) {
  return (
    <svg
      {...otherProps}
      width={width ?? size}
      height={height ?? size}
    >
      <use href={asset(`/sprites.svg#${id}`)} />
    </svg>
  );
}

export default Icon;
