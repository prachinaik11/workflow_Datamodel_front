import axios from 'axios';
import './styles.css'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

const Home = () => {

    let navigate=useNavigate();

    const [id,setWf]=useState([]);

    const onSubmit=async(e)=>{
        var result=await axios.get(`http://localhost:9191/user/getUser/${id}`);
        alert(result.data.role)
        
        if(result.data.role==="Admin")
            navigate("/adminmain")
        else
            navigate(`/usermain/${id}`)
        // alert(result.data.role);

        // navigate("/adminmain");
        navigate(0);
    }


  return (
    <div className='admincreate'>
        <div className='container'>
        <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
        <form onSubmit={(e)=>onSubmit(e)}>
            <div className='mb-3'>
                <label htmlFor='Name' className='form-label'>
                   Enter your ID
                </label>
                <input
                    type={"text"}
                    className="form-control"
                    placeholder='Enter Id'
                    //value="wf_name"
                    onChange={(e)=>setWf(e.target.value)}
                    required
                />
            </div>
            <button type='submit'  className='btn btn-outline-primary'>Submit</button>
            <Link className='btn btn-outline-danger mx-2' to="/adminmain">Cancel</Link>
        </form>
        </div>
        </div>
    </div>
  )
}

export default Home