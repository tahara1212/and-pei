import { PublishedAt } from '../types/common';
import { formatDateForPaths } from './formatUtil';

type GroupContents = {
  [key: string]: Array<string>
}

export const groupByCreatedAt = (contents: Array<PublishedAt>) => {
  return contents.reduce((group: GroupContents, current) => {
    const createdAt = formatDateForPaths(current.publishedAt);
    if (group[createdAt]) {
      group[createdAt].push(createdAt);
    } else {
      group[createdAt] = [createdAt];
    }
    return group;
  }, {});
};