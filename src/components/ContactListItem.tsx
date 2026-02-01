import ListItemWithIcon from '@/components/ListItemWithIcon'
import { Contact } from '@/payload-types'

const ContactListItem = ({ contact }: { contact: NonNullable<Contact['contacts']>[number] }) => {
  return (
    <ListItemWithIcon iconName={contact.type === 'email' ? 'envelope-icon' : 'phone-icon'}>
      <dl className="not-prose flex items-center gap-4">
        <dt className="font-bold">{contact.label}</dt>{' '}
        <dd className="font-mono">{contact.value}</dd>
      </dl>
    </ListItemWithIcon>
  )
}

export default ContactListItem
