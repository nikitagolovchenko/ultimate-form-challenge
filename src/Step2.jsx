import React from 'react';
import MainContainer from './components/MainContainer';
import Typography from '@material-ui/core/Typography';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Form from './components/Form';
import Input from './components/Input';
import PrimaryButton from './components/PrimaryButton';
import { useHistory } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import parsePhoneNumberFromString from 'libphonenumber-js';
import { useData } from './DataContext';

const schema = yup.object().shape({
  email: yup
    .string()
    .email('Email should have correct format')
    .required('Email is a required field'),
});

const normalizePhoneNumber = value => {
  const phoneNumber = parsePhoneNumberFromString(value);

  if (!phoneNumber) {
    return value;
  }

  return phoneNumber.formatInternational();
};

const Step2 = () => {
  const history = useHistory();
  const { data, setValues } = useData();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    control,
  } = useForm({
    defaultValues: {
      email: data.email,
      hasPhone: data.hasPhone,
      phoneNumber: data.phoneNumber,
    },
    mode: 'onBlur',
    resolver: yupResolver(schema),
  });

  const hasPhone = watch('hasPhone'); // следим за изменением в реальном времени

  const onSubmit = data => {
    history.push('/step3');
    setValues(data);
  };

  return (
    <MainContainer>
      <Typography component='h2' variant='h5'>
        🦄 Step 2
      </Typography>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Input
          id='email'
          type='email'
          label='Email'
          {...register('email')}
          required
          error={!!errors.email}
          helperText={errors?.email?.message}
        />

        {/* Controller (react-hook-form) - для работы с чекбоксами material-ui */}
        <Controller
          control={control}
          name='hasPhone'
          render={({ field }) => (
            <FormControlLabel
              control={<Checkbox {...field} defaultValue={data.hasPhone} defaultChecked={data.hasPhone} color='primary' />}
              label='Do you have a phone'
            />
          )}
        />

        {hasPhone && (
          <Input
            {...register('phoneNumber')}
            id='phoneNumber'
            type='tel'
            label='Phone number'
            name='phoneNumber'
            onChange={event => {
              event.target.value = normalizePhoneNumber(event.target.value);
            }}
          />
        )}

        <PrimaryButton>Next</PrimaryButton>
      </Form>
    </MainContainer>
  );
};

export default Step2;
