export function vitePluginContentfulClient() {
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
        return ``;
      }
    },
  };
}
