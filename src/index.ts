
import type { AstroIntegration } from "astro";

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

            ]
          },
        });
      },
    },
  };
}
