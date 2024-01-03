import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Home() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:3000/users')
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, [])

  const handleDelete = (id) => {
    const confirmDelete = window.confirm("Would you like to Delete?");
    if (confirmDelete) {
      axios.delete(`http://localhost:3000/users/${id}`)
        .then(res => {
          // Update the local state to trigger a re-render
          setData(prevData => prevData.filter(user => user.id !== id));
        })
        .catch(err => console.log(err));
    }
  };
  
  

  return (
    <div className='d-flex flex-column justify-content-center align-items-center bg-light vh-100'>
      <h1>List of users</h1>
      <div className='w-75 rounded bg-white border shadow p-4'>
        <div className='d-flex justify-content-end'>
          <Link to="/create" className='btn btn-success'>Add +</Link>
        </div>
        <table className='table table-striped'>
          <thead>
            <tr>
              <th className='text-center'>ID</th>
              <th className='text-center'>Name</th>
              <th className='text-center'>Email</th>
              <th className='text-center'>Phone</th>
              <th className='text-center'>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((d, i) => (
              <tr key={i}>
                <td className='text-center'>{d.id}</td>
                <td className='text-center'>{d.name}</td> 
                <td className='text-center'>{d.email}</td> 
                <td className='text-center'>{d.phone}</td>
                  
                <td className='text-center'>
                  <Link to={`/read/${d.id}`} className='btn btn-sm btn-info me-2'>Read</Link>  
                  <Link to={`/update/${d.id}`} className='btn btn-sm btn-warning me-2'>Edit</Link> 
                  <button onClick={ e => handleDelete(d.id)} className='btn btn-sm btn-danger me-2'>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
          
 

}

export default Home;
