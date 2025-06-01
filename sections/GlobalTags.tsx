import { asset, Head } from "$fresh/runtime.ts";
import { Context } from "@deco/deco";
import { useScript } from "@deco/deco/hooks";
import AsRadioScript from "../components/scripts/AsRadio.tsx";
import ControllerScript from "../components/scripts/ControllerScript.tsx";

interface Props {
  /**
   * @ignore
   */
  revision: string;
}

const serviceWorkerScript = () =>
  addEventListener("load", () =>
    navigator && navigator.serviceWorker &&
    navigator.serviceWorker.register("/sw.js"));

export async function loader() {
  const revision = await Context.active().release?.revision();
  return {
    revision,
  };
}

export default function GlobalTags({ revision }: Props) {
  return (
    <Head>
      {/* Enable View Transitions API */}
      <style
        dangerouslySetInnerHTML={{
          __html: `@view-transition { navigation: auto; }`,
        }}
      />

      {/* Tailwind v3 CSS file */}
      <link
        href={asset(`/styles.css?revision=${revision}`)}
        rel="stylesheet"
      />

      <link
        href={asset(
          `/css/react-multi-carousel.css?revision=${revision}`,
        )}
        rel="stylesheet"
      />

      {/* Web Manifest */}
      <link rel="manifest" href={asset("/site.webmanifest")} />

      <style
        type="text/css"
        dangerouslySetInnerHTML={{
          __html: `
          @font-face {
            font-family: halogen;
            src: url(${asset("/fonts/Halogen-Black.ttf")});
          }`,
        }}
      />

      {/* Embla Carousel */}
      <script
        id="embla-carousel-js"
        src="https://unpkg.com/embla-carousel@8.6.0/embla-carousel.umd.js"
      />
      <script
        id="embla-carousel-autoplay-js"
        src="https://unpkg.com/embla-carousel-autoplay@8.6.0/embla-carousel-autoplay.umd.js"
      />

      {/* Controller Script */}
      <ControllerScript />

      {/* As Radio Script */}
      <AsRadioScript />

      <script
        type="module"
        dangerouslySetInnerHTML={{ __html: useScript(serviceWorkerScript) }}
      />
    </Head>
  );
}
