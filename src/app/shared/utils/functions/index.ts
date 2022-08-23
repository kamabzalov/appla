export function getIdFromSlug(url: string) {
  const splited = url.split('/');
  return +splited[splited.length - 1].split('-').slice(-1);
}

export function makeRelativePath(path: string, separator = 'appla.cy') {
  const splitArr = path.split(separator);
  return splitArr[splitArr.length - 1];
}
