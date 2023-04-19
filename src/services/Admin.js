import React from 'react'
import { Link } from 'react-router-dom'

const Admin = () => {
  return (
    <div className='admin'>
        <div className='container'>
        <Link className='btn btn-primary my-2' to={"/adminupd"}>Update</Link>
        <Link className='btn btn-primary my-2' to={"/createwrkflw"}>Create</Link>
        </div>

        <div className="footer">
                <p>Made with ❤️ and 🧑‍💻 by <i>Harsh Tripathi</i></p>
        </div>
    </div>
  )
}

export default Admin