import findWithRegex from 'find-with-regex';
import emojione from 'emojione';

const unicodeRegex = emojione.regUnicode;

export default (contentBlock: Object, callback: Function) => {
  findWithRegex(unicodeRegex, contentBlock, callback);
};
