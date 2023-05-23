import { useState, forwardRef } from 'react';

import { TextField, TextFieldProps, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

export const PasswordTextField = forwardRef((props: TextFieldProps, ref) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => setShowPassword(show => !show);

  return (
    <TextField
      {...props}
      inputRef={ref}
      InputProps={{
        endAdornment: (
          <InputAdornment
            sx={{ cursor: 'pointer' }}
            position="end"
            onClick={toggleShowPassword}
          >
            {showPassword ? <Visibility /> : <VisibilityOff />}
          </InputAdornment>
        ),
      }}
      type={showPassword ? 'text' : 'password'}
    />
  );
});
