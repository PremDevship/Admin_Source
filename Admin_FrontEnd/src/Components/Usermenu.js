import React, { useState, useEffect } from 'react'
import { GetApiusers, putAPI, deleteAPI,PostApiusers } from '../service';
import Modal from 'react-modal';
import Button from '@mui/material/Button';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        width: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'antiquewhite',
        border: 'solid 2px brown'
    },
};

export default function Usermenu() {
    const [getusers, setGetusers] = useState();
    const [Populateusers, setPopulateusers] = useState('');
    const [userCount, setUsercount] = useState();
    const [AdminEdit, setAdminEdit] = useState(localStorage.getItem('AdminAccess'))
    const [AdminEditModelIsopen, setAdminEditModelIsopen] = useState(false);
    const[Adminupdateuser, setAdminupdateuser] = useState({
       Firstname: '',
       Lastname : '',
       Email: '',
    })
    const[AdminEditid, setAdminEditid] = useState();
    

    useEffect(() => {
        if (!getusers) {
            Getuser()
            
        }
    }, [])

    function Getuser() {
        GetApiusers('user/Getuser').then(res => {
            if (res && !res.error) {
                setGetusers(res.data.users)
                setUsercount(res.data.userlength)
            }
            else {
                alert('something wrong')
            }
        })
    }


    function AdminUpdate(data) {
        switch (data.target.id) {
            case 'Firstname':
                setAdminupdateuser(previous => ({
                    ...previous,
                    Firstname: data.target.value
                }))
                break;

                case 'Lastname':
                setAdminupdateuser(previous => ({
                    ...previous,
                    Lastname: data.target.value
                }))
                break;

                case 'Email':
                setAdminupdateuser(previous => ({
                    ...previous,
                    Email: data.target.value
                }))
                break;
    }
    }
    function AdminUpdateusers(id) {
       let adminTouser = {Adminupdateuser}
       console.log(id);
       putAPI(`user/AdminEdit/${id}`, adminTouser.Adminupdateuser).then((res) => {
        console.log(res);
        if(res && !res.error){
            alert(res.message)
            setAdminEditModelIsopen(false)
           
           Getuser()
        }
        else{
            alert(res ? res.message : 'Something went wrong')
        }
       })
    }
    
    
    function HandleAdminEdit(Adminid) {
        setAdminEditModelIsopen(true)
        setAdminEditid(Adminid)
        setPopulateusers(getusers)
        console.log(Populateusers);
    }

    function AdminuserDelete(user){
         let check = window.confirm('Are you sure you want to delete this user data')
         if(check){
            var request = user
            request.Status = 1
            PostApiusers(`user/AdminDeleteuser/${user.id}`,request).then((res) => {

                if(res && !res.error){
                    alert(res.message)
                   Getuser() 
                }
                else{
                    alert(res ? res.message : 'Something went wrong')
                }
            })
         }
    }
    return (
        <div>
              <nav class="navbar navbar-light bg-info">
                <a class="navbar-brand" href="#">
                    <img src="https://w7.pngwing.com/pngs/419/473/png-transparent-computer-icons-user-profile-login-user-heroes-sphere-black-thumbnail.png" width="30" height="30" class="d-inline-block align-top" alt="" />
                    User Menu
                </a>
            </nav>
            <table class="table table-dark">
                <thead>
                    <tr>
                        <th>s.no</th>
                        <th>user name</th>
                        <th>User mail</th>
                        {
                            (AdminEdit == 'true') ? (<th colSpan="2">Action</th>) : ("")
                        }
                    </tr>
                </thead>
                <tbody>
                    {getusers?.map((users, index) => {


                        return (
                            <tr class="table-active">
                                <th scope="row">{index + 1}</th>
                                <td class="table-active">{users.Firstname +' '+ users.Lastname}</td>
                                <td>{users.Email}</td>
                                {
                                    (AdminEdit == 'true') ? (
                                        <td> <Button variant="contained" color="success" onClick={() => HandleAdminEdit(users.id)}>
                                            Edit
                                        </Button></td>

                                    ) : ("")
                                }
                                {
                                    (AdminEdit == 'true') ? (
                                        <td> <Button variant="contained" color="error" onClick={() => { AdminuserDelete(users) }}>
                                            Delete
                                        </Button></td>

                                    ) : ("")
                                }

                            </tr>
                        )
                    })

                    }
                </tbody>
            </table>

            <Modal
                isOpen={AdminEditModelIsopen}
                style={customStyles}
                ariaHideApp={false}
            >
                
                    <form>
                    <h1>Update user data</h1>
                    <div class="form-group">
                        <label for="exampleInputEmail1">Firstname</label>
                        <input type="text" class="form-control" value={Adminupdateuser?.Firstname} onChange={(e) => AdminUpdate(e)} id="Firstname" aria-describedby="emailHelp" placeholder="Firstname" />
                    </div>

                    <div class="form-group">
                        <label for="exampleInputPassword1">Lastname</label>
                        <input type="text" class="form-control" value={Adminupdateuser?.Lastname} onChange={(e) => AdminUpdate(e)} id="Lastname" placeholder="Lastname" />
                    </div>


                    <div class="form-group">
                        <label for="exampleInputPassword1">gmail</label>
                        <input type="email" class="form-control" value={Adminupdateuser?.Email} onChange={(e) => AdminUpdate(e)} id="Email" placeholder="gmail" />
                    </div>

                   

                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>

                        <Button variant="outlined" style={{ margin: '10px' }} onClick={() => AdminUpdateusers(AdminEditid)}>
                            Submit
                        </Button>
                        <Button variant="outlined" onClick={() => { setAdminEditModelIsopen(false) }}>
                            Cancel
                        </Button>
                    </div>

                </form>
                
               
            </Modal>
        </div>
    )
}
