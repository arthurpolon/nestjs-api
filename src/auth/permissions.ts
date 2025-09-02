import {
  adminAc,
  memberAc,
  ownerAc,
  defaultStatements,
} from 'better-auth/plugins/organization/access';
import { createAccessControl } from 'better-auth/plugins/access';

/**
 * make sure to use `as const` so typescript can infer the type correctly
 */
const statement = {
  ...defaultStatements,
  project: ['create', 'share', 'update', 'delete'],
} as const;

export const ac = createAccessControl(statement);

export const member = ac.newRole({
  project: ['create'],
  ...memberAc.statements,
});

export const admin = ac.newRole({
  project: ['create', 'update'],
  ...adminAc.statements,
});

export const owner = ac.newRole({
  project: ['create', 'update', 'delete'],
  ...ownerAc.statements,
});
