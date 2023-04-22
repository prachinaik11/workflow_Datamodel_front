import React, { useState,useEffect } from 'react'
import { Link, useNavigate,useParams } from 'react-router-dom';
import axios from 'axios';
import Table from 'react-bootstrap/Table';

export default function AdminMain() {
    let navigate = useNavigate()
    
    const [wf, setWf] = useState("")
    const [allwf,setAllwf] = useState([])

    const refreshPage = () => {
        navigate(0);
      }
    useEffect(()=>{
        
        loadUser();
    },[]);

    const loadUser=async()=>{
        const result=await axios.get(`http://localhost:9191/workflow/viewAllWorkflow`)
        setAllwf(result.data)
    }

    return (
        <div className='container'>
            <div className='row'>
                <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
                    <Link className='btn btn-primary my-2' to={"/admincr"}>Add New Worklfow</Link>
                    <form>
                    <div className='mb-3'>
                            <label htmlFor='Name' className='form-label'>
                               Enter WorkFlow ID for Updating
                            </label>
                            <input
                                type={"text"}
                                className="form-control"
                                placeholder='Enter Worklfow ID'
                                name="wf_name"
                                //value="wf_name"
                                onChange={(e) => setWf(e.target.value)}
                                required
                            />
                        </div>
                        <Link className='btn btn-primary my-2' to={`/viewtask/${wf}`}>Update</Link>
                        <Link className='btn btn-outline-danger mx-2' to="/">Cancel</Link>
                    <Table striped bordered hover >
                    <thead>
                        <tr>
                            <th scope="col">Id</th>
                            <th scope="col">Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            allwf.map((flows, index) => (
                                <tr>
                                    {/* <th scope="row" key={index}>{index + 1}</th> */}
                                    <td>{flows.workflowId}</td>
                                    <td>{flows.name}</td>
                                </tr>
                            )
                            )
                        }
                    </tbody>
                </Table>
                    </form>
                </div>
            </div>
            <div className="footer">
                <p>Made with ❤️ and 🧑‍💻 by <i>Harsh Tripathi</i></p>
            </div>
        </div>
    );
}
