import { HeaderClient } from './Component.client'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { Nav } from '@/payload-types'
import React from 'react'

import type { Header } from '@/payload-types'

export async function Header() {
  const headerData: Header = await getCachedGlobal('header', 1)()
  const nav: Nav = await getCachedGlobal('nav', 1)()
  return <HeaderClient header={headerData} nav={nav} />
}
