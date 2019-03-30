import emojiList from './emojiList';

const mapUnicode = () => {
  const unicodes = {};
  // eslint-disable-next-line no-restricted-syntax
  for (const shortname in emojiList.list) {
    // eslint-disable-next-line no-continue, no-prototype-builtins
    if (!emojiList.list.hasOwnProperty(shortname)) {
      continue;// eslint-disable-line no-continue
    }

    unicodes[emojiList.list[shortname]] = shortname;
  }

  return unicodes;
};

export default mapUnicode();
