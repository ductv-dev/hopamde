import { adminClient as baseAdminClient } from 'better-auth/client/plugins';
import { admin as baseAdminPlugin } from 'better-auth/plugins';
import { createAccessControl } from 'better-auth/plugins/access';
import {
  adminAc,
  defaultStatements,
  userAc,
} from 'better-auth/plugins/admin/access';

const statement = {
  ...defaultStatements,
} as const;
const ac = createAccessControl(statement);

export const user = ac.newRole({
  ...userAc.statements,
});
export const admin = ac.newRole({
  ...adminAc.statements,
});
export const collaborator = ac.newRole({
  ...userAc.statements,
});

export const adminPlugin = () =>
  baseAdminPlugin({
    ac,
    roles: {
      user,
      admin,
      collaborator,
    },
  });

export const adminClient = () =>
  baseAdminClient({
    ac,
    roles: {
      user,
      admin,
      collaborator,
    },
  });
