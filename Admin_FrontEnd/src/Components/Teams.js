import React, { useState, useEffect } from 'react'
import { GetApiusers, PostApiusers  } from '../service';
import Button from '@mui/material/Button';
import { withRouter, useHistory } from 'react-router-dom';
function Teams() {
    const [getusers, setGetusers] = useState();
    const [superAdmin, setSuperAdmin] = useState(localStorage.getItem('superAdmin'))

    const history = useHistory();
    useEffect(() => {
        if (!getusers) {
            GetAdminuser()
        }
    }, [])

    function GetAdminuser() {
        GetApiusers('user/GetAdmin').then(res => {
            if (res && !res.error) {
                setGetusers(res.data.users)

            }
            else {
                alert('something wrong')
            }
        })
    }
    function handleAdminAccess(data,userid){
        console.log(data.target.checked);
        var request = {
            AdminAccess: data.target.checked,
            Adminid: userid
        }

            
            PostApiusers(`user/AdminAccess`,request).then((res) => {
                if(res && !res.error){
                    alert(res.message);
                  GetAdminuser()
                }else{
                    alert(res ? res.message : 'someting went wrong in backend')
                }
            })
        console.log(request);
    }

    
    function superAdminLogout(){
        localStorage.clear();
        history.push({
            pathname: (`/AdminRegister`)
        })
    }
    return (
        <div>
              <nav class="navbar navbar-light bg-info">
                <a class="navbar-brand" href="#">
                    <img src="https://w7.pngwing.com/pngs/419/473/png-transparent-computer-icons-user-profile-login-user-heroes-sphere-black-thumbnail.png" width="30" height="30" class="d-inline-block align-top" alt="" />
                    Teams
                </a>
                {(superAdmin == 'true') ? <Button variant="contained" color="error" style={{marginLeft:'1000px'}} onClick={() => superAdminLogout()}>
                Logout
            </Button> : ""}
            </nav>
            {
                (superAdmin == 'true') ?
                    <table class="table table-dark">
                        <thead>
                            <tr>
                                <th>s.no</th>
                                <th>Admin name</th>
                                <th>Admin mail</th>
                                <th>Admin Access</th>
                            </tr>
                        </thead>
                        <tbody>
                            {getusers?.map((users, index) => {


                                return (
                                    <tr class="table-active">
                                        <th scope="row">{index + 1}</th>
                                        <td class="table-active">{users.Firstname}</td>
                                        <td>{users.Email}</td>
                                        <td><div class="form-check">
                                            <input class="form-check-input" type="checkbox" checked={users.AdminAccess} id="flexCheckIndeterminate"  onClick={(event) =>handleAdminAccess(event,users.id)} />
                                            <label class="form-check-label" for="flexCheckIndeterminate">
                                                Admin Access
                                            </label>
                                        </div></td>
                                    </tr>
                                )
                            })

                            }
                        </tbody>
                    </table>

                    : <h2>You are not a superAdmin</h2>
            }
        </div>
    )
}
export default withRouter(Teams)