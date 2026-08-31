export function isPalindrome(text: string): boolean {
  const normalized = text.toLowerCase().replace(/\s/g, '');
  const reversed = normalized.split('').reverse().join('');
  return normalized === reversed;
}
