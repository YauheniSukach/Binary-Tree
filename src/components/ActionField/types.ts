import { ChangeEvent } from 'react';

export interface ActionFieldProps {
  buttonCaption: string;
  fieldType?: 'text' | 'number';
  isDisabled?: boolean;
  label: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onClick: () => void;
  value: string | number | null;
}
