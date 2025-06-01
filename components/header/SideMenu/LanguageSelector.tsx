export default function LanguageSelector() {
  return (
    <div dir="ltr" class="hidden group-data-[state=language-selector]:block">
      <div
        role="button"
        tabindex={0}
        class="border-b border-[#DCDCDC] px-4 py-6"
      >
        <div class="item-center flex">
          <button
            type="button"
            data-controller="side-menu-view"
            data-value="menu"
            class="peer-disabled:cursor-not-allowed peer-disabled:opacity-70 font-mediumn ml-2 inline-flex items-center justify-center text-base font-medium text-omantel-link hover:text-black"
          >
            &lt; Back to Menu
          </button>
        </div>
      </div>
      <div class="border-b border-[#BBBBBB] py-6 pl-4 pr-8">
        <div class="font-mediumn mb-4 text-base ltr:text-left rtl:text-right">
          Change Language
        </div>
        <div
          role="radiogroup"
          aria-required="false"
          dir="ltr"
          class="grid gap-2"
          tabindex={0}
          style="outline: none;"
        >
          <div class="my-2 flex items-center space-x-2">
            <button
              type="button"
              role="radio"
              aria-checked="true"
              data-state="checked"
              value="English"
              class="aspect-square h-4 w-4 rounded-full border border-primary text-primary ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 hover:border-omantel-dark-green hover:shadow-[inset_0_12px_8px_rgba(149,198,85,0.4)] data-[state=checked]:border-omantel-dark-green data-[state=checked]:shadow-[inset_0_12px_8px_rgba(149,198,85,0.4)] disabled:hover:cursor-not-allowed disabled:!border-omantel-grey disabled:bg-omantel-smoke disabled:!shadow-none"
              id="ENG"
              tabindex={-1}
              data-radix-collection-item=""
            >
              <span
                data-state="checked"
                class="flex items-center justify-center"
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
                  class="lucide lucide-circle h-2.5 w-2.5 fill-current text-current"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                </svg>
              </span>
            </button>
            <label class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 rtl: pr-3">
              English-ENG
            </label>
          </div>
          <div class="my-2 flex items-center space-x-2">
            <button
              type="button"
              role="radio"
              aria-checked="false"
              data-state="unchecked"
              value="Omani"
              class="aspect-square h-4 w-4 rounded-full border border-primary text-primary ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 hover:border-omantel-dark-green hover:shadow-[inset_0_12px_8px_rgba(149,198,85,0.4)] data-[state=checked]:border-omantel-dark-green data-[state=checked]:shadow-[inset_0_12px_8px_rgba(149,198,85,0.4)] disabled:hover:cursor-not-allowed disabled:!border-omantel-grey disabled:bg-omantel-smoke disabled:!shadow-none"
              id="AR"
              tabindex={-1}
              data-radix-collection-item=""
            >
            </button>
            <label
              class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 rtl: pr-3"
              for="EN"
            >
              Arabic-العربية
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
