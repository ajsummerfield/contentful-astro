
import type { AstroIntegration } from "astro";
import type { ContentfulClientApi } from "contentful";
import { vitePluginContentfulClient } from "./vitePluginContentfulClient";
import { vitePluginContentfulComponents } from "./vitePluginContentfulComponents";

export type IntegrationOptions = {
  space: string;
  accessToken: string;
  components?: object;
};

export const useContentfulClient = () : ContentfulClientApi => {
  return globalThis.contentfulClient;
}

export default function contentfulIntegration(options: IntegrationOptions): AstroIntegration {
  return {
    name: "contentful-astro",
    hooks: {
      "astro:config:setup": ({ updateConfig, injectScript }) => {
        updateConfig({
          vite: {
            plugins: [
              vitePluginContentfulClient(options.space, options.accessToken),
              vitePluginContentfulComponents(options.components)
            ]
          },
        });

        injectScript(
          "page-ssr",
          `
            import { contentfulClient } from "virtual:contentful-client";
            globalThis.contentfulClient = contentfulClient;
          `
        );
      },
    },
  };
}
