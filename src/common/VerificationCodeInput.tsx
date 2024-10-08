import { Box, TextField } from '@mui/material'
import React, { useRef, useState } from 'react'

type Props = {
  length?: number
  onChange: (code: string) => void
}

export default function VerificationCodeInput({ length = 6, onChange }: Props) {
  const [values, setValues] = useState(Array(length).fill(''))
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  const handleChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    if (/^[0-9]$/.test(value) || value === '') {
      const newValues = [...values]
      newValues[index] = value
      setValues(newValues)

      onChange(newValues.join(''))

      if (value && index < inputRefs.current.length - 1) {
        inputRefs.current[index + 1]?.focus()
      }
    }
  }

  const handleKeyDown = (index: number, event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Backspace' && values[index] === '' && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
    const pasteData = event.clipboardData.getData('text').slice(0, length).split('')
    const newValues = [...values]

    pasteData.forEach((char, i) => {
      if (/^[0-9]$/.test(char) && i < newValues.length) {
        newValues[i] = char
        inputRefs.current[i]?.focus()
      }
    })

    setValues(newValues)
    if (onChange) {
      onChange(newValues.join(''))
    }
  }

  return (
    <Box display='flex' justifyContent='center' gap={1}>
      {values.map((value, index) => (
        <TextField
          key={index}
          inputRef={el => (inputRefs.current[index] = el)}
          value={value}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleChange(index, event)}
          onKeyDown={(event: React.KeyboardEvent<HTMLInputElement>) => handleKeyDown(index, event)}
          onPaste={handlePaste}
          inputProps={{
            maxLength: 1,
          }}
          sx={{
            width: 48,
            '& input': {
              textAlign: 'center',
              fontSize: '1.5rem',
            },
          }}
        />
      ))}
    </Box>
  )
}
