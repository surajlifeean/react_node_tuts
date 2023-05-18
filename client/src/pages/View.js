import React, { useEffect, useState } from 'react';
import { useNavigate, Link,useParams } from "react-router-dom";
import axios from "axios";


const initialState = {
  name: "",
  email: "",
  contact: "",
};

const View = () => {

  const [state, setState] = useState(initialState);
  const { name, email, contact } = state;
  const navigate = useNavigate();
  const {id} = useParams();

  useEffect(()=>{
    axios.get(`http://localhost:5000/api/get/${id}`)
    .then((resp)=>setState({...resp.data[0]}));
  },[id]);


  return (
    <div style={{ marginTop: "150px" }}>
    <div className="card">
      <div className="card-header">
        <p>User Contact Detail</p>
      </div>
      <div className="container">
        <strong>ID: </strong>
        <span>{id}</span>
        <br />
        <br />
        <strong>Name: </strong>
        <span>{name}</span>
        <br />
        <br />
        <strong>Email: </strong>
        <span>{email}</span>
  
        <br />
        <Link to="/">
          <div className="btn btn-edit">Go Back</div>
        </Link>
      </div>
    </div>
  </div>
  );
}

export default View