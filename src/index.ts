import { sum } from './utils/sum';
import { capitalize } from './utils/capitalize';
import { isPalindrome } from './utils/isPalindrome';

console.log('--- gitflow-demo-toolkit ---');
console.log('sum(2, 3) =', sum(2, 3));
console.log("capitalize('hola mundo') =", capitalize('hola mundo'));
console.log("isPalindrome('Anita lava la tina') =", isPalindrome('Anita lava la tina'));

export { sum, capitalize, isPalindrome };
