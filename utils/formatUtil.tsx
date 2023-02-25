import { format } from 'date-fns';

export const formatDate = (date: string) =>
  format(new Date(date), 'yyyy/MM/dd');

export const formatDateForArchives = (date: string) =>
  format(new Date(date), 'yyyy年MM月');

export const formatDateForPaths = (date: string) =>
  format(new Date(date), 'yyyy-MM');

