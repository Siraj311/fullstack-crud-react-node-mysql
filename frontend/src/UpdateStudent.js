import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateStudent = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:4000/' + id)
    .then(res => {
      setName(res.data[0].name)
      setEmail(res.data[0].email)
    })
    .catch(err => console.log(err));
  }, [])


  function handleSubmit(e) {
    e.preventDefault();
    axios.put('http://localhost:4000/update/' + id, {name, email})
    .then(res => {
      console.log(res);
      navigate('/');
    }).catch(err => console.log(err))
  }

  return (
    <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
      <div className='w-50 bg-white rounded p-3'> 
        <form onSubmit={handleSubmit}>
          <h2>Update Student</h2>
          <div className='mb-2'>
            <label htmlFor=''>Name</label>
            <input type="text" placeholder='Enter Name' className='form-control'
            value={name}
            onChange={(e) => setName(e.target.value)} />
          </div>
          <div className='mb-2'>
            <label htmlFor=''>Email</label>
            <input type="email" placeholder='Enter Email' className='form-control'
            value={email}
            onChange={(e) => setEmail(e.target.value)} />
          </div>
          <button className='btn btn-success'>Update</button>
        </form>
      </div>
    </div>
  )
}

export default UpdateStudent