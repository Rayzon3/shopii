import React from 'react';
import { Disclosure } from '@headlessui/react'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { logout } from '../redux/userRedux';
import { useRouter } from 'next/router'
import {useEffect} from 'react'
import axios from 'axios';


export default function NavBar() {

  const user = useSelector((state) => state.user);
  const router  = useRouter();
  const dispatch = useDispatch();
  const [logout1, setLogout1] = React.useState(false)
  const token  =  localStorage.getItem('token');

  const handleLogout = () =>{
    console.log('logout')
    dispatch(logout());
    localStorage.removeItem('token');
    window.location.reload(false);
  }
  useEffect(() => {
    console.log('Navbar changed')
  }, [token])
    // useEffect (()=>{
    //   console.log(logout1);
    //   if(logout1) {
    //     dispatch(logout());
    //     axios.get('http://localhost:5000/api/auth/logout/')
    //     .then(res=>{
    //       console.log(res)
          
      
    //   router.push('/');
    //     })
    //     .catch((error) => {
    //       if( error.response ){
    //         console.log(error.response.data);
    //        } // => the response payload
    //     })
    //   }
    // },[logout1]);

  return (
    <Disclosure as="nav" className="bg-gray-800">
      {({ open }) => (
        <>
          <div className="px-2 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="relative flex items-center justify-between h-16">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              </div>
              <div className="flex items-center justify-center flex-1 sm:items-stretch sm:justify-start">
                <div className="flex items-center flex-shrink-0">
                  <h2 className="text-green">[Site Name + svg Logo] </h2>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 space-x-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {
                  token ?
                    <>
                      <h2 className="text-3xl text-white">{user}</h2>
                      <button type='button' className="px-3 py-1 rounded bg-green transform motion-safe:hover:scale-110 ..." onClick={(e)=>handleLogout()} >Logout</button>
                    </>
                    :
                    <>
                      <a href="/login"><button className="px-3 py-1 rounded bg-green transform motion-safe:hover:scale-110 ...">Log In</button></a>
                      <a href="/signup"><button className="px-3 py-1 rounded bg-green transform motion-safe:hover:scale-110 ...">Sign Up</button></a>
                    </>
                }
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}
