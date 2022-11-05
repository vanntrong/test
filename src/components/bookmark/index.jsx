import React from "react";

import PropTypes from "prop-types";

import s from "./index.module.css";

function Bookmark({ bookmark, onSelectBookmark }) {
  return (
    <div className={s.bookmark}>
      <div className={s["bookmark-container"]}>
        <button
          className={s["bookmark-icon__setting"]}
          type="button"
          onClick={() => {
            onSelectBookmark(bookmark.id);
          }}
        >
          <img src="/more.png" alt="" />
        </button>
        <a href={bookmark.url}>

          <div className={s["bookmark-icon__wrapper"]}>
            <img src={bookmark.favicon} alt={bookmark.name} />
          </div>
        </a>
        <a href={bookmark.url}>
          <p className={s["bookmark-name"]}>
            {bookmark.name}
          </p>
        </a>
      </div>
    </div>
  );
}

Bookmark.propTypes = {
  bookmark: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    favicon: PropTypes.string.isRequired,
    timestamp: PropTypes.number.isRequired,
  }).isRequired,
  onSelectBookmark: PropTypes.func.isRequired,
};

export default Bookmark;
