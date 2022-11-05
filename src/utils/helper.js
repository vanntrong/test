export default {
  getFaviconUrl(url) {
    return `https://icon.horse/icon/${
      url.includes("http") || url.includes("https") ? url.split("/")[2] : url
    }`;
  },
};
