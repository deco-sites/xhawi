import { useScript } from "@deco/deco/hooks";
import { createContext, JSX } from "preact";
import { useContext } from "preact/hooks";
import { clx } from "../../sdk/clx.ts";
import { useId } from "../../sdk/useId.ts";

interface DropdownContext {
  id: string;
}

// deno-lint-ignore no-explicit-any
const DropdownContext = createContext<DropdownContext>(null as any);

const useDropdown = () => useContext(DropdownContext);

type RootProps = JSX.IntrinsicElements["div"] & {
  defaultOpen?: boolean;
  asRadio?: boolean;
  name?: string;
};

function Root({
  children,
  defaultOpen = false,
  asRadio = false,
  name,
  ...props
}: RootProps) {
  const id = useId();

  if (asRadio && !name) {
    throw new Error("name is required for radio buttons");
  }

  const inputProps = asRadio
    ? {
      "hx-on:change": useScript(
        (id: string, name: string) => {
          const e = event as Event;
          const target = e.target as HTMLInputElement;

          if (target.checked) {
            const inputs = document.querySelectorAll<HTMLInputElement>(
              `input[name="${name}"]`,
            );
            inputs.forEach((input) => {
              if (input.id !== id) {
                input.checked = false;
              }
            });
          }
        },
        id,
        name!,
      ),
    }
    : undefined;

  return (
    <DropdownContext.Provider value={{ id }}>
      <div {...props}>
        <input
          type="checkbox"
          class="hidden peer"
          id={id}
          name={name}
          defaultChecked={defaultOpen}
          {...inputProps}
        />
        {children}
      </div>
    </DropdownContext.Provider>
  );
}

type TriggerProps = Omit<JSX.IntrinsicElements["label"], "for" | "htmlFor">;

function Trigger({ children, ...props }: TriggerProps) {
  const { id } = useDropdown();

  return (
    <label
      {...props}
      class={clx("cursor-pointer", props.class, props.className)}
      htmlFor={id}
    >
      {children}
    </label>
  );
}

type ContentProps = JSX.IntrinsicElements["div"];

function Content({ children, ...props }: ContentProps) {
  const { id } = useDropdown();

  return (
    <div
      {...props}
      class={clx(
        "grid grid-rows-[0fr] peer-checked:grid-rows-[1fr]",
        props.class,
        props.className,
      )}
      id={id}
    >
      <div class="overflow-hidden">{children}</div>
    </div>
  );
}

const Dropdown = {
  Root,
  Trigger,
  Content,
};

export default Dropdown;
