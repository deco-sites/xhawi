import { useScript } from "@deco/deco/hooks";

export default function AsRadioScript() {
  return (
    <script
      defer
      dangerouslySetInnerHTML={{
        __html: useScript(() => {
          const cachedGroupNames = new Map<string, string>();

          function handler(event: Event) {
            const button = event.currentTarget as HTMLButtonElement;

            const id = button.getAttribute("data-as-radio");
            if (!id) {
              console.warn(
                `No id found for asRadio label "${button.textContent}"`,
                button,
              );
              return;
            }

            const groupName = cachedGroupNames.get(id) ??
              document.getElementById(id)?.getAttribute("name");
            if (!groupName) {
              console.warn(
                `No group name found for asRadio label "${button.textContent}"`,
                button,
              );
              return;
            }

            cachedGroupNames.set(id, groupName);

            const group = Array.from(
              document.querySelectorAll<HTMLInputElement>(
                `input[name="${groupName}"]`,
              ),
            );
            if (!group.length) {
              console.warn(
                `No group found for asRadio label "${button.textContent}"`,
                button,
              );
              return;
            }

            for (const input of group) {
              if (input.id === id) {
                input.checked = !input.checked;
              } else {
                input.checked = false;
              }
            }
          }

          function init(target?: HTMLElement) {
            const buttons = Array.from(
              target?.querySelectorAll("[data-as-radio]") ??
                document.querySelectorAll("[data-as-radio]"),
            );

            for (const button of buttons) {
              button.removeEventListener("click", handler);
              button.addEventListener("click", handler);
            }
          }

          if (document.readyState === "complete") {
            init();
            document.body.addEventListener(
              "htmx:load",
              (e) => {
                init(e.target as HTMLElement);
              },
            );
          } else {
            document.addEventListener("DOMContentLoaded", () => {
              init();
              document.body.addEventListener(
                "htmx:load",
                (e) => {
                  init(e.target as HTMLElement);
                },
              );
            });
          }
        }),
      }}
    />
  );
}
