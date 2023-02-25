import { formatDateForPaths } from './formatUtil';

export const groupBy = function (contents) {
  return contents.reduce(function (group, x) {
    const yearMonthString = formatDateForPaths(x.publishedAt);
    (group[yearMonthString] = group[yearMonthString] || []).push(x);
    return group;
  }, {});
};
