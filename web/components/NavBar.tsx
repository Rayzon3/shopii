import React from 'react'
import { Fragment } from 'react'
import { Disclosure } from '@headlessui/react'

import { useAuthState, useAuthDispatch } from '../context/auth'
import Axios from 'axios'

export default function NavBar() {
  const { authenticated } = useAuthState()
  const dispatch = useAuthDispatch()

  const logout = () => {
    Axios.get('/auth/logout')
      .then(() => {
        dispatch('LOGOUT')
        window.location.reload()
      })
      .catch((err) => console.log(err))
  }

  return (
    <Disclosure
      as="nav"
      className="bbackdrop-filter border-b border-gray-200 bg-dark bg-opacity-90 to-transparent backdrop-blur-lg"
    >
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden"></div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <h2 className="text-green">[Site Name + svg Logo] </h2>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center space-x-2 pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {authenticated ? (
                  //logout button
                  <button
                    type="button"
                    className="... transform rounded-full bg-green px-3 py-1 motion-safe:hover:scale-110"
                    onClick={logout}
                  >
                    Logout
                  </button>
                ) : (
                  <Fragment>
                    <a href="/login">
                      <button className="... transform rounded-full bg-green px-3 py-1 motion-safe:hover:scale-110">
                        Log In
                      </button>
                    </a>
                    <a href="/register">
                      <button className="... transform rounded-full bg-green px-3 py-1 motion-safe:hover:scale-110">
                        Sign Up
                      </button>
                    </a>
                  </Fragment>
                )}
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden"></Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}
