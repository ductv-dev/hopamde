import type { paths } from '@workspace/sdk/schema';
import createFetchClient from 'openapi-fetch';
import createClient from 'openapi-react-query';
import { env } from './env';

const fetchClient = createFetchClient<paths>({
  baseUrl: env.API_URL,
  credentials: 'include',
});

export const $api = createClient(fetchClient);
