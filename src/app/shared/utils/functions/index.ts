export function getIdFromSlug() {}

export function makeRelativePath(path: string, separator = 'appla.cy') {
  const splitArr = path.split(separator);
  return splitArr[splitArr.length - 1];
}
