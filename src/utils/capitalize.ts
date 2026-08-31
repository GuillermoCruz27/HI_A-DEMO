/**
 * Convierte la primera letra de un string a mayúscula.
 */
export function capitalize(text: string): string {
  if (text.length === 0) {
    return text;
  }
  return text.charAt(0).toUpperCase() + text.slice(1);
}
