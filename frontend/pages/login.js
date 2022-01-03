import Head from "next/dist/shared/lib/head"
import axios from 'axios'
import { useEffect, useState } from 'react'
import {useRouter} from 'next/router'
import { useContext } from "react";
import AppContext from "../AppContext";


const Loginpage = () => {

    const value = useContext(AppContext);
    let {isAuthenticated} = value.state;
    let {user} = value.state;
    let {setAuthenticated, setUser} = value;
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    

    const router = useRouter();

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post('http://localhost:5000/api/auth/login/',
            {
                username: username,
                password: password,

            }).then((res) => {
                console.log(res);                
                if (res.status === Number(200)) {
                    setAuthenticated(true)
                    setUser(username)
                    console.log(isAuthenticated)
                    console.log(user);
                    console.log('Login success');
                    router.push('/')
                }
            })
            .catch((error) => {
                if (error.response) {
                    console.log(error.response.data);
                    if (error.response.status === Number(401)) {
                        console.log("wrong username or password");
                    }
                    else if (error.response.status === Number(404)) {
                        console.log("User not found");
                    }
                }
            });

    
    
    
        setUsername('');
        setPassword('');

        

    }


    return (
        <div className="min-h-screen  mx-auto py-2 bg-midNight">
            <Head >
                <title>[Site Name]</title>
                <link rel="icon" href="/tree.ico" />
            </Head>
            <div className="w-1/3 mt-40 mx-auto border p-6 rounded-xl   ">
                <form onSubmit={(e) => handleSubmit(e)}>
                    <h1 className="text-green text-center text-4xl font-bold">Login</h1>
                    <div className="flex flex-col p-3 mt-3">
                        <div className="mb-1">
                            <label for="username" className="text-white text-2xl" >Username:</label>
                        </div>
                        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="  w-full py-1 px-3 border focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent rounded" placeholder="Username" id="username" name="username" ></input>
                    </div>
                    <div className="p-3">
                        <div className="mb-1">
                            <label for="pass" className="text-white text-2xl" >Password:</label>
                        </div>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full py-1 px-3 border focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent rounded" id="pass" placeholder="Password" name="pass"></input>

                    </div>
                    <div className="text-center m-2">
                        <p className="text-white mb-4 m-3"><a className="text-blue" href="/signup">New user? Sign up here</a></p>
                        <button type="submit" className="bg-green hover:bg-green-500 text-midNight font-bold py-2 px-4 rounded">Lets go in there</button>
                    </div>


                </form>
            </div>
        </div>
    )
}

export default Loginpage
