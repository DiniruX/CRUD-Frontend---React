import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useParams } from "react-router";
import Swal from 'sweetalert2';

export default function EditUser() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [fName, setFName] = useState("");
    const [lName, setLName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {

        function getUser() {
            axios
                .get(`http://localhost:8080/user/${id}`)
                .then((res) => {
                    setFName(res.data.fName);
                    setLName(res.data.lName);
                    setEmail(res.data.email);
                    setPassword(res.data.password);
                    console.log("User Details: ", res.data);
                })
        }
        getUser();
    }, []);

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

    const updateUser = async (e) => {
        e.preventDefault();

        const dataSet = {
            fName: fName,
            lName: lName,
            email: email,
            password: password
        }


        console.log("Sending Note Data...", dataSet);
        let data = await axios
            .put(`http://localhost:8080/user/${id}`, {
                fName: fName,
                lName: lName,
                email: email,
                password: password
            });

        console.log("Updated Data: ", data);
        if (data.status !== 200) {
            Swal.fire({
                icon: 'error',
                title: ' Update Failed!',
                text: 'Error While Updating...',
            })
        }
        else {
            Swal.fire({
                icon: 'success',
                title: 'User Update!',
                text: '',
            })
            navigate('/home');
        }
    }

        return (
            <div>
                <h1>Update User</h1>

                <div className='container' style={{ marginTop: '30px', padding: '10px 20% 10px 20%' }}>
                    <form onSubmit={(e) => updateUser(e)}>

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
                            <input type="password" value={password} className='form-control' style={{ marginBottom: '20px' }} onChange={(e) => handlePasswordChange(e)} required='true' />
                        </div>

                        <button type='submit' style={{ marginTop: '20px' }} className='btn btn-success'>Add User</button>
                    </form>
                </div>
            </div>
        )
    
}