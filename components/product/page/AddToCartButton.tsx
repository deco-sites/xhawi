export default function AddToCartButton() {
  return (
    <div class="flex-grow ">
      <div class="flex flex-col gap-2">
        <button
          type="button"
          class="inline-flex items-center justify-center whitespace-nowrap rounded-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 p-6 bg-omantel-electric-green font-Rubik text-sm text-black hover:bg-omantel-dark-green active:bg-omantel-dark-green focus:bg-omantel-dark-green active:border-2 active:border-omantel-dark-green focus:ring-2 active:ring-omantel-dark-green focus:ring-omantel-dark-green disabled:bg-omantel-platinum disabled:text-omantel-grey h-12 w-full max-w-[320px]"
          id="addToCartButton"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
