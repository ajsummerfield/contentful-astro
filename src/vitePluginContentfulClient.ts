export function vitePluginContentfulClient(space: string, accessToken: string) {
  const virtualModuleId = 'virtual:contentful-client';
  const resolvedVirtualModuleId = '\0' + virtualModuleId;

  return {
    name: 'vite-plugin-contentful-client',
    resolveId(id: string) {
      if (id === virtualModuleId) {
        return resolvedVirtualModuleId
      }
    },
    async load(id: string) {
      if (id === resolvedVirtualModuleId) {
        return `
          import contentful from "contentful";

          export const contentfulClient = contentful.createClient({
            space: "${space}",
            accessToken: "${accessToken}"
          });
        `;
      }
    },
  };
}
