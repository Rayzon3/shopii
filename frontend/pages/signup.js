import axios from 'axios'
import { useState } from 'react'
import {useRouter} from 'next/router'

const signup = () => {

    const router = useRouter();

    let authenticated = false;
    let name = '';
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post('http://localhost:5000/api/auth/register/',
            {
                username: username,
                email: email,
                password: password,

            }).then((res) => {
                console.log(res);
                if (res.status === Number(200)) {
                    authenticated = true;
                    name = username;
                    console.log(authenticated)
                    console.log(name);
                    console.log('Login success');
                    router.push('/')
                }
            })
            .catch((error) => {
                if (error.response) {
                    console.log(error.response.data);
                    if (error.response.status === Number(400)) {
                        console.log("Username or password already exists");
                    } 
                }
            });


        setUsername('');
        setEmail('');
        setPassword('');
    }


    return (
        <div className="min-h-screen  mx-auto py-2 bg-midNight">
           
            <div className="w-1/3 mt-32 mx-auto border p-6 rounded-xl   ">
                <form onSubmit = {(e)=>handleSubmit(e)}>
                    <h1 className="text-green text-center text-4xl font-bold">Signup</h1>
                    <div className="flex flex-col p-3 mt-3">
                        <div className="mb-1">
                            <label for="uname" className="text-white text-2xl" >Name:</label>
                        </div>
                        <input type="text" value={username} onChange={(e)=>setUsername(e.target.value)} className=" w-full py-1 px-3 border focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent rounded" placeholder="Enter your name" id="uname" name="uname"></input>
                    </div>
                    <div className="p-3">
                        <div className="mb-1">
                            <label for="email" className="text-white text-2xl" >Email:</label>
                        </div>
                        <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} className="w-full py-1 px-3 border focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent rounded" id="email" placeholder="Enter you email" name="email"></input>
                    </div>

                    <div className="p-3">
                        <div className="mb-1">
                            <label for="pass1" className="text-white text-2xl" >Password:</label>
                        </div>
                        <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} className="w-full py-1 px-3 border focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent rounded" id="pass1" placeholder="Enter your password" name="pass1"></input>
                    </div>

                    <div className="text-center m-2">
                        <p className="text-white mb-4 m-3"><a className="text-blue" href="/login">Already a user? Login in through here</a></p>
                        <button type="submit" className="bg-green hover:bg-green-500 text-midNight font-bold py-2 px-4 rounded">Welcome!</button>
                    </div>

                </form>
            </div>
        </div>
    )
}

export default signup
