export function getIdFromSlug(url: string) {
  const splited = url.split('/');
  // eslint-disable-next-line no-magic-numbers
  return +splited[splited.length - 1].split('-').slice(-1);
}

export function makeRelativePath(path: string, separator = 'appla.cy') {
  const splitArr = path.split(separator);
  // eslint-disable-next-line no-magic-numbers
  return splitArr[splitArr.length - 1];
}
