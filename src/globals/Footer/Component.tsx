import { getCachedGlobal } from '@/utilities/getGlobals'
import Link from 'next/link'

import type { Contact, Footer } from '@/payload-types'

import { Icon } from '@/components/Icon'
import { CMSLink } from '@/components/Link'
import { Logo } from '@/components/Logo/Logo'

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
          <ul className="space-y-1">
            {contactData.contacts?.map((contact) => (
              <li className="flex items-center gap-2" key={contact.id}>
                <Icon
                  name={contact.type === 'email' ? 'envelope-icon' : 'phone-call-icon'}
                  fallback="Question"
                  size={24}
                />
                <p className="space-x-2">
                  <b>{contact.label}</b> <span>{contact.value}</span>
                </p>
              </li>
            ))}
          </ul>
          <h3 className="sr-only">Social Links</h3>
          <ul className="flex gap-4">
            {contactData.socialLinks?.map((link) => (
              <li key={link.id}>
                <a href={link.url} title={link.label} {...(link.target && { target: link.target })}>
                  <Icon name={link.icon} fallback="Question" size={40} />
                  <span className="sr-only">{link.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  )
}
