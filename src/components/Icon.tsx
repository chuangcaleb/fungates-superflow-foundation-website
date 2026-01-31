'use client'

import * as Icons from '@phosphor-icons/react'
import type { IconProps } from '@phosphor-icons/react'
import type { ComponentType } from 'react'

/**
 * Convert kebab-case to PascalCase
 * hand-coins -> HandCoins
 * arrow-up-right -> ArrowUpRight
 */
function kebabToPascal(str: string) {
  return str
    .split('-')
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join('')
}

/**
 * All valid Phosphor icon component names
 */
type PhosphorIconComponentName = keyof typeof Icons

export interface IconComponentProps extends IconProps {
  /**
   * Icon name in kebab-case or PascalCase
   * e.g. "hand-coins" | "HandCoins"
   */
  name: string
  /**
   * Optional fallback icon if name does not exist
   */
  fallback?: PhosphorIconComponentName
}

/**
 * Universal Icon component
 *
 * Works with:
 * - CMS data (kebab-case)
 * - Direct component names (PascalCase)
 *
 * RSC-safe (client-only)
 */
export function Icon({ name, fallback, ...props }: IconComponentProps) {
  const componentName = name.includes('-') ? kebabToPascal(name) : name

  const Component =
    (Icons as unknown as Record<string, ComponentType<IconProps>>)[componentName] ??
    (fallback ? Icons[fallback] : null)

  if (!Component) return null

  return <Component {...props} />
}
