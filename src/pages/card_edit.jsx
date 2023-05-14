/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { FormProvider, useForm } from 'react-hook-form';
import { CircularProgress, MenuItem, Paper, Select } from '@mui/material';
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

  const { reset } = methods;

  useEffect(() => {
    reset(card);
  }, [card, reset]);

  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    if (card) {
      setSelectedUser(card.user_id);
    }
  }, [card]);

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
            <Select name="user_id" label="User" value={selectedUser} onChange={(e) => setSelectedUser(e.target.value)}>
              <MenuItem value="">Select a user...</MenuItem>
              {users.map((user) => (
                <MenuItem key={user.id} value={user.id}>{user.name}</MenuItem>
              ))}
            </Select>
            <FormInputText name="card_number" label="Card Number" />
            <FormInputText name="permissions" label="Permissions" />
            <FormInputText name="note" label="Note" />
          </form>
        </FormProvider>

        Hello
        <pre>{JSON.stringify(card, null, 2)}</pre>
        <button form="cardForm" type="submit">Submit</button>
      </Paper>
    </>
  );
}
