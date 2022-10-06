import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';

function NewUser() {

    const navigate = useNavigate();

    const [fName, setFName] = useState("");
    const [lName, setLName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleFnameChange = (e) => {

        e.preventDefault();
        setFName(e.target.value);
    }

    const handleLnameChange = (e) => {

        e.preventDefault();
        setLName(e.target.value);
    }

    const handleEmailChange = (e) => {

        e.preventDefault();
        setEmail(e.target.value);
    }

    const handlePasswordChange = (e) => {

        e.preventDefault();
        setPassword(e.target.value);
    }

    const addUser = async (e) => {
        e.preventDefault();


        let data = await axios.post('http://localhost:8080/saveuser', {
            fName: fName,
            lName: lName,
            email: email,
            password: password
        });

        console.log("Saved Data: ", data);

        if (data.status !== 200) {
            Swal.fire({
                icon: 'error',
                title: ' Insert Failed!',
                text: 'Error While Inserting...',
            })
        }
        else {
            Swal.fire({
                icon: 'success',
                title: 'User Inserted!',
                text: '',
            })
            navigate('/home');

        }
    }

    return (
        <div>
            <h1>Insert User</h1>

            <div className='container' style={{ marginTop: '30px', padding: '10px 20% 10px 20%' }}>
                <form onSubmit={(e) => addUser(e)}>

                    <div className='form-group'>
                        <label>First Name</label><br />
                        <input type='text' value={fName} className='form-control' style={{ marginBottom: '20px' }} onChange={(e) => handleFnameChange(e)} required='true' />
                    </div>

                    <div className='form-group'>
                        <label>Last Name</label><br />
                        <input type='text' value={lName} className='form-control' style={{ marginBottom: '20px' }} onChange={(e) => handleLnameChange(e)} required='true' />
                    </div>

                    <div className='form-group'>
                        <label>Email</label><br />
                        <input type='text' value={email} className='form-control' style={{ marginBottom: '20px' }} onChange={(e) => handleEmailChange(e)} required='true' />
                    </div>

                    <div className='form-group'>
                        <label>Password</label><br />
                        <input type="password" name={password} className='form-control' style={{ marginBottom: '20px' }} onChange={(e) => handlePasswordChange(e)} required='true' />
                    </div>

                    <button type='submit' style={{ marginTop: '20px' }} className='btn btn-success'>Add User</button>
                </form>
            </div>
        </div>
    )
}

export default NewUser