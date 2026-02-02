import type { Nav } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { cn } from '@/utilities/ui'

// Nested item that is a single link
// const NavNestedLink = ({
//   item,
// }: {
//   item: NonNullable<NonNullable<NonNullable<Nav['items']>[number]['item']>['items']>[number]['item']
// }) => {
//   return <CMSLink {...item?.link} className="text-muted-foreground" />
// }

// Nested item with sub-label and multiple links
const NavLinkGroup = ({
  item,
}: {
  item: NonNullable<NonNullable<NonNullable<Nav['items']>[number]['item']>['items']>[number]['item']
}) => {
  if (!item) return null
  return (
    <div className="space-y-4">
      <h4>{item.label}</h4>
      <ul className="ml-1 space-y-4 border-l border-muted-foreground pl-4">
        {item.links?.map(({ link, id: linkId }) => (
          <li key={linkId}>
            <CMSLink {...link} className="text-muted-foreground" />
          </li>
        ))}
      </ul>
    </div>
  )
}

// Nested items list renderer
const NavNestedList = ({
  items,
}: {
  items: NonNullable<NonNullable<Nav['items']>[number]['item']>['items']
}) => {
  if (!items?.length) return null

  const isAllLinks = items.every(({ item }) => item?.isSingleLink)
  return (
    <ul className={cn(isAllLinks ? 'space-y-4' : 'flex flex-col gap-4 lg:flex-row lg:gap-8')}>
      {items.map(({ item: nestedItem, id: nestedId }) => (
        <li key={nestedId} className="flex-1">
          {nestedItem?.isSingleLink ? (
            <CMSLink {...nestedItem?.link} className="text-muted-foreground" />
          ) : (
            <NavLinkGroup item={nestedItem} />
          )}
        </li>
      ))}
    </ul>
  )
}

// Root item with optional nested items
const NavRootItem = ({ item }: { item: NonNullable<Nav['items']>[number]['item'] }) => {
  if (item?.isSingleLink) {
    // don't render single links at root
    return
    // return <CMSLink {...item.link} className="text-foreground" />
  }

  const childrenGroupsCount = item?.items?.filter(
    ({ item: nestedItem }) => !nestedItem?.isSingleLink,
  ).length

  return (
    <div className="flex-1 space-y-4" style={{ flexGrow: childrenGroupsCount || 1 }}>
      <h3 className="border-b border-muted-foreground pb-2 text-xl font-semibold">{item?.label}</h3>
      <NavNestedList items={item?.items} />
    </div>
  )
}

export const NavSection = ({ navItems }: { navItems: Nav['items'] }) => {
  const filteredNavItems = navItems?.filter(({ item }) => !item?.isSingleLink)
  if (!filteredNavItems?.length) return null

  return (
    <nav className="flex flex-col gap-12 lg:flex-row">
      {filteredNavItems.map(({ item: rootItem, id: rootId }) => (
        <NavRootItem key={rootId} item={rootItem} />
      ))}
    </nav>
  )
}
