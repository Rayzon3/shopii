import { Disclosure } from '@headlessui/react'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { logout } from '../redux/userRedux';

export default function NavBar() {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  // const handlelogout = () => {
  //   dispatch(logout(null));
  //   console.log(user);
  // }

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
                  user ?
                    <>
                      <h2 className="text-3xl text-white">{user.username}</h2>
                      <button className="px-3 py-1 rounded bg-green transform motion-safe:hover:scale-110 ..." onSubmit={handlelogout} >Logout</button>
                    </>
                    :
                    <>
                      <a href="/login"><button className="px-3 py-1 rounded bg-green transform motion-safe:hover:scale-110 ...">LogIn</button></a>
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
