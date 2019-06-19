export default function toUrl(baseUrl, uri) {
  const urlRegex = /^http(s)?:\/\/.+/;
  if (urlRegex.test(uri)) {
    return uri;
  }
  return `${baseUrl}${uri}`;
}
