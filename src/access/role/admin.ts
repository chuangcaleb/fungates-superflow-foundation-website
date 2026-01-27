import type { AccessArgs } from 'payload'

import type { User } from '@/payload-types'
import { getMinRoleLevel } from './getMinRoleLevel'

type isAdmin = (args: AccessArgs<User>) => boolean

export const admin: isAdmin = ({ req: { user } }) => {
  if (!user) return false
  return getMinRoleLevel(user.role, 'admin')
}
