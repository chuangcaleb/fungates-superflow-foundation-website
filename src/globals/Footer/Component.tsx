import { getCachedGlobal } from '@/utilities/getGlobals'
import Link from 'next/link'

import type { Contact, Footer } from '@/payload-types'

import { Icon } from '@/components/Icon'
import { CMSLink } from '@/components/Link'
import { Logo } from '@/components/Logo/Logo'
import ContactListItem from '@/components/ContactListItem'
import RichText from '@/components/RichText'

export async function Footer() {
  const footerData: Footer = await getCachedGlobal('footer', 1)()
  const contactData: Contact = await getCachedGlobal('contact', 1)()

  const navItems = footerData?.navItems || []

  return (
    <footer className="mt-auto border-t border-border bg-black text-white">
      <div className="container space-y-8 py-8 md:justify-between">
        <Link className="flex items-center" href="/">
          <Logo />
        </Link>

        <div className="space-y-8">
          <nav className="flex flex-col gap-4 sm:flex-row">
            {navItems.map(({ link }, i) => {
              return <CMSLink className="text-white" key={i} {...link} />
            })}
          </nav>
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
