import type { AccessArgs } from 'payload'

import type { User } from '@/payload-types'
import { getMinRoleLevel } from './getMinRoleLevel'

type isAuthor = (args: AccessArgs<User>) => boolean

export const author: isAuthor = ({ req: { user } }) => {
  if (!user) return false
  return getMinRoleLevel(user.role, 'author')
}
