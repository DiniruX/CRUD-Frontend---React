import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import Swal from 'sweetalert2';

function Home() {

    const [userList, setUserList] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8080/allusers")

            .then((res) => {
                console.log(res.data);
                setUserList(res.data);
            });

    }, []);

    const deleteUser = async (id) => {

        let data = await axios
            .delete(`http://localhost:8080/user/${id}`)
            .then(() => {
                
                Swal.fire({
                    icon: 'success',
                    title: 'User Deleted!',
                    text: 'Your note has been successfully deleted from the system...',
                })
                //navigate('/home');
            })
    }

    return (
        <div>
            <table class="table shadow">
                <thead class="thead-dark">
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">First Name</th>
                        <th scope="col">Last Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Password</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {userList.map((val, index) => (
                        <tr key={index}>
                            <th>{index + 1}</th>
                            <td>{val.fName}</td>
                            <td>{val.lName}</td>
                            <td>{val.email}</td>
                            <td>{val.password}</td>
                            <td>
                                <Popup
                                    trigger={<button className="btn btn-warning btn-sm"> View Details </button>}
                                    modal
                                    nested>
                                    <div className="model" style={{ padding: '0 10% 0 10%' }}>
                                        <div className="header" style={{ marginBottom: '10px', paddingTop: '10px' }}> <h3>User Details</h3> </div>
                                        <div className="content" style={{}}>
                                            <label>ID:</label><br />
                                             <h4>{val.id}</h4>
                                            <label>First Name:</label><br />
                                             <h4>{val.fName}</h4>
                                            <label>Last Name:</label><br />
                                             <h4>{val.lName}</h4>
                                            <label>Email:</label><br />
                                             <h4>{val.email}</h4>
                                            <label>Password:</label><br />
                                             <h4>{val.password}</h4>
                                        </div>
                                    </div>
                                </Popup>
                                &nbsp;
                                <a className='btn btn-outline-warning btn-sm' href={`/edit/${val?.id}`}>Update</a>
                                &nbsp;
                                <a className='btn btn-danger btn-sm' onClick={(e) => deleteUser(val?.id)}>Delete</a>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Home