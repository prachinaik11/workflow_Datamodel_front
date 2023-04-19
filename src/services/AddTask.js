import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';

export default function AddUser() {
    let navigate=useNavigate()
    const [task,setTask]=useState("")
    const {id}=useParams();
    //console.log(id);
    const [role, setRole] = useState("");
    const [val, setVal]=useState("");
    var bodyFormData = new FormData();

    if(role==='Role'){
        bodyFormData.append('description', task);
        bodyFormData.append('role',val);
        var url = (`http://localhost:9191/task/addTaskUsingRole/${id}`)
    }
    else{
        bodyFormData.append('description', task);
        bodyFormData.append('workflowId',id);
        bodyFormData.append('userId',val);
        var url = (`http://localhost:9191/task/addTaskUsingUser/${id}`)
    }

    
    const onSubmit=async(e)=>{
        axios({
            method: "post",
            url: url,
            data: bodyFormData,
            headers: { "Content-Type": "multipart/form-data" },
          })
            .then(function (response) {
              //handle success
              console.log(response);
            })
            .catch(function (response) {
              //handle error
              console.log(response);
            });
        navigate(`/viewtask/${id}`);
    };

    return (
        <div className='container'>
            <div className='row'>
                <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
                    <h2 className='text-center m-4'>Add Task</h2>
                    <form onSubmit={(e)=>onSubmit(e)}>
                    <div className='mb-3'>
                        <label htmlFor='Name' className='form-label'>
                            Description
                        </label>
                        <input
                            type={"text"}
                            className="form-control"
                            placeholder='Enter Task Name'
                            name="wf_name"
                            //value="wf_name"
                            onChange={(e)=>setTask(e.target.value)}
                            required
                        />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='Name' className='form-label'>
                        Select 
                        </label>
                        <div><input type='radio' name="role" value="ID" on onChange={e=>setRole(e.target.value)}/> UseByID  </div>
                        <div><input type='radio' name="role" value="Role" on onChange={e=>setRole(e.target.value)}/> UseByRole</div>
                    </div>
                    Enter {role}
                    <div className='mb-3'>
                        <label htmlFor='Name' className='form-label'> 
                        </label>
                        <input
                            type={"text"}
                            className="form-control"
                            placeholder=''
                            name="comp_name"
                            //value="comp_name"
                            onChange={(e)=>setVal(e.target.value)}
                            required
                        />
                    </div>

                    <button type='submit'  className='btn btn-outline-primary'>Submit</button>
                    <Link className='btn btn-outline-danger mx-2' to="/">Cancel</Link>
                    </form>
                </div>

            </div>
            <div className="footer">
                <p>Made with ❤️ and 🧑‍💻 by <i>Harsh Tripathi</i></p>
            </div>
        </div>
    );
}
