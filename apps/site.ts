import {
  type App as A,
  type AppContext as AC,
  type AppMiddlewareContext as AMC,
} from "@deco/deco";
import { type Section } from "@deco/deco/blocks";
import commerce from "apps/commerce/mod.ts";
import VTEX from "apps/vtex/mod.ts";
import { Props as WebsiteProps } from "apps/website/mod.ts";
import { rgb24 } from "std/fmt/colors.ts";
import manifest, { Manifest } from "../manifest.gen.ts";
import middleware from "../middleware.tsx";

export interface Props extends WebsiteProps {
  /**
   * @title Active Commerce Platform
   * @description Choose the active ecommerce platform
   * @default custom
   */
  platform: Platform;
  theme?: Section;
  /**
   * @title Supported Languages
   * @description List of supported languages
   */
  supportedLanguages?: string[];
  /**
   * @title Default Language
   * @default en
   */
  defaultLanguage?: string;
}

export type Platform =
  | "vtex"
  | "vnda"
  | "shopify"
  | "wake"
  | "linx"
  | "nuvemshop"
  | "custom";

export let _platform: Platform = "custom";

export type App = ReturnType<typeof Site>;
// @ts-ignore somehow deno task check breaks, I have no idea why
export type AppContext = AC<App>;
export type AppMiddlewareContext = AMC<App>;

const color = (platform: string) => {
  switch (platform) {
    case "deco":
      return 0x02f77d;
    default:
      return 0x212121;
  }
};

let firstRun = true;

/**
 * @title Site
 * @description Start your site from a template or from scratch.
 * @category Tool
 * @logo https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/1/0ac02239-61e6-4289-8a36-e78c0975bcc8
 */
export default function Site({ ...state }: Props): A<Manifest, Props, [
  ReturnType<typeof commerce>,
  ReturnType<typeof VTEX>,
]> {
  _platform = state.platform || "custom";
  // Prevent console.logging twice
  if (firstRun) {
    firstRun = false;
    console.info(
      ` ${rgb24("Storefront", color("deco"))} | ${
        rgb24(_platform, color(_platform))
      } \n`,
    );
  }
  return {
    state,
    manifest,
    // @ts-ignore - VTEX is injected later
    dependencies: [commerce(state)],
    middleware,
  };
}

export { onBeforeResolveProps, Preview } from "apps/website/mod.ts";
