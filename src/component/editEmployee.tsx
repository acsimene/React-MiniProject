import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch } from "../store";
import { editEmployeeAction } from "../employeeAction";
 
const EditUser = () => {
  const dispatch = useAppDispatch();
  const [employee, setEmployee] = useState({
    name: '',
    job:'',
    email:'',
    gender: 'Male'
    }) 
  const navigate = useNavigate();
  const { id } = useParams();
 
  useEffect(() => {
    getEmployeeById();
  }, []);
 
  const getEmployeeById = async () => {
    const response = await axios.get(`http://localhost:5000/employees/${id}`);
    setEmployee(response.data)
    
  };
  
  const updateUser =  (e: any) => {
    e.preventDefault();
    dispatch(editEmployeeAction(employee))
    navigate("/");
  };

  const onChangehandler = (e: any) =>{
    const {name, value} = e.target
    setEmployee({...employee, [name]: value})
  }
  const {name, job, email, gender} = employee
  
  return (
    <div className="columns mt-5">
      <div className="column is-half">
        <form onSubmit={updateUser}>
          <div className="field">
            <label className="label">Name</label>
            <div className="control">
              <input
                type="text"
                className="input"
                name= "name"
                value={name}
                onChange={onChangehandler}
                placeholder="Name"
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Email</label>
            <div className="control">
              <input
                type="text"
                className="input"
                name= "email"
                value={email}
                onChange={onChangehandler}
                placeholder="Email"
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Job</label>
            <div className="control">
              <input
                type="text"
                className="input"
                name= "job"
                value={job}
                onChange={onChangehandler}
                placeholder="job"
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Gender</label>
            <div className="control">
              <div className="select is-fullwidth">
                <select
                name= "gender"
                  value={gender}
                  onChange={onChangehandler}
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
            </div>
          </div>
          <div className="field">
            <div className="control">
              <button type="submit" className="button is-success">
                Update
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
 
export default EditUser;