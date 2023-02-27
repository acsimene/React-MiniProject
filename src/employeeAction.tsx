import axios from "axios";


import { addEmployee, deleteEmployee, editEmployee, fetchEmployeeList } from "./employeeReducer";
import { Employee } from "./model/model";
import { AppThunk } from "./store";



export const editEmployeeAction =
  (employee: Employee): AppThunk => async (dispatch) => {
    
    try {
      await axios.patch(`http://localhost:5000/employees/${employee._id}`, employee);
      dispatch(editEmployee(employee))
    } catch (error) {
      console.log(error);
    }
  };

  
export const addEmployeeAction =
(employee: Employee): AppThunk => async (dispatch) => {
  
  try {
  await axios.post("http://localhost:5000/employees", employee);
  dispatch(addEmployee(employee))
} catch (error) {
  console.log(error);
}
};
export const deleteEmployeeAction =
(employee: Employee): AppThunk => async (dispatch) => {
  
  try {
    await axios.delete(`http://localhost:5000/employees/${employee._id}`)
  dispatch(deleteEmployee(employee))
  dispatch(fetchEmployeeList())
} catch (error) {
  console.log(error);
}
};
