export const toTitleCase = (str: string) => {
  return str.replace(/(^|\s)\S/g, (c) => { return c.toUpperCase() });
}