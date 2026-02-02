import ContactListItem from '@/components/ContactListItem'
import { Icon } from '@/components/Icon'
import { CMSLink } from '@/components/Link'
import ListItemWithIcon from '@/components/ListItemWithIcon'
import RichText from '@/components/RichText'
import { Contact } from '@/payload-types'
import { getCachedGlobal } from '@/utilities/getGlobals'
import React, { Fragment } from 'react'

export const ContactBlock: React.FC<{}> = async ({}) => {
  const contactData: Contact = await getCachedGlobal('contact', 1)()
  return (
    <div className="container prose">
      <h2>Locations</h2>
      {contactData.locations?.map((location) => (
        <Fragment key={location.id}>
          <h3>{location.title}</h3>
          <ListItemWithIcon
            iconName="map-pin"
            htmlElement="section"
            contClassName="items-start"
            iconClassName="mt-0.5"
          >
            <div>
              <header className="block font-bold">Address</header>
              <address className="whitespace-pre-wrap not-italic">{location.address}</address>
            </div>
          </ListItemWithIcon>

          <ul className="!pl-0">
            {location.contacts?.map((contact) => (
              <ContactListItem contact={contact} key={contact.id} />
            ))}
          </ul>
        </Fragment>
      ))}
      <h2>Contacts</h2>
      <ul className="!pl-0">
        {contactData.contacts?.map((contact) => (
          <ContactListItem contact={contact} key={contact.id} />
        ))}
      </ul>
      {contactData.bottomText && (
        <RichText
          className="text-sm text-muted-foreground"
          data={contactData.bottomText}
          enableGutter={false}
        />
      )}
      <h2>Social Links</h2>
      <ul className="!pl-0">
        {contactData.socialLinks?.map((link) => (
          <ListItemWithIcon iconName={link.icon} key={link.id}>
            <CMSLink {...link} newTab />
          </ListItemWithIcon>
        ))}
      </ul>
    </div>
  )
}
