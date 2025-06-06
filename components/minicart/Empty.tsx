interface Props {
  title: string;
  line1: string;
  line2: string;
  button: string;
  currentUrl: string;
}

export default function Empty(props: Props) {
  const { title, line1, line2, button, currentUrl } = props;

  return (
    <div class="p-4">
      <div class="text-center text-lg font-bold" id="cartStatus">
        {title}
      </div>
      <div class="py-2 text-center text-sm" id="cartMessage">
        {line1}
        <br />
        {line2}
      </div>
      <div class="p-4">
        <a
          href={currentUrl}
          class="inline-flex items-center justify-center whitespace-nowrap rounded-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 p-6 bg-omantel-electric-green font-Rubik text-sm text-black hover:bg-omantel-dark-green active:bg-omantel-dark-green focus:bg-omantel-dark-green active:border-2 active:border-omantel-dark-green focus:ring-2 active:ring-omantel-dark-green focus:ring-omantel-dark-green disabled:bg-omantel-platinum disabled:text-omantel-grey w-full"
          id="startShopping"
          data-testid="startShopping"
        >
          {button}
        </a>
      </div>
    </div>
  );
}
