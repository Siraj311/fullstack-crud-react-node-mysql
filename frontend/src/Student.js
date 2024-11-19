import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';

const Student = () => {
  const [student, setStudent] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:4000/')
    .then(res => setStudent(res.data))
    .catch(err => console.log(err))
  }, [])

  async function handleDelete(id) {
    try {
      await axios.delete('http://localhost:4000/student/' + id)
      setStudent(prevStudents => prevStudents.filter(student => student.id !== id));
    } catch(err) {
      console.log(err)
    }
  }

  return (
    <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
      <div className="w-50 bg-white rounded p-3">
        <Link to='/create' className='btn btn-success'>Add +</Link>
        <table className='table'>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {student.map((data, i) => (
              <tr key={i}>
                <td>{data.name}</td>
                <td>{data.email}</td>
                <td>
                  <Link to={`update/${data.id}`} className='btn btn-primary'>Update</Link>
                  <button onClick={() => handleDelete(data.id)} className='btn btn-danger ms-2'>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Student
