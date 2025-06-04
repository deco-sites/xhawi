export default function QuantitySelector() {
  return (
    <div class="numeric-stepper-container flex items-center gap-2">
      <button
        type="button"
        class="decrement flex items-center justify-center rounded border lg:border-2  disabled:opacity-50 h-12 w-12 border-[#EBEBEB] lg:border-black"
        disabled
      >
        -
      </button>
      <div class="">
        <input
          class="flex rounded-md valid:placeholder-shown:border-gray-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-omantel-dark-green disabled:cursor-not-allowed dark:border-gray-800 dark:bg-gray-950 dark:ring-offset-gray-950 dark:placeholder:text-gray-400 dark:focus-visible:ring-gray-300 focus:border-omantel-dark-green valid:border-omantel-faded-black valid:text-omantel-faded-black focus:valid:text-omantel-grey-3 quantity-value border lg:border-2 text-center disabled:opacity-50 h-12 w-20 border-[#EBEBEB] lg:border-black sm:w-36"
          readonly
          value="1"
        />
      </div>
      <button
        type="button"
        class="increment flex items-center justify-center rounded border lg:border-2 disabled:cursor-not-allowed disabled:opacity-50 h-12 w-12 border-[#EBEBEB] lg:border-black"
      >
        +
      </button>
    </div>
  );
}
