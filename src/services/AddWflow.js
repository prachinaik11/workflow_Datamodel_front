import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';



export default function AddWflow() {
    let navigate=useNavigate()
    const [wf,setWf]=useState("")

    const [useRole, setRole] = useState("");
    ;
    var bodyFormData = new FormData();
    bodyFormData.append('name', wf);
    const onSubmit=async(e)=>{
        axios({
            method: "post",
            url: `http://localhost:9191/workflow/addWorkflow`,
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
        navigate("/");
    };

    return (
        <div className='container'>
            <div className='row'>
                <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
                    <h2 className='text-center m-4'>Register Organisation</h2>
                    <form onSubmit={(e)=>onSubmit(e)}>
                    <div className='mb-3'>
                        <label htmlFor='Name' className='form-label'>
                            Worklfow Name
                        </label>
                        <input
                            type={"text"}
                            className="form-control"
                            placeholder='Enter Worklfow Name'
                            name="wf_name"
                            //value="wf_name"
                            onChange={(e)=>setWf(e.target.value)}
                            required
                        />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='Name' className='form-label'>
                        Select Appropriate Choice
                        </label>
                        <div><input type='radio' name="role" value="ID" on onChange={e=>setRole(e.target.value)}/> UseByID  </div>
                        <div><input type='radio' name="role" value="Role" on onChange={e=>setRole(e.target.value)}/> UseByRole</div>
                    </div>
                    Enter {useRole}
                    <div className='mb-3'>
                        <label htmlFor='Name' className='form-label'>
                        </label>
                        <input
                            type={"text"}
                            className="form-control"
                            placeholder='Enter Org Name'
                            name="comp_name"
                            value="comp_name"
                            //onChange={(e)=>onInputChange(e)}
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
