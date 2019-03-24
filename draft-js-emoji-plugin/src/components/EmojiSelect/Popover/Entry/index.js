import React, { Component } from "react";
import PropTypes from "prop-types";
import emojione from "emojione";
import emojiList from "../../../../utils/emojiList";
import convertShortNameToUnicode from "../../../../utils/convertShortNameToUnicode";

export default class Entry extends Component {
  static propTypes = {
    cacheBustParam: PropTypes.string.isRequired,
    imagePath: PropTypes.string.isRequired,
    imageType: PropTypes.string.isRequired,
    theme: PropTypes.object.isRequired,
    emoji: PropTypes.string.isRequired,
    mouseDown: PropTypes.bool,
    checkMouseDown: PropTypes.func.isRequired,
    onEmojiSelect: PropTypes.func.isRequired,
    onEmojiMouseDown: PropTypes.func,
    useNativeArt: PropTypes.bool
  };

  static defaultProps = {
    mouseDown: false
  };

  state = {
    isFocused: false
  };

  onMouseUp = () => {
    if (this.mouseDown) {
      this.mouseDown = false;
      this.props.onEmojiSelect(this.props.emoji);
    }
  };

  onMouseDown = () => {
    this.mouseDown = true;
    this.props.onEmojiMouseDown(this, this.props.toneSet);
  };

  onMouseEnter = () => {
    if (!this.props.checkMouseDown()) {
      this.setState({ isFocused: true });
    }
  };

  onMouseLeave = () => {
    if (!this.props.checkMouseDown()) {
      this.setState({ isFocused: false });
    }
  };

  deselect = () => {
    this.setState({ isFocused: false });
  };

  mouseDown = this.props.mouseDown;

  render() {
    const {
      cacheBustParam,
      imagePath,
      imageType,
      theme = {},
      emoji,
      useNativeArt
    } = this.props;
    const { isFocused } = this.state;

    let emojiDisplay = null;
    if (useNativeArt === true) {
      const unicode = emojiList.list[emoji];
      emojiDisplay = convertShortNameToUnicode(unicode);
    } else {
      // short name to image url code steal from emojione source code
      const codePointsForImage = emojione.emojioneList[emoji].uc_base;
      const fullImagePath = `${imagePath}${codePointsForImage}.${imageType}${cacheBustParam}`;
      emojiDisplay = (
        <img
          src={fullImagePath}
          className={theme.emojiSelectPopoverEntryIcon}
          draggable={false}
          role="presentation"
        />
      );
    }

    return (
      <button
        type="button"
        className={
          isFocused
            ? theme.emojiSelectPopoverEntryFocused
            : theme.emojiSelectPopoverEntry
        }
        onMouseDown={this.onMouseDown}
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
        onMouseUp={this.onMouseUp}
        ref={element => {
          this.button = element;
        }}
      >
        {emojiDisplay}
      </button>
    );
  }
}
