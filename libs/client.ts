import { createClient } from 'microcms-js-sdk';
export const client = createClient({
  serviceDomain: 'and-pei',
  apiKey: process.env.API_KEY || '',
});
