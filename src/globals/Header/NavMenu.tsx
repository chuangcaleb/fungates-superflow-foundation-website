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

const LinkItem = ({
  link,
}: {
  link: NonNullable<NonNullable<Nav['items']>[number]['item']['links']>[number]['link']
}) => {
  return (
    <NavigationMenuItem>
      <CMSLink {...link} className="text-foreground" />
    </NavigationMenuItem>
  )
}

const Group = ({
  group,
}: {
  group: NonNullable<NonNullable<Nav['items']>[number]['item']['groups']>[number]['group']
}) => {
  return <div>NavMenu</div>
}

// Root item with optional nested items
const RootItem = ({ item }: { item: NonNullable<Nav['items']>[number]['item'] }) => {
  if (!item) return null

  if (item.variant === 'single') {
    return (
      <NavigationMenuItem>
        <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
          <CMSLink {...item.link} className="text-foreground" />
        </NavigationMenuLink>
      </NavigationMenuItem>
    )
  }

  const { label, links, groups } = item

  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger>{label}</NavigationMenuTrigger>
      <NavigationMenuContent>
        <ul className="w-96">
          {links?.map(({ link, id }) => (
            <LinkItem link={link} key={id} />
          ))}
          {groups?.map(({ group, id }) => (
            <Group group={group} key={id} />
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

// function ListItem({
//   title,
//   children,
//   href,
//   ...props
// }: React.ComponentPropsWithoutRef<'li'> & { href: string }) {
//   return (
//     <li {...props}>
//       <NavigationMenuLink asChild>
//         <Link href={href}>
//           <div className="flex flex-col gap-1 text-sm">
//             <div className="font-medium leading-none">{title}</div>
//             <div className="line-clamp-2 text-muted-foreground">{children}</div>
//           </div>
//         </Link>
//       </NavigationMenuLink>
//     </li>
//   )
// }
