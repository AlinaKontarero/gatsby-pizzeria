import React, { useState } from 'react';
import SEO from '../components/SEO';

// 04-01 from module 10 
  const [name, setName] = useState('')
  return (
    <div>
      <SEO title="Order a Pizza" />
      <form>
        <fieldset>
          <legend>Your info</legend>
          <label htmlFor="name">Name</label>
          <input type="text" name="name" />
          <label htmlFor="email">Email</label>
          <input type="text" name="email" />
          <label htmlFor="name">Name</label>
          <input type="text" name="name" />
        </fieldset>
        <fieldset>
          <legend>Menu</legend>
        </fieldset>
        <fieldset>
          <legend>Order</legend>
        </fieldset>
      </form>
      <p>Hei! I'm the Order Page </p>
    </div>
  );
}
