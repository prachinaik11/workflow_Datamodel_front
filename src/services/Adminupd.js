import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './styles.css';
import Table from 'react-bootstrap/Table';
import { Link, useNavigate } from 'react-router-dom'

const Adminupd = () => {

    const [flows, setFlow] = useState([])

    useEffect(() => {
        loadUsers();

    }, []
    );

    const loadUsers = async () => {
        const result = await axios.get("");
        setFlow(result.data);
    }


    return (
        <div className='adminupd'>

            <div className='container'>
                {/* <h1><i>{gree}</i></h1> */}
                <br></br>

                {/* <Link className='btn btn-outline-light' to="/adduser">Add User</Link> */}
                {/* <Link className='btn btn-outline-primary ' to="/adduser">Add HR</Link>
                <Link className='btn btn-outline-primary ' to="/vieworg">View Organisations</Link> */}

                <div className='py-4'>
                    <Table striped bordered hover >
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Work Flow Name</th>
                                <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                flows.map((flow, index) => (
                                    <tr>
                                        <th scope="row" key={index}>{index + 1}</th>
                                        <td>{flow.name}</td>
                                        <td>
                                            <Link className="btn btn-primary mx-2" to={``}>
                                                Update
                                            </Link>
                                        </td>
                                    </tr>
                                )
                                )
                            }
                        </tbody>
                    </Table>

                </div>
                <div className="footer">
                    <p>Made with ❤️ and 🧑‍💻 by <i>Harsh Tripathi</i></p>
                </div>
            </div>


        </div>
    )
}

export default Adminupd