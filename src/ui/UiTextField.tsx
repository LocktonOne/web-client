import { FormLabel, IconButton, Stack, TextField, type TextFieldProps } from '@mui/material'
import { forwardRef, useMemo, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

import { Icons } from '@/enums'
import { UiIcon } from '@/ui/index'

type Props = TextFieldProps & {
  errorMessage?: string
}

const UiTextField = forwardRef(({ id, errorMessage, label, ...rest }: Props, ref) => {
  const [isPasswordHidden, setIsPasswordHidden] = useState(true)
  const fieldId = useMemo(() => id ?? `ui-text-field-${uuidv4()}`, [id])
  const inputType = useMemo(() => {
    if (rest.type !== 'password') return rest.type
    return isPasswordHidden ? 'password' : 'text'
  }, [isPasswordHidden, rest.type])

  return (
    <Stack spacing={2}>
      {label && <FormLabel htmlFor={fieldId}>{label}</FormLabel>}
      <TextField
        {...rest}
        id={fieldId}
        inputRef={ref}
        type={inputType}
        error={!!errorMessage}
        helperText={errorMessage || rest.helperText}
        InputProps={{
          endAdornment:
            rest.type === 'password' ? (
              <IconButton onClick={() => setIsPasswordHidden(prevState => !prevState)}>
                <UiIcon name={Icons.Eye} size={4} />
              </IconButton>
            ) : (
              <></>
            ),
        }}
      />
    </Stack>
  )
})

export default UiTextField
