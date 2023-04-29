import React, { useCallback } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs'

export default function FormInputDate({ name, label }) {
  const { control } = useFormContext();

  const handleRender = useCallback(({ field: { value, onChange }, fieldState: { error } }) => {
    return (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateTimePicker
          name={name}
          label={label}
          value={dayjs(value)}
          onChange={onChange}
        />
      </LocalizationProvider>
    );
  }, [label, name]);

  return (
    <Controller name={name} control={control} render={handleRender} />
  );
}
