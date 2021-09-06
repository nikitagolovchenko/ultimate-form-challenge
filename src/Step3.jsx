import React from 'react'
import MainContainer from './components/MainContainer';
import { Typography } from '@material-ui/core';
import Form from './components/Form';
import PrimaryButton from './components/PrimaryButton';
import { useForm } from 'react-hook-form';
import FileInput from './components/FileInput';
import { useHistory } from 'react-router-dom';
import { useData } from './DataContext';

const Step3 = () => {
  const history = useHistory();
  const {data, setValues} = useData();
  const {control, handleSubmit} = useForm({
    defaultValues: {
      files: data.files
    }
  });

  const onSubmit = (data) => {
    history.push('/result');
    setValues(data);
  }

  return (
    <MainContainer>
      <Typography component='h2' variant='h5'>
        🦄 Step 3
      </Typography>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FileInput name="files" control={control} />

        <PrimaryButton>Next</PrimaryButton>
      </Form>
    </MainContainer>
  )
}

export default Step3
