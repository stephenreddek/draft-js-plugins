/* eslint-disable no-continue */
/* eslint-disable no-restricted-syntax */
import React from 'react';
import unionClassNames from 'union-class-names';
import EmojiToolkit from 'emoji-toolkit';

const Emoji = ({ theme = {}, cacheBustParam, imagePath, imageType, className, decoratedText, useNativeArt, ...props }) => {
  const shortName = EmojiToolkit.toShort(decoratedText);
  let emojiListItem = EmojiToolkit.emojiList[shortName];

  // Ripped from emoji toolkit source `shortnameToImage`
  if (!emojiListItem) {
    for (const emoji in EmojiToolkit.emojiList) {
      // eslint-disable-next-line no-prototype-builtins
      if (!EmojiToolkit.emojiList.hasOwnProperty(emoji) || (emoji === '')) continue;
      if (EmojiToolkit.emojiList[emoji].shortnames.indexOf(shortName) === -1) continue;
      emojiListItem = EmojiToolkit.emojiList[emoji];
      break;
    }
  }

  const combinedClassName = unionClassNames(theme.emoji, className);

  let emojiDisplay = null;
  if (useNativeArt === true || emojiListItem == null) {
    emojiDisplay = (
      <span
        className={combinedClassName}
        title={EmojiToolkit.toShort(decoratedText)}
      >
        {props.children}
      </span>
    );
  } else {
    // short name to image url code steal from emojione source code
    const codepointsForImage = emojiListItem.uc_base;
    const backgroundImage = `url(${imagePath}${codepointsForImage}.${imageType}${cacheBustParam})`;

    emojiDisplay = (
      <span
        className={combinedClassName}
        title={shortName}
        style={{ backgroundImage }}
      >
        {props.children}
      </span>
    );
  }

  return emojiDisplay;
};

export default Emoji;
