import './styles.scss'

import { FormEvent, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { AppButton, Icon } from '@/common'
import { IconNames } from '@/enums'
import { InputField } from '@/fields'
import { bus, BUS_EVENTS, ErrorHandler, required } from '@/helpers'
import { useForm, useFormValidation } from '@/hooks'

const AdminLoginForm = () => {
  const { t } = useTranslation()
  const [seed, setSeed] = useState('')

  const { isFormDisabled, disableForm, enableForm } = useForm()
  const { isFieldsValid, touchForm, getFieldErrorMessage, touchField } =
    useFormValidation(
      {
        seed,
      },
      {
        seed: { required },
      },
    )

  const submit = async (e: FormEvent) => {
    e.preventDefault()
    touchForm()
    if (!isFieldsValid) {
      bus.emit(BUS_EVENTS.error, 'form invalid')
      return
    }

    disableForm()
    try {
      bus.emit(BUS_EVENTS.success, t('login-form.login-success-msg'))
      bus.emit(BUS_EVENTS.success, `${seed}`)
    } catch (error) {
      ErrorHandler.process(error)
    }
    enableForm()
  }

  return (
    <form onSubmit={submit} className='admin-login-form'>
      <Icon name={IconNames.userCircle} className='admin-login-form__icon' />
      <h4 className='admin-login-form__title'>{t('login-form.admin-title')}</h4>
      <span className='admin-login-form__desc'>
        {t('login-form.admin-desc')}
      </span>
      <div className='admin-login-form__input-wrapper'>
        <p className='admin-login-form__input-label'>
          {t('login-form.admin-lbl')}
        </p>
        <InputField
          className='admin-login-form__input'
          value={seed}
          updateValue={setSeed}
          nodeLeft={
            <Icon
              name={IconNames.lockClosed}
              className='admin-login-form__input-icon'
            />
          }
          placeholder={t('login-form.admin-placeholder')}
          errorMessage={getFieldErrorMessage('seed')}
          onBlur={() => touchField('seed')}
          isDisabled={isFormDisabled}
        />
      </div>
      <AppButton
        className='admin-login-form__button'
        text={t('login-form.submit-btn')}
        isDisabled={isFormDisabled}
      />
    </form>
  )
}

export default AdminLoginForm
