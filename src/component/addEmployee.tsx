import { useState } from "react";
import { useAppDispatch } from "../store";
import { addEmployeeAction } from "../employeeAction";
import { useNavigate } from "react-router-dom";
 
const AddUser = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch()
  const [employee, setEmployee] = useState({
      name: '',
      email: '',
      job: '',
      gender: 'Male'
  })
  
  const saveEmployee = (e: any) => {
    e.preventDefault();
    dispatch(addEmployeeAction(employee));

    navigate("/");
    
  };
  
  const onChangehandler = (e: any) => {
    const {name, value } = e.target;
    setEmployee({...employee, [name]: value })
  }
  const { name, email, job, gender } = employee
  return (
    <div className="columns mt-5">
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
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Email</label>
            <div className="control">
              <input
                type="text"
                className="input"
                name="email"
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
                name="job"
                value={job}
                onChange={onChangehandler}
                placeholder="Job"
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
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
 
export default AddUser;