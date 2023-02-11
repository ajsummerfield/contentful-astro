
import type { AstroIntegration } from "astro";
import { vitePluginContentfulClient } from "./vitePluginContentfulClient";
import { vitePluginContentfulComponents } from "./vitePluginContentfulComponents";

export type IntegrationOptions = {
  components?: object;
};

export default function contentfulIntegration(options: IntegrationOptions): AstroIntegration {
  return {
    name: "contentful-astro",
    hooks: {
      "astro:config:setup": ({ updateConfig }) => {
        updateConfig({
          vite: {
            plugins: [
              vitePluginContentfulClient(),
              vitePluginContentfulComponents(options.components)
            ]
          },
        });
      },
    },
  };
}
