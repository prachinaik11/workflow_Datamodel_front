import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import xtype from 'xtypejs';


let length1 = 0;
let anyAll = false;
const AddAction = () => {
  
    let navigate = useNavigate();
    const[cat,setSelectedCategory]=useState([])
    const [tasks, setTask] = useState([])
    const [allact,setAllaction] = useState([])
    const [action, setAction] = useState("");
    const { wid, tid } = useParams();
    // console.log(action);
    // console.log(cat);

    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = async () => {
        const result = await axios.get(`http://localhost:9191/task/fetchTaskList/${wid}`);
        setTask(result.data);


        const resultaction = await axios.get(`http://localhost:9191/action/viewActions/${tid}`);
        setAllaction(resultaction.data);
        console.log("hello");
        // console.log(resultaction.data[0]["task"]["anyAll"]);
        anyAll = resultaction.data[0]["task"]["anyAll"];
        length1 = resultaction.data.length
        console.log(anyAll);
        console.log(length1);
        console.log(length1 === 1 && anyAll === true);
        console.log(`http://localhost:9191/task/fetchTaskList/${wid}`)
        console.log(`http://localhost:9191/action/viewActions/${tid}`);

        // console.log(resultaction.data.length);
        // console.log(result.data)
    }
    var bodyFormData = new FormData();
    bodyFormData.append('name', action);
    bodyFormData.append('nextTaskId', cat)


    const onSubmit = async (e) => {
        // alert("in functionnnn")
        // alert(length1 === 1)
        // alert(anyAll === true)
        if(length1 === 1 && anyAll === true){
            console.log("I am where I want to be ");
            alert("You can not add more than one actions for an 'ALL' task !");
            navigate(`/addaction/${wid}/${tid}`);
        }
        else {

            // alert("noooooo");

        axios({
            method: "post",
            url: `http://localhost:9191/action/addAction/${tid}?name=${action}&nextTaskId=${cat}`,
            //data: bodyFormData,
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
        navigate(`/addaction/${wid}/${tid}`);
        }
    }


    return (
        <div className='admincreate'>
            <div className='container'>
                <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
                <Table striped bordered hover >
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">nextTaskId</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            allact.map((allacts, index) => (
                                <tr>
                                    <th scope="row" key={index}>{index + 1}</th>
                                    <td>{allacts.name}</td>
                                    <td>{allacts.nextTask.taskId}</td>
                                </tr>
                            )
                            )
                        }
                    </tbody>
                </Table>

                    <form onSubmit={(e) => onSubmit(e)}>
                        <div className='mb-3'>
                            <label htmlFor='Name' className='form-label'>
                                Action Name
                            </label>
                            <input
                                type={"text"}
                                className="form-control"
                                placeholder='Enter Action'
                                name="wf_name"
                                //value="wf_name"
                                onChange={(e) => setAction(e.target.value)}
                                required
                            />
                        </div>
                        Select Next Actions
                        <div className='mb-3'>
                            
                            <select
                                //value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                className="product-dropdown"
                                name="product-dropdown"
                            >
                                {tasks.map((task) => (
                                    <option value={task.taskId}>{task.taskId}</option>
                                ))}
                            </select>
                        </div>

                        <button type='submit' className='btn btn-outline-primary'>Submit111</button>
                        <Link className='btn btn-outline-danger mx-2' to={`/viewtask/${wid}`}>Back12</Link>

                        
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddAction