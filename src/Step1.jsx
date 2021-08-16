import React from 'react';
import MainContainer from './components/MainContainer';
import Typography from '@material-ui/core/Typography';
import Form from './components/Form';
import Input from './components/Input';
import { useForm } from 'react-hook-form';
import PrimaryButton from './components/PrimaryButton';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useHistory } from 'react-router-dom';

const schema = yup.object().shape({
  firstName: yup
    .string()
    .matches(/^([^0-9]*)$/, 'First name should not contain numbers')
    .required('First name is a required field'),
  lastName: yup
    .string()
    .matches(/^([^0-9]*)$/, 'Last name should not contain numbers')
    .required('Last name is a required field'),
});

const Step1 = () => {
  const history = useHistory();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(schema),
  });

  const onSubmit = data => {
    history.push('/step2');
  };

  return (
    <MainContainer>
      <Typography component='h2' variant='h5'>
        🦄 Step 1
      </Typography>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Input
          id='firstName'
          type='text'
          label='First Name'
          {...register('firstName')}
          error={!!errors.firstName}
          helperText={errors?.firstName?.message}
        />
        <Input
          id='lastName'
          type='text'
          label='Last Name'
          {...register('lastName')}
          error={!!errors.lastName}
          helperText={errors?.lastName?.message}
        />
        <PrimaryButton>Next</PrimaryButton>
      </Form>
    </MainContainer>
  );
};

export default Step1;
