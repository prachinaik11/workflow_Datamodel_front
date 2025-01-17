import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams,useNavigate } from 'react-router-dom'
import Table from 'react-bootstrap/Table';

export default function Tasks() {
    let navigate = useNavigate()
    const [tasks,setTask]=useState([])
    const [taskins,setTaskIns]=useState([])
    const [actions,setAction]=useState([])
    const [act,setSelectedCategory]=useState("")
    const [comment,setComment]=useState([])

    var bodyFormData = new FormData();
    const{id}=useParams();
    useEffect(()=>{
        loadUser();
    },[]);

    bodyFormData.append('taskInstanceId', taskins);
    bodyFormData.append('actionId', act);
    bodyFormData.append('comments', comment);
    console.log(act)
    console.log("comment")

    const onSubmit=async(e)=>{
        axios({
            method: "post",
            url: `http://localhost:9191/action/performAction/${id}`,
            data: bodyFormData,
            headers: { "Content-Type": "multipart/form-data" },
          })
          .catch(error => {
            alert(error);
            console.log(error)
            //navigate(`/`);
            
        });
        // navigate(`/usermain`);
        // navigate(0);
    };



    const loadUser=async()=>{
        const result=await axios.get(`http://localhost:9191/taskInstance/fetchTaskInstances/${id}`)
        setTask(result.data);

        const resultact =await axios.get(`http://localhost:9191/action/viewActions/${id}`)
        setAction(resultact.data);
        console.log(resultact.data)

    }


  return (
    <div className='container'>
    <div className='row'>
        <div className='col-md-6 offset-md-3'>
        <div className='py-4'>
                <Table striped bordered hover >
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Comment</th>
                            <th scope="col">Attchments</th>
                            <th scope="col">Status</th>
                            <th scope="col">Desc</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            tasks.map((task, index) => (
                                
                                <tr>
                                    <th scope="row" key={index}>{index + 1}</th>
                                    <td>{task.comments}</td>
                                    <td>{task.attachments}</td>
                                    <td>{task.status}</td>
                                    <td>{task.workflowInstance.description}</td>
                                    {/* {setTaskIns(task.taskInstanceId)} */}
                                    {/* <td>{task.workflowInstance.workflow.name}</td> */}
                                    <td>

                                    <form onSubmit={(e)=>onSubmit(e)}>
                                        <div className='mb-3'>
                                            <label htmlFor='Name' className='form-label'>
                                                Comments
                                            </label>
                                            <input
                                                type={"text"}
                                                className="form-control"
                                                placeholder='comments'
                                                //value="wf_name"
                                                onChange={(e)=>{setComment(e.target.value);setTaskIns(task.taskInstanceId)}}
                                                required
                                            />
                                        </div>

                                        Actions
                                            <div className='mb-3'>
                                                
                                                <select
                                                    //value={selectedCategory}
                                                    onClick={(e) => setSelectedCategory(e.target.value)}
                                                    className="product-dropdown"
                                                    >
                                                    {actions.map((action) => (
                                                        <option value={action.actionId}>{action.actionId}</option>
                                                    ))}
                                                </select>
                                            </div>
                                        
                                        <button type='submit'  className='btn btn-outline-primary'>Submit</button>
                                        </form>

                                        {/* <Link className="btn btn-primary mx-2" to={`/usermain`}>
                                            Action
                                        </Link> */}
                                        
                                    </td>
                                </tr>
                            )
                            )
                        }
                    </tbody>
                </Table>

            </div>

            <Link className='btn btn-primary my-2' to={`/usermain/${id}`}>Back to Home</Link>
        </div>
        </div>
        <div className="footer">
                <p>Made with ❤️ and 🧑‍💻 by <i>Harsh Tripathi</i></p>
            </div>
        </div>
  )
}
