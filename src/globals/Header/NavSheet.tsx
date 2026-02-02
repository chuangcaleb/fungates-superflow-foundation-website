'use client'

import { Icon } from '@/components/Icon'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Nav } from '@/payload-types'
import { CMSLink } from '@/components/Link'
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion'

const NavSheet = ({ nav }: { nav: Nav }) => {
  const navItems = nav?.items

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">
          <Icon name="list-icon" weight="bold" size={20} />
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col overflow-y-auto">
        <SheetHeader className="mb-2">
          <SheetTitle>Site Navigation</SheetTitle>
        </SheetHeader>

        <Accordion type="single" collapsible defaultValue={navItems?.[0]?.id ?? undefined}>
          {navItems?.map(({ item, id }) => {
            if (!item || !id) return null
            if (item.variant === 'single') return null
            return (
              <AccordionItem key={id} value={id}>
                <AccordionTrigger className="border-b border-b-muted-foreground pb-2 pt-4 font-semibold">
                  {item.label}
                </AccordionTrigger>
                <AccordionContent>
                  {/* Multi variant: flat list of links */}
                  {item.variant === 'multi' && item.links && (
                    <ul className="space-y-4 pb-2 pt-4">
                      {item.links.map(({ link, id: linkId }) => (
                        <li key={linkId}>
                          <CMSLink {...link} className="block py-1" />
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Group variant: nested groups with their own link lists */}
                  {item.variant === 'group' && item.groups && (
                    <div className="space-y-8 pb-2 pt-4">
                      {item.groups.map(({ group, id: groupId }) => (
                        <section key={groupId} className="space-y-4">
                          <h4 className="mt-2 text-xs font-semibold uppercase tracking-wider">
                            {group.label}
                          </h4>
                          <ul className="space-y-4">
                            {group.links?.map(({ link, id: lId }) => (
                              <li key={lId}>
                                <CMSLink {...link} className="block py-1" />
                              </li>
                            ))}
                          </ul>
                        </section>
                      ))}
                    </div>
                  )}
                </AccordionContent>
              </AccordionItem>
            )
          })}
        </Accordion>
      </SheetContent>
    </Sheet>
  )
}

export default NavSheet
