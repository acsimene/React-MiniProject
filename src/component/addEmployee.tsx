import { useState } from "react";
import { useAppDispatch } from "../store";
import { addEmployeeAction } from "../employeeAction";
import { Link, useNavigate } from "react-router-dom";
import { Employee, employeeSchema } from "../model/model";

import '../index.css';

const AddUser = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch()
  const [employee, setEmployee] = useState({
      name: '',
      email: '',
      job: '',
      gender: 'Male'
  })
  
  const [error, setError] = useState(false)

  const saveEmployee = async (e: any) => {
    e.preventDefault();
    if(error === true) return null
    const validate = await employeeSchema.validate(employee)
    .catch(errors => console.log(errors))
    if(!validate) {
      setError(true)
      return null
    }
    
    else{
        dispatch(addEmployeeAction(employee));
        navigate("/");
      }
    
  };
  const { name, email, job, gender } = employee
  const onChangehandler = (e: any) => {
    const {name, value } = e.target;
    if(name === "email") {
      validateEmailWithCom({...employee, [name]: value })
    }
    setEmployee({...employee, [name]: value })
  }
  
 
  function validateEmailWithCom(employee: any) {
    const regex = /^[^\s@]+@[^\s@]+\.com$/;
    const err = regex.test(employee.email);
    if(err === true ){return setError(false)}
    else return setError(true)
  }
 
  return (
    <div className="columns mt-5" style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      }}>
      <div className="column is-half">
        <form onSubmit={saveEmployee}>
          <div className="field">
            <label className="label">Name</label>
            <div className="control">
              <input
                type="text"
                className="input"
                name="name"
                value={name}
                onChange={onChangehandler}
                placeholder="Name"
                required
              />
              
            </div>
          </div>
          <div className="field">
            <label className="label">Email</label>
            <div className="control">
              <input
                type="text"
                className= {`input  ${error === true ? 'error' :  ''}`}
                name="email"
                value={email} 
                onChange={onChangehandler}
                placeholder="Email"
                
              />
              {error === true ? <div style={{color: "red", fontSize: "10px"}}>Invalid Email</div> : ""}
            </div>
          </div>
          <div className="field">
            <label className="label">Job</label>
            <div className="control">
              <input
                type="text"
                className="input"
                name="job"
                value={job}
                onChange={onChangehandler}
                placeholder="Job"
                required
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Gender</label>
            <div className="control">
              <div className="select is-fullwidth">
                <select
                    name="gender"
                  value={gender}
                  onChange={onChangehandler}
                  required
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
                Save
              </button>
              <Link to="/" className=" button is-danger" style={{marginLeft: '20px'}}>
                  Back
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
 
export default AddUser;