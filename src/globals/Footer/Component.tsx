import { getCachedGlobal } from '@/utilities/getGlobals'
import Link from 'next/link'

import type { Contact, Nav } from '@/payload-types'

import ContactListItem from '@/components/ContactListItem'
import { Icon } from '@/components/Icon'
import { CMSLink } from '@/components/Link'
import { Logo } from '@/components/Logo/Logo'
import RichText from '@/components/RichText'
import { NavSection } from './NavSection'

export async function Footer() {
  const contactData: Contact = await getCachedGlobal('contact', 1)()
  const { items: nav }: Nav = await getCachedGlobal('nav', 1)()

  return (
    <footer
      className="mt-auto border-t border-border bg-background text-foreground"
      data-theme="dark"
    >
      <div className="container space-y-16 py-8 md:justify-between">
        <div className="flex flex-col gap-16 md:flex-row">
          <Link className="mt-2" href="/">
            <Logo />
          </Link>
          <NavSection navItems={nav} />
        </div>
        <hr className="border-muted-foreground" />
        <div className="space-y-8">
          <h3 className="sr-only">Contact</h3>
          {!!contactData.contacts?.length && contactData.bottomText && (
            <section className="space-y-4">
              <ul className="space-y-1">
                {contactData.contacts?.map((contact) => (
                  <ContactListItem contact={contact} key={contact.id} />
                ))}
              </ul>
              {contactData.bottomText && (
                <RichText
                  className="text-muted-foreground"
                  data={contactData.bottomText}
                  enableGutter={false}
                />
              )}
            </section>
          )}
          <h3 className="sr-only">Social Links</h3>
          <ul className="flex gap-6">
            {contactData.socialLinks?.map((link) => (
              <li key={link.id}>
                <CMSLink {...link} label={undefined} newTab>
                  <Icon name={link.icon} fallback="Question" size={40} />
                  <span className="sr-only">{link.label}</span>
                </CMSLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  )
}
