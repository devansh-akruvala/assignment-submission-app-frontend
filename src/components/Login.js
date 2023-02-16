import React, { useState } from 'react'

import { useLocalState } from '../util/useLocalStorage';

const Login = () => {
    const [jwt, setJwt] = useLocalState("", "jwt")
    const [username, setusername] = useState("")
    const [password, setpasword] = useState("")

    const sendLoginRequest = (e) => {
        console.log(username, password)
        e.preventDefault();
        
        fetch('api/auth/login', {
            "headers": {
                "content-type": "application/json"
            },
            "method": "post",
            "body": JSON.stringify({
                username, password
            })
        }).then((response) => {
            if (response.status === 200) {
                return Promise.all([response.json(), response.headers])
            }
            else {
                return Promise.reject("Invalid")
            }

        })
            .then(([body, headers]) => {
                setJwt(headers.get("authorization"))
            }).catch((message) => {
                alert(message)
            })
    }

    const changeUsername = (e) => {
        setusername(e.target.value)
    }
    const changePassword = (e) => {
        setpasword(e.target.value)
    }

    return (
        <>    <div>
            <label htmlFor="username">Username</label>
            <input type="email" id="username" value={username} onChange={changeUsername} />
        </div>
            <div>
                <label htmlFor="passsword">Password</label>
                <input type="passsword" id="passsword" value={password} onChange={changePassword} />
            </div>
            <div>
                <button id="submit" type="button" onClick={sendLoginRequest}>Login</button>
            </div>
        </>
    )
}

export default Login