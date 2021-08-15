import React from 'react';
import MainContainer from './components/MainContainer';
import Typography from '@material-ui/core/Typography';
import Form from './components/Form';
import Input from './components/Input';
import { useForm } from 'react-hook-form';
import PrimaryButton from './components/PrimaryButton';

const Step1 = () => {
  const { register, handleSubmit, errors } = useForm({
    mode: 'onBlur',
  });

  return (
    <MainContainer>
      <Typography component='h2' variant='h5'>
        🦄 Step 1
      </Typography>
      <Form>
        <Input
          id='firstName'
          type='text'
          label='First Name'
          {...register('firstName')}
        />
        <Input
          id='lastName'
          type='text'
          label='Last Name'
          {...register('lastName')}
        />
        <PrimaryButton>Next</PrimaryButton>
      </Form>
    </MainContainer>
  );
};

export default Step1;
