import React from 'react';
import useForm from 'form-react-hook';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';

import { MemoFTextField } from '../../modules/FormFields/FTextField';
import { MemoFKeyboardDatePicker } from '../../modules/FormFields/FKeyboardDatePicker';
import { MemoFAutoComplete } from '../../modules/FormFields/FAutoComplete';

function AddParticipants () {
  const form = useForm({
    formData: {
      dob: new Date('01/01/2000')
    }
  });

  const handleSubmit = (e) => {
    form.getFormValidity((validity) => {
      if (validity.valid) {
        fetch('/api/add_participant', {
          method: 'post',
          body: JSON.stringify(form.formState.formData)
        }).then(res => {
          window.location = '/'
        })
      } else {
        form.validateForm();
      }
    });
  }

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={7}>
          <MemoFTextField
            form={form}
            fieldKeyPath='name'
            getTextFieldProps={() => ({
              label: "Name *"
            })}
            validation={(value, formState, callback) => {
              if (!value) {
                callback('Name is required!');
              } else {
                callback();
              }
            }}
          />
        </Grid>
        <Grid item xs={7}>
          <MemoFTextField
            form={form}
            fieldKeyPath='age'
            getTextFieldProps={() => ({
              label: "Age *",
              type: 'number'
            })}
            validation={(value, formState, callback) => {
              if (!value) {
                callback('Age is required!');
              } else {
                callback();
              }
            }}
          />
        </Grid>
        <Grid item xs={7}>
          <MemoFKeyboardDatePicker
            form={form}
            fieldKeyPath='dob'
            getKeyboardDatePickerProps={() => {
              return {
                label: 'Date Of Birth *'
              };
            }}
            validation={(value, formState, callback) => {
              if (!value) {
                callback('Date Of Birth is required!');
              } else {
                callback();
              }
            }}
          />
        </Grid>
        <Grid item xs={7}>
          <MemoFAutoComplete
            form={form}
            fieldKeyPath='profession'
            getAutocompleteProps={() => ({
              options: [{ name: "Employed" }, { name: "Student" }],
              getOptionLabel: (option) => option.name
            })}
            getTextFieldProps={() => ({
              label: "Profession"
            })}
            validation={(value, formState, callback) => {
              if (!value) {
                callback('Profession is required!');
              } else {
                callback();
              }
            }}
          />
        </Grid>
        <Grid item xs={7}>
          <MemoFTextField
            form={form}
            fieldKeyPath='locality'
            getTextFieldProps={() => ({
              label: "Locality *"
            })}
            validation={(value, formState, callback) => {
              if (!value) {
                callback('Locality is required!');
              } else {
                callback();
              }
            }}
          />
        </Grid>
        <Grid item xs={7}>
          <MemoFTextField
            form={form}
            fieldKeyPath='numberOfGuests'
            getTextFieldProps={() => ({
              label: "Number of Guests *",
              type: 'number',
              min: 0,
              max: 2
            })}
            validation={(value, formState, callback) => {
              if (!value) {
                callback('Number of Guests is required!');
              } else {
                callback();
              }
            }}
          />
        </Grid>
        <Grid item xs={7}>
          <MemoFTextField
            form={form}
            fieldKeyPath='address'
            getTextFieldProps={() => ({
              label: "Address *",
              multiline: true,
              rows: 4
            })}
            validation={(value, formState, callback) => {
              if (!value) {
                callback('Address is required!');
              } else {
                callback();
              }
            }}
          />
        </Grid>
      </Grid>
      <Box pt={3}>
        <Button onClick={handleSubmit} variant='contained' color='primary'>Submit</Button>
      </Box>
    </>
  );
}

export default AddParticipants;
