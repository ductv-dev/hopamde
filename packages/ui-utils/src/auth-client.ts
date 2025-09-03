import { inferAdditionalFields } from 'better-auth/client/plugins';
import { createAuthClient } from 'better-auth/react';
import { adminClient } from '@workspace/auth/permissions';
import { env } from '@workspace/ui-utils';

export const authClient = createAuthClient({
  baseURL: `${env.API_URL}/auth`,
  fetchOptions: {
    credentials: 'include',
  },
  plugins: [
    inferAdditionalFields({
      user: {
        tiktokId: {
          type: 'string',
          required: false,
          input: false,
          unique: true,
        },
        tiktokVerified: {
          type: 'boolean',
          required: false,
          input: false,
          defaultValue: false,
        },
        tiktokCreatorId: {
          type: 'string',
          required: false,
          input: false,
          unique: true,
        },
        tiktokUsername: {
          type: 'string',
          required: false,
          input: true,
        },
        contactEmail: {
          type: 'string',
          required: false,
          input: true,
        },
        zalo: {
          type: 'string',
          required: false,
          input: true,
        },
        address: {
          type: 'string',
          required: false,
          input: true,
        },
      },
    }),
    adminClient(),
  ],
});
