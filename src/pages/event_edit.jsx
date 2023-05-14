/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { FormProvider, useForm } from 'react-hook-form';
import { Button, CircularProgress, Paper } from '@mui/material';
import { edit, getOne } from '../state/events';
import FormInputText from '../components/form/FormInputText';
import FormInputDate from '../components/form/FormInputDate';
import Header from '../components/header';

export default function EventEdit() {
  const params = useParams();
  const event = useSelector(({ events: { getOne: event } }) => event);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOne(params.event_id));
  }, [dispatch, params.event_id]);

  const methods = useForm({
    defaultValues: {
      name: '',
      description: '',
      start_date: '',
      end_date: '',
      frequency: '',
      location: '',
    },
  });

  const { reset } = methods;

  useEffect(() => {
    reset(event);
  }, [event, reset]);

  const onSubmit = (updatedEvent) => {
    dispatch(edit(params.event_id, {
      name: updatedEvent.name,
      description: updatedEvent.description,
      start_date: updatedEvent.start_date,
      end_date: updatedEvent.end_date,
      location: updatedEvent.location,
      frequency: updatedEvent.frequency,
    }));
  };

  if (!event) {
    return <CircularProgress />;
  }

  return (
    <>
      <Header />
      <Paper>

        <FormProvider {...methods}>
          <form id="eventForm" onSubmit={methods.handleSubmit(onSubmit)}>
            <FormInputText name="name" label="Name" />
            <FormInputText name="description" label="Description" />
            <FormInputDate name="start_date" label="Start Date" />
            <FormInputDate name="end_date" label="End Date" />
            <FormInputText name="frequency" label="Frequency" />
            <FormInputText name="location" label="Location" />
          </form>
          <Button form="eventForm" type="submit">Submit</Button>
        </FormProvider>
      </Paper>
    </>
  );
}
