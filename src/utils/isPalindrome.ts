export function isPalindrome(text: string): boolean {
  const reversed = text.split('').reverse().join('');
  return text === reversed;
}
