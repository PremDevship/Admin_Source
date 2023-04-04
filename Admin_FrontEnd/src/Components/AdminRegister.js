import React, { useState, useEffect } from 'react'
import { PostApiusers } from '../service.js';
import { withRouter, useHistory, Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AdminRegister() {
    const history = useHistory();
    const [Registeruser, setRegisteruser] = useState({
        firstname: '',
        lastname: '',
        email: '',
        Password: '',
        role: 1,
    })



    useEffect(() => {
        var role = localStorage.getItem('role')

        if (!role) {
            history.push({
                pathname: (`/`)
            })
        }
    }, [])

    function RegisterUser(data) {
        console.log(data)
        switch (data.target.id) {
            case 'firstname':
                setRegisteruser(prev => ({
                    ...prev,
                    firstname: data.target.value
                }))
                break;
            case 'lastname':

                setRegisteruser(prev => ({
                    ...prev,
                    lastname: data.target.value
                }))


                break;
            case 'email':
                setRegisteruser(prev => ({
                    ...prev,
                    email: data.target.value
                }))

                break;
            case 'Password':
                setRegisteruser(prev => ({
                    ...prev,
                    Password: data.target.value
                }))

                break;
        }
    }
    function handleRegisteruser() {


        let item = { Registeruser }
        console.log(item);
        PostApiusers(`user/Adduser`, item.Registeruser).then((res) => {
            if (res && !res.error) {
                alert(res.message);
                history.push({
                    pathname: (`/`)
                })
            } else {
                alert(res ? res.message : 'someting went wrong in backend')
            }
        })
    }

    return (
        <div>
            <nav class="navbar navbar-light bg-info">
                <a class="navbar-brand" href="#">
                    <img src="https://w7.pngwing.com/pngs/419/473/png-transparent-computer-icons-user-profile-login-user-heroes-sphere-black-thumbnail.png" width="30" height="30" class="d-inline-block align-top" alt="" />
                    Admin Register!
                </a>
            </nav>
            <h1>Admin Register</h1>
            <div className='container'>
                <div className='row'>
                    <div class="card text-center col-md-12 col-md-offset-6">
                        <div class="card-body ">

                            <form className='form-control form1'>
                                <div class="form-group">
                                    <label for="exampleInputEmail1">First name</label>
                                    <input type="email" class="form-control" id="firstname" name='firstname' onChange={(e) => RegisterUser(e)} aria-describedby="emailHelp" placeholder="First name" />

                                </div>
                                <div class="form-group">
                                    <label for="exampleInputEmail1">Last name</label>
                                    <input type="email" class="form-control" id="lastname" name='lastname' onChange={(e) => RegisterUser(e)} aria-describedby="emailHelp" placeholder="Last name" />

                                </div>
                                <div class="form-group">
                                    <label for="exampleInputEmail1">Email address</label>
                                    <input type="email" class="form-control" id="email" name='email' onChange={(e) => RegisterUser(e)} aria-describedby="emailHelp" placeholder="Enter email" />

                                </div>
                                <div class="form-group">
                                    <label for="exampleInputPassword1">Password</label>
                                    <input type="password" class="form-control" id="Password" name='password' onChange={(e) => RegisterUser(e)} placeholder="Password" />
                                </div>
                                <br />
                                <button type="button" class="btn btn-success" onClick={handleRegisteruser}>Register</button>
                                <p class="text-center text-muted mt-5 mb-0">if you are superAdmin <Link class="fw-bold text-body" to="/login"><u>Login here</u></Link></p>
                            </form>


                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}
