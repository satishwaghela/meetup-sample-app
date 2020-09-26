import React from 'react';
import useForm from 'form-react-hook';
import { MemoFTextField } from '../../modules/FormFields/FTextField';

function AddParticipants () {
  const form = useForm({
    formData: {}
  });

  return (
    <div>
      <MemoFTextField
        form={form}
        fieldKeyPath='name'
        getTextFieldProps={() => ({
          label: "Name"
        })}
        validation={(value, formState, callback) => {
          if (!value) {
            callback('Name is required!');
          } else {
            callback();
          }
        }}
      />
    </div>
  );
}

export default AddParticipants;
