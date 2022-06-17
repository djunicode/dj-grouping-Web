import React from 'react'
import { TextField } from '@mui/material'
import { useField } from 'formik'

function CustomTextField({ name, ...otherProps }) {

    const [field, meta] = useField(name);

    const config = {
        ...otherProps,
        ...field,
        fullWidth: true,
        variant: 'outlined'
    };

    if (meta && meta.touched && meta.error) {
        config.error = true;
        config.helperText = meta.error;
    }

    return (
        <TextField {...config} />
    )
}

export default CustomTextField