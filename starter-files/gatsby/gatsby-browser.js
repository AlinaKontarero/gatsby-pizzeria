import React from 'react';
import Layout from './src/components/Layout';
import { OrderProvider } from './src/components/OrderContext';

const wrapPageElement = ({ element, props }) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <Layout {...props}> {element} </Layout>
);

const wrapRootElement = ({ element }) => (
  <OrderProvider>{element}</OrderProvider>
);

export { wrapPageElement, wrapRootElement };

// 06:18: check in browser if you see any hook states 
