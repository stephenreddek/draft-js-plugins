import findWithRegex from 'find-with-regex';
import unicodeRegex from './utils/emojiUnicodeRegex';

export default (contentBlock: Object, callback: Function) => {
  findWithRegex(unicodeRegex, contentBlock, callback);
};
