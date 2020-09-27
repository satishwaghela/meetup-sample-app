import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import DateFnsUtils from '@date-io/date-fns';

import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

import { getHelperText, useIsMount, MemoField, getEmptyObject } from './FieldUtils';

export default function FKeyboardDatePicker (props) {
  const {
    getKeyboardDatePickerProps = getEmptyObject, getKeyboardButtonProps = getEmptyObject, form, fieldKeyPath, validation,
    validateOnChange = true
  } = props;
  const fieldMetaData = form.getFieldMetaData(fieldKeyPath);

  const value = form.getFieldValue(fieldKeyPath, false);

  const isMount = useIsMount();
  useEffect(() => {
    if (validateOnChange && !isMount) {
      const validator = form.getValidator(fieldKeyPath, value);
      validator && validator();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const handleChange = (date) => {
    form.setFieldValue(fieldKeyPath, date);
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDatePicker
        margin="normal"
        format="MM/dd/yyyy"
        value={value}
        fullWidth
        onChange={handleChange}
        {...getKeyboardDatePickerProps()}
        KeyboardButtonProps={{
          ...getKeyboardButtonProps()
        }}
        ref={form.registerField(fieldKeyPath, {
          validation: validation
        })}
      />
      {getHelperText(fieldMetaData)}
    </MuiPickersUtilsProvider>
  );
}

FKeyboardDatePicker.propTypes = {
  getKeyboardDatePickerProps: PropTypes.func,
  getKeyboardButtonProps: PropTypes.func,
  form: PropTypes.object,
  fieldKeyPath: PropTypes.string,
  validation: PropTypes.func,
  validateOnChange: PropTypes.bool
};

export function MemoFKeyboardDatePicker (props) {
  return (
    <MemoField
      Field={FKeyboardDatePicker}
      props={props}
    />
  );
}

