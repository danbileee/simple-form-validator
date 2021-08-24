import React from 'react';

import ReservationContextProvider from './context';
import Form from './view/form';

import './normalize.css'

function App() {
  return (
    <ReservationContextProvider>
      <Form />
    </ReservationContextProvider>
  )
}

export default App;
