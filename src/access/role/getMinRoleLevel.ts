import { User } from '@/payload-types'

type Role = User['role']

export const roleLevel: Record<Role, number> = {
  superadmin: 50,
  admin: 40,
  editor: 30,
  author: 20,
  none: 0,
}

export const getMinRoleLevel = (role: Role, targetRole: Role) => {
  return roleLevel[role] >= roleLevel[targetRole]
}
