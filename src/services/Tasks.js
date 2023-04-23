import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Table from 'react-bootstrap/Table';

export default function Tasks() {
    const[tasks,setTask]=useState([])

    const{id}=useParams();
    useEffect(()=>{
        loadUser();
    },[]);

    const loadUser=async()=>{
        const result=await axios.get(`http://localhost:9191/task/fetchTaskList/${id}`)
        setTask(result.data)
    }


  return (
    <div className='container'>
    <div className='row'>
        <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
        <div className='py-4'>
        <Link className='btn btn-primary my-2' to={`/addtask/${id}`}>Add New Task to given Workflow</Link>
                <Table striped bordered hover >
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Description</th>
                            <th scope="col">UserByID</th>
                            <th scope="col">Role</th>
                            {/* <th scope="col">Name</th> */}
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            tasks.map((task, index) => (
                                
                                <tr>
                                    <th scope="row" key={index}>{index + 1}</th>
                                    <td>{task.description}</td>
                                    <></>
                                    <td>{task.userAuthorized && task.userAuthorized.userId}</td>
                                    <td>{task.role}</td>
                                    {/* <td>{task.workflow.name}</td> */}
                                    <td>
                                        <Link className="btn btn-primary mx-2" to={`/addaction/${id}/${task.taskId}`}>
                                            Action
                                        </Link>
                                    </td>
                                </tr>
                            )
                            )
                        }
                    </tbody>
                </Table>

            </div>

            <Link className='btn btn-primary my-2' to={"/adminmain"}>Back to Home</Link>
        </div>
        </div>
        <div className="footer">
                <p>Made with ❤️ and 🧑‍💻 by <i>Harsh Tripathi</i></p>
            </div>
        </div>
  )
}
