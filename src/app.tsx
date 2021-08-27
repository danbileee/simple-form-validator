import React from 'react';
import { RecoilRoot } from 'recoil';

import ReservationContextProvider from './context';
import Form from './view/form';

import './normalize.css'

function App() {
  return (
    <RecoilRoot>
      <ReservationContextProvider>
        <Form />
      </ReservationContextProvider>
    </RecoilRoot>
  )
}

export default App;
