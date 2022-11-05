import React, { useState } from "react";

import PropTypes from "prop-types";

import s from "./index.module.css";

function BookmarkModal({
  title, includeRemove, onConfirm, onCancel, defaultValue, onRemove,
}) {
  const [name, setName] = useState(defaultValue.name);
  const [url, setUrl] = useState(defaultValue.url);
  return (
    <div className={s["bookmark-modal__wrapper"]}>
      <div className={s["bookmark-modal"]}>
        <h3>{title}</h3>
        <div>
          <label htmlFor="name" className={s["bookmark-modal__label"]}>
            Name

            <input type="text" placeholder="Name" id="name" required minLength={3} value={name} onChange={(e) => setName(e.target.value)} />
          </label>

          <label htmlFor="url" className={s["bookmark-modal__label"]}>
            URL

            <input type="url" placeholder="Url" id="url" required minLength={3} value={url} onChange={(e) => setUrl(e.target.value)} />
          </label>
        </div>
        <div className={s["bookmark-actions"]}>
          {includeRemove && <button type="button" className="button" onClick={() => onRemove()}>Remove</button>}
          <div style={{ marginLeft: "auto" }}>
            <button type="button" className="button" onClick={onCancel}>
              Cancel
            </button>
            <button type="button" className="button-primary" onClick={() => onConfirm(name, url)}>
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

BookmarkModal.propTypes = {
  title: PropTypes.string.isRequired,
  includeRemove: PropTypes.bool,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  defaultValue: PropTypes.shape({
    name: PropTypes.string,
    url: PropTypes.string,
  }),
  onRemove: PropTypes.func,
};

BookmarkModal.defaultProps = {
  includeRemove: false,
  defaultValue: {
    name: "",
    url: "",
  },
  onRemove: () => {},
};

export default BookmarkModal;
