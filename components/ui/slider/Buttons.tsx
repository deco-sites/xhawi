import type { JSX } from "preact";

export function NextButton(props: JSX.IntrinsicElements["button"]) {
  return (
    <button
      data-slide="next"
      {...props}
      aria-label="Next item"
    />
  );
}

export function PrevButton(props: JSX.IntrinsicElements["button"]) {
  return (
    <button
      data-slide="prev"
      {...props}
      aria-label="Previous item"
    />
  );
}
