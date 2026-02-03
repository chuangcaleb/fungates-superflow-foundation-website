'use client'

import { CMSLink } from '@/components/Link'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'
import { Nav } from '@/payload-types'
import { cn } from '@/utilities/ui'
import { Fragment } from 'react'

const LinkItem = ({
  link,
  className,
}: {
  link: NonNullable<NonNullable<Nav['items']>[number]['item']['links']>[number]['link']
  className?: string
}) => {
  return (
    <NavigationMenuItem>
      <NavigationMenuLink asChild>
        <CMSLink {...link} className={cn('block py-2 text-sm', className)} />
      </NavigationMenuLink>
    </NavigationMenuItem>
  )
}

const GroupLinks = ({
  links,
}: {
  links: NonNullable<NonNullable<Nav['items']>[number]['item']['groups']>[number]['group']['links']
}) => {
  if (!links?.length) return null

  return (
    <ul className="grid grid-cols-2 gap-2">
      {links.map(({ link, id }) => (
        <LinkItem key={id} link={link} />
      ))}
    </ul>
  )
}

const Group = ({
  group,
}: {
  group: NonNullable<NonNullable<Nav['items']>[number]['item']['groups']>[number]['group']
}) => {
  if (!group) return null

  return (
    <li className="flex-1 space-y-3 p-2">
      <h4 className="text-xs font-semibold uppercase tracking-wider">{group.label}</h4>
      <GroupLinks links={group.links} />
    </li>
  )
}

// Root item with optional nested items
const RootItem = ({ item }: { item: NonNullable<Nav['items']>[number]['item'] }) => {
  if (!item) return null

  const { label, links, groups, variant } = item

  if (variant === 'single') {
    return (
      <NavigationMenuItem>
        <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
          <CMSLink {...item.link} />
        </NavigationMenuLink>
      </NavigationMenuItem>
    )
  }

  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger>{label}</NavigationMenuTrigger>
      <NavigationMenuContent>
        <ul
          className={cn({
            'w-80 p-2': variant === 'multi',
            'flex w-[80ch] gap-4 p-4': variant === 'group',
          })}
        >
          {links
            ?.filter(({ link }) => !link.onlyInFooter)
            .map(({ link, id }) => (
              <LinkItem link={link} key={id} className="px-2 py-3" />
            ))}
          {groups?.map(({ group, id }, index) => (
            <Fragment key={id}>
              <Group group={group} key={id} />
              {index !== groups.length - 1 && (
                <li className="flex">
                  <div className="w-px self-stretch bg-border"></div>
                </li>
              )}
            </Fragment>
          ))}
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
  )
}

export const NavMenu = ({ nav }: { nav: Nav }) => {
  const navItems = nav.items
  if (!navItems) return null

  return (
    <NavigationMenu className="hidden lg:block">
      <NavigationMenuList>
        {navItems.map(({ item: navItem, id }) => (
          <RootItem item={navItem} key={id} />
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  )
}
