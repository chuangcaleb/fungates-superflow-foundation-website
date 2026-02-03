import type { AccessArgs } from 'payload'

import type { User } from '@/payload-types'
import { getMinRoleLevel } from './getMinRoleLevel'

type isEditor = (args: AccessArgs<User>) => boolean

export const editor: isEditor = ({ req: { user } }) => {
  if (!user) return false
  return getMinRoleLevel(user.role, 'editor')
}
