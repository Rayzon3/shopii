import { Disclosure } from '@headlessui/react'
import { useContext } from "react";
import AppContext from "../AppContext";


export default function NavBar() {

  const value = useContext(AppContext);
  let {isAuthenticated} = value.state;
  let {user} = value.state;
  console.log(isAuthenticated, user)
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
                    <h2 className="text-green">[Site Name + svg Logo]</h2>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 space-x-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {isAuthenticated 
                ?
                <div>
                  <a href="/login"><button className="px-3 py-1 rounded bg-green transform motion-safe:hover:scale-110 ..." >Login</button></a>
                  <a href="/signup"><button className="px-3 py-1 rounded bg-green transform motion-safe:hover:scale-110 ...">Sign Up</button></a>
                </div>
                :
                  <p>Hi! {user}</p>
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
