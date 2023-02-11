import { toTitleCase } from "./utils";

export function vitePluginContentfulComponents(components?: object) {
  const virtualModuleId = 'virtual:contentful-components';
  const resolvedVirtualModuleId = '\0' + virtualModuleId;

  return {
    name: 'vite-plugin-contentful',
    resolveId(id: string) {
      if (id === virtualModuleId) {
        return resolvedVirtualModuleId
      }
    },
    async load(id: string) {
      if (id === resolvedVirtualModuleId) {
        const imports: string[] = [];
        const keys: string[] = [];

        if (components !== undefined) {
          for await (const [key, value] of Object.entries(components)) {
            const { id } = await this.resolve(`/src/${value}.astro`);
            const formattedKey = toTitleCase(key);

            imports.push(`import ${formattedKey} from "${id}"`);
            keys.push(formattedKey);
          }

          return `
            ${imports.join(';')};
            export default { ${keys.join(', ')} }
          `;
        }
      }
    },
  };
}
