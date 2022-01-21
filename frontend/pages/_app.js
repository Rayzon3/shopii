import 'tailwindcss/tailwind.css'
import AppContext from '../AppContext'
import { useState } from 'react';
import store from '../redux/store';
import { persistor } from '../redux/store'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'


function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Component {...pageProps} />
      </PersistGate>
    </Provider>

  );
}

export default MyApp

// C:\Program Files\PostgreSQL\14\bin>.\psql.exe -d postgres -U postgres