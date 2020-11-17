import { useState } from 'react';

export default function useForm(defaults) {
  const [values, setValues] = useState(defaults);

  const updateValue = (e) => {
    // check if it's a number and convert:
    let { value } = e.target;
    if (e.target.type === 'number') {
      // eslint-disable-next-line no-unused-vars
      value = parseInt(e.target.value);
    }
    setValues({
      // copy existing values into it:
      ...values,
      // update new value that changes:
      [e.target.name]: e.target.value,
    });
  };
  return { values, updateValue };
}
