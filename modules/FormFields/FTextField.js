import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import TextField from '@material-ui/core/TextField';

import { getHelperText, useIsMount, MemoField, getEmptyObject } from './FieldUtils';

export default function FTextField (props) {
  const { getTextFieldProps = getEmptyObject, form, fieldKeyPath, validation, valueChange = 'onChange', validateOnChange = true } = props;
  const fieldMetaData = form.getFieldMetaData(fieldKeyPath);

  const value = form.getFieldValue(fieldKeyPath);

  const isMount = useIsMount();
  useEffect(() => {
    if (validateOnChange && !isMount) {
      const validator = form.getValidator(fieldKeyPath, value);
      validator && validator();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const handleChange = _.debounce((value) => {
    form.setFieldValue(fieldKeyPath, value);
  }, 100);

  const changeHandleProps = {};
  if (valueChange === 'onBlur') {
    changeHandleProps.onBlur = (e) => handleChange(e.target.value);
  } else {
    changeHandleProps.onChange = (e) => handleChange(e.target.value);
  }

  return (
    <>
      <TextField
        error={!fieldMetaData.validating && !!fieldMetaData.error}
        fullWidth
        {...changeHandleProps}
        defaultValue={value || ''}
        ref={form.registerField(fieldKeyPath, {
          validation: validation
        })}
        {...getTextFieldProps({ value: value })}
      />
      {getHelperText(fieldMetaData)}
    </>
  );
}

FTextField.propTypes = {
  getTextFieldProps: PropTypes.func,
  valueChange: PropTypes.string,
  form: PropTypes.object,
  fieldKeyPath: PropTypes.string,
  validateOnChange: PropTypes.bool,
  validation: PropTypes.func
};

export function MemoFTextField (props) {
  return (
    <MemoField
      Field={FTextField}
      props={props}
    />
  );
}
