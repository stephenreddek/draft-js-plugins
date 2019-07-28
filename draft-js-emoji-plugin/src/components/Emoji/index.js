import React from 'react';
import unionClassNames from 'union-class-names';
import EmojiToolkit from 'emoji-toolkit';

const Emoji = ({ theme = {}, cacheBustParam, imagePath, imageType, className, decoratedText, useNativeArt, ...props }) => {
  const shortName = EmojiToolkit.toShort(decoratedText);
  const emojiListItem = EmojiToolkit.emojiList[shortName];

  let emojiDisplay = null;
  if (useNativeArt === true || emojiListItem == null) {
    emojiDisplay = (
      <span
        title={EmojiToolkit.toShort(decoratedText)}
      >
        {props.children}
      </span>
    );
  } else {
    // short name to image url code steal from emojione source code
    const codepointsForImage = emojiListItem.uc_base;
    const backgroundImage = `url(${imagePath}${codepointsForImage}.${imageType}${cacheBustParam})`;
    const combinedClassName = unionClassNames(theme.emoji, className);

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
