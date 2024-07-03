import { FC, HTMLAttributes, useMemo } from 'react'

import { Icon } from '@/common'
import { IconNames } from '@/enums'

interface Props extends HTMLAttributes<HTMLDivElement> {
  title?: string
  message: string
  iconName?: IconNames
}

const DefaultToast: FC<Props> = ({ title, message, iconName, ...rest }) => {
  const toastIcon = useMemo(() => iconName || IconNames.checkCircle, [iconName])

  return (
    <div className='toast__body' {...rest}>
      <div className='toast__icon-wrp'>
        {toastIcon && <Icon className='toast__icon' name={toastIcon} />}
      </div>
      <div className='toast__details'>
        <h4 className='toast__title'>{title}</h4>
        <p className='toast__message'>{message}</p>
      </div>
    </div>
  )
}

export default DefaultToast
