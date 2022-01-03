import 'tailwindcss/tailwind.css'
import AppContext from '../AppContext'
import {useState } from 'react';



function MyApp({ Component, pageProps }) {

  const [isAuthenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState('');
  return (
  <AppContext.Provider
  value={{
    state:{
      isAuthenticated : isAuthenticated,
      user : user,
    },
    setAuthenticated : setAuthenticated,
    setUser : setUser,
  }}
  >
    <Component {...pageProps} />
  </AppContext.Provider>
  
  );
}

export default MyApp

// C:\Program Files\PostgreSQL\14\bin>.\psql.exe -d postgres -U postgres