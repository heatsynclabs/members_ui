/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { FormProvider, useForm } from 'react-hook-form';
import { Button, CircularProgress, MenuItem, Paper, Select } from '@mui/material';
import { edit, getOne } from '../state/cards';
import { getAll } from '../state/user';
import FormInputText from '../components/form/FormInputText';
import FormInputDate from '../components/form/FormInputDate';
import Header from '../components/header';

export default function CardEdit() {
  const params = useParams();
  const card = useSelector(({ cards: { getOne: card } }) => card);
  const users = useSelector(({ user: { getAll: users } }) => users);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOne(params.card_id));
    dispatch(getAll());
  }, [dispatch, params.card_id]);

  const methods = useForm({
    defaultValues: {
      user_id: '',
      card_number: '',
      permissions: '',
      note: '',
    },
  });

  const { reset, setValue } = methods;

  useEffect(() => {
    if (card) {
      reset(card);
      setValue('user_id', card.user_id); // set the value of 'user_id' when the card data is available
    }
  }, [card, reset, setValue]);

  const onSubmit = (updatedCard) => {
    dispatch(edit(params.card_id, {
      user_id: updatedCard.user_id,
      card_number: updatedCard.card_number,
      permissions: updatedCard.permissions,
      note: updatedCard.note,
    }));
  };

  if (!card || !users) {
    return <CircularProgress />;
  }

  return (
    <>
      <Header />
      <Paper>
        <FormProvider {...methods}>
          <form id="cardForm" onSubmit={methods.handleSubmit(onSubmit)}>
            <Select name="user_id" label="User" value={methods.watch('user_id')} onChange={(e) => setValue('user_id', e.target.value)}>
              <MenuItem value="">Select a user...</MenuItem>
              {users.map((user) => (
                <MenuItem key={user.id} value={user.id}>{user.name}</MenuItem>
              ))}
            </Select>
            <FormInputText name="card_number" label="Card Number" />
            <FormInputText name="permissions" label="Permissions" />
            <FormInputText name="note" label="Note" />
          </form>
          <Button form="cardForm" type="submit">Submit</Button>
        </FormProvider>
      </Paper>
    </>
  );
}
