import { Icon } from '@/components/Icon'
import { cn } from '@/utilities/ui'
import { ElementType, Fragment, ReactNode } from 'react'

type Props = {
  iconName: string
  children: ReactNode
  contClassName?: string
  iconClassName?: string
  htmlElement?: ElementType | null
}

const ListItemWithIcon: React.FC<Props> = ({
  iconName,
  children,
  htmlElement = 'li',
  contClassName,
  iconClassName,
}) => {
  const Tag = htmlElement || Fragment

  return (
    <Tag className={cn('flex items-center gap-2', contClassName)}>
      <Icon name={iconName} size={22} className={iconClassName} fallback="Question" />
      {children}
    </Tag>
  )
}

export default ListItemWithIcon
