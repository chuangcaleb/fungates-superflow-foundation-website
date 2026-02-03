import { HeaderClient } from './Component.client'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { Nav } from '@/payload-types'
import React from 'react'

export async function Header() {
  const nav: Nav = await getCachedGlobal('nav', 1)()
  return <HeaderClient nav={nav} />
}
