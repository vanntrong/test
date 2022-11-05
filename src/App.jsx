/* eslint-disable max-len */
import React, { useEffect, useState } from "react";
import Bookmark from "./components/bookmark";
import BookmarkModal from "./components/bookmark-modal";
import helper from "./utils/helper";

import "./index.css";
import apis from "./apis";

function App() {
  const [bookmarks, setBookmarks] = useState(localStorage.getItem("bookmarks") ? JSON.parse(localStorage.getItem("bookmarks")) : []);
  const [isShowModalAddBookmark, setIsShowModalAddBookmark] = useState(false);
  const [isShowModalEditBookmark, setIsShowModalEditBookmark] = useState(false);
  const [bookmarkSelectedId, setBookmarkSelectedId] = useState(null);
  const bookmarkSelected = bookmarks.find((bookmark) => bookmark.id === bookmarkSelectedId);
  const [user, setUser] = useState();

  useEffect(() => {
    if (bookmarks.length === 0) {
      const newBookmark = {
        id: 1,
        name: "Addslice",
        url: "https://addslice.com",
        favicon: "https://icon.horse/icon/addslice.com",
        timestamp: Date.now(),
      };
      setBookmarks([newBookmark]);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  }, [bookmarks]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await (await apis.getUser()).json();
        setUser(data.data.user);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUser();
  }, []);

  const handleSaveBookmark = (name, url) => {
    const favicon = helper.getFaviconUrl(url);
    const newBookmark = {
      id: bookmarks.length + 1,
      name,
      url,
      favicon,
      timestamp: Date.now(),
    };
    setBookmarks([...bookmarks, newBookmark]);
    setIsShowModalAddBookmark(false);
  };

  const handleRemoveBookmark = () => {
    const newBookmarks = bookmarks.filter((bookmark) => bookmark.id !== bookmarkSelectedId);
    setBookmarks(newBookmarks);
    setIsShowModalEditBookmark(false);
    setBookmarkSelectedId(null);
  };

  const handleEditBookmark = (name, url) => {
    const newBookmarks = bookmarks.map((bookmark) => {
      if (bookmark.id === bookmarkSelectedId) {
        return {
          ...bookmark,
          name,
          url,
          favicon: helper.getFaviconUrl(url),
        };
      }
      return bookmark;
    });
    setBookmarks(newBookmarks);
    setIsShowModalEditBookmark(false);
  };

  return (
    <div className="container">
      <ul className="bookmark-list">
        {bookmarks.map((bookmark) => (
          <Bookmark
            key={bookmark.id}
            bookmark={bookmark}
            onSelectBookmark={(id) => {
              setBookmarkSelectedId(id);
              setIsShowModalEditBookmark(true);
            }}
          />
        ))}
      </ul>
      <button
        type="button"
        onClick={() => {
          setIsShowModalAddBookmark(true);
        }}
        className="button-primary"
      >
        Add new bookmark

      </button>

      {isShowModalAddBookmark && <BookmarkModal title="Add Bookmark" onConfirm={handleSaveBookmark} onCancel={() => setIsShowModalAddBookmark(false)} />}
      {isShowModalEditBookmark && (
        <BookmarkModal
          title="Edit Bookmark"
          onConfirm={handleEditBookmark}
          onCancel={() => {
            setIsShowModalEditBookmark(false);
            setBookmarkSelectedId(null);
          }}
          defaultValue={bookmarkSelected}
          includeRemove
          onRemove={handleRemoveBookmark}
        />
      )}

      {user && (
      <div>
        <h1>Profile</h1>
        <p>{user.name}</p>
        <p>{user.email}</p>
      </div>
      )}
    </div>

  );
}

export default App;
