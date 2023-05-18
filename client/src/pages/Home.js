import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import { toast } from 'react-toastify';
import axios from 'axios';

const Home = () => {
  const [data, setData] = useState([]);

  const loadData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/get');
      console.log('Response received:', response);
      setData(response.data);
    } catch (error) {
      console.error('Error while fetching data:', error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const deleteContact = (id) =>{
    if(
    window.confirm("Are you sure you want to delete the contact?")
    ){
    axios.delete(`http://localhost:5000/api/remove/${id}`);
    toast.success("Contact Deleted Successfully");
    setTimeout(()=>loadData(),500);
    }
  };

  return (
    <div style={{ marginTop: '150px' }}>

    <Link to="/addContact">
        <button className = "btn btn-contact"> Add Contact </button>          
    </Link>

 
      <table className="styled-table">
        <thead>
          <tr>
            <th style={{ textAlign: 'center' }}>id</th>
            <th style={{ textAlign: 'center' }}>Name</th>
            <th style={{ textAlign: 'center' }}>Email</th>
            <th style={{ textAlign: 'center' }}>Registered At</th>
            <th style={{ textAlign: 'center' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((item, index) => {
              return (
                <tr key={item.id}>
                  <td scope="row">{index + 1}</td>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.created_at}</td>
                  <td>
                <Link to={`/update/${item.id}`}>
                <button className = "btn btn-edit"> Edit </button>          
                </Link>
                <button className = "btn btn-delete" onClick={()=>deleteContact(item.id)}> Delete </button>          
                <Link to={`/view/${item.id}`}>
                <button className = "btn btn-view"> View </button>          
                </Link>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="5">No data available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
