'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

import type { Header, Nav } from '@/payload-types'

import { Logo } from '@/components/Logo/Logo'
import { NavMenu } from './NavMenu'
import NavSheet from './NavSheet'
interface HeaderClientProps {
  header: Header
  nav: Nav
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ header, nav }) => {
  /* Storing the value in a useState to avoid hydration errors */
  const [theme, setTheme] = useState<string | null>(null)
  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const pathname = usePathname()

  useEffect(() => {
    setHeaderTheme(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  useEffect(() => {
    if (headerTheme && headerTheme !== theme) setTheme(headerTheme)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headerTheme])

  return (
    <header className="container relative z-20" {...(theme ? { 'data-theme': theme } : {})}>
      <div className="flex gap-8 py-4">
        <Link href="/" className="flex items-center">
          <Logo loading="eager" priority="high" className="invert dark:invert-0" />
        </Link>
        <NavMenu nav={nav} />
        <div className="ml-auto lg:hidden">
          <NavSheet nav={nav} />
        </div>
      </div>
    </header>
  )
}
