import { useScript } from "@deco/deco/hooks";

export default function PopableScript() {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: useScript(() => {
          // Parse all popables and add event listeners to them
          function parsePopables(target?: HTMLElement) {
            function handler(event: Event) {
              event.preventDefault();
              event.stopPropagation();

              const targetController = event.currentTarget as HTMLElement;
              const identifier = targetController.getAttribute(
                "data-controller",
              );
              if (!identifier) {
                console.warn(
                  `No controller found for popable with id "${targetController.id}"`,
                );
                return;
              }

              const controlledElement = document.querySelectorAll(
                `[data-controlled-by="${identifier}"]`,
              );
              if (!controlledElement?.length) {
                console.warn(
                  `No controlled elements found for controller "${identifier}"`,
                );
                return;
              }

              const isToggle = !targetController.hasAttribute("data-value");
              const isToggleable = targetController.hasAttribute(
                "data-toggleable",
              );
              const isOpen =
                targetController.getAttribute("data-state") === "open";

              const currentState = targetController.getAttribute("data-state");
              const value = targetController.getAttribute("data-value")!;
              const state = isToggle
                ? isOpen ? "closed" : "open"
                : isToggleable && currentState === value
                ? undefined
                : value;

              const controllers = document.querySelectorAll(
                `[data-controller="${identifier}"]`,
              );
              controllers.forEach((controller) => {
                if (!state) {
                  controller.removeAttribute("data-state");
                } else {
                  controller.setAttribute("data-state", state);
                }
                if (isToggle) {
                  controller.setAttribute("aria-expanded", `${!isOpen}`);
                }
              });
              controlledElement.forEach((element) => {
                if (!state) {
                  element.removeAttribute("data-state");
                } else {
                  element.setAttribute("data-state", state);
                }
              });
            }

            const popables = (target || document).querySelectorAll(
              "[data-controller]",
            );

            popables.forEach((popable) => {
              popable.removeEventListener("click", handler);
              popable.addEventListener("click", handler);
            });
          }

          // Script initialization
          function init(target?: HTMLElement) {
            parsePopables(target);
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
