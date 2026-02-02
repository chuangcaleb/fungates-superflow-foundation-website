import type { Nav } from '@/payload-types'

import { CMSLink } from '@/components/Link'

// Nested items list renderer
const NavLinkList = ({
  links,
}: {
  links: NonNullable<NonNullable<Nav['items']>[number]['item']>['links']
}) => {
  if (!links?.length) return null

  return (
    <ul className="space-y-4">
      {links.map(({ link, id: nestedId }) => (
        <li key={nestedId} className="min-w-40">
          <CMSLink {...link} className="text-sm text-muted-foreground" />
        </li>
      ))}
    </ul>
  )
}

// Root item with optional nested items
const NavRootItem = ({ item }: { item: NonNullable<Nav['items']>[number]['item'] }) => {
  if (item.variant === 'single') {
    // don't render single links at root for Footer
    return
    // return <CMSLink {...item.link} className="text-foreground" />
  }

  if (item.variant === 'multi') {
    return (
      <div className="flex-1 space-y-4">
        <section className="border-b border-muted-foreground pb-2 text-xl font-semibold">
          {item?.label}
        </section>
        <NavLinkList links={item?.links} />
      </div>
    )
  }

  // is variant === 'group'
  return (
    <section className="flex-1 space-y-4 lg:px-2" style={{ flexGrow: item.groups?.length || 1 }}>
      <h3 className="border-b border-muted-foreground pb-2 text-xl font-semibold">{item?.label}</h3>
      <div className="flex flex-col gap-8 lg:flex-row">
        {item.groups?.map(({ group, id }) => (
          <section className="space-y-4" key={id}>
            <h4 className="mt-2 text-xs font-semibold uppercase tracking-wider">{group.label}</h4>
            <NavLinkList key={id} links={group.links} />
          </section>
        ))}
      </div>
    </section>
  )
}

export const NavSection = ({ navItems }: { navItems: Nav['items'] }) => {
  if (!navItems?.length) return null
  return (
    <nav className="flex flex-col gap-12 lg:flex-row">
      {navItems.map(({ item: rootItem, id: rootId }) => (
        <NavRootItem key={rootId} item={rootItem} />
      ))}
    </nav>
  )
}
