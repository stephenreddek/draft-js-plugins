import React from "react";
import unionClassNames from "union-class-names";
import emojione from "emojione";

const Emoji = ({
  theme = {},
  cacheBustParam,
  imagePath,
  imageType,
  className,
  decoratedText,
  useNativeArt,
  ...props
}) => {
  const shortName = emojione.toShort(decoratedText).replace("\u{fe0f}", "");

  let emojiDisplay = null;
  if (useNativeArt === true) {
    emojiDisplay = <span title={shortName}>{props.children}</span>;
  } else {
    // short name to image url code steal from emojione source code
    const codePointsForImage = emojione.emojioneList[shortName].uc_base;
    const backgroundImage = `url(${imagePath}${codePointsForImage}.${imageType}${cacheBustParam})`;
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
