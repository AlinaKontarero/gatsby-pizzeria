import React from 'react';
import Layout from './src/components/Layout';
import { OrderProvider } from './src/components/OrderContext'

const wrapPageElement = ({ element, props }) => (
  <Layout {...props}> {element} </Layout>
);

const wrapRootElement = ({ element }) => (
  <OrderProvider>{element}</OrderProvider>
);

export { wrapPageElement, wrapRootElement };
