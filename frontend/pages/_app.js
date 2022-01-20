import 'tailwindcss/tailwind.css'
import AppContext from '../AppContext'
import { useState } from 'react';
import store from '../redux/store';
import { Provider } from 'react-redux'



function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
        <Component {...pageProps} />
    </Provider>

  );
}

export default MyApp

// C:\Program Files\PostgreSQL\14\bin>.\psql.exe -d postgres -U postgres