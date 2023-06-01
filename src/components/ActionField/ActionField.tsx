import { FC } from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';

import { ActionFieldProps } from './types';

import styles from './ActionField.module.scss';

const { actionField, actionFieldContainer } = styles;

export const ActionField: FC<ActionFieldProps> = ({
  buttonCaption,
  fieldType = 'text',
  isDisabled = false,
  label,
  onChange,
  onClick,
  value,
}) => (
  <Box className={actionFieldContainer}>
    <Typography fontSize="16px">{label}</Typography>
    <Box className={actionField}>
      <TextField
        onChange={onChange}
        size="small"
        type={fieldType}
        value={value}
      />
      <Button
        disabled={isDisabled}
        onClick={onClick}
        size="small"
        variant="contained"
      >
        {buttonCaption}
      </Button>
    </Box>
  </Box>
);
