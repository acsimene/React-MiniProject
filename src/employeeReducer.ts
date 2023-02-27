import {  createAsyncThunk, createSlice,  PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { Employee } from "./model/model";
import { RootState } from "./store";


export const fetchEmployeeList = createAsyncThunk(
    "employees/fetchEmployeeList",
    async () => {
      const response = await axios.get("http://localhost:5000/employees");
      const sortedEmployees = response.data.sort((employeeA: Employee , employeeB: Employee) =>
        employeeA.name.localeCompare(employeeB.name)
      );
      return sortedEmployees;
    }
  );

const initialState: {employees: Employee[]} ={
  employees:[]
}

const employeesSlice = createSlice({
    name: 'employees',
    initialState,
    reducers: {
      addEmployee: (state, action: PayloadAction<Employee>): any => {
        state.employees.push(action.payload);
        console.log(action.payload, " payload ")
       
      },
      editEmployee: (state, action) => {
        const index = state.employees.findIndex(
          (employee) => employee._id === action.payload.id
        );
        if (index !== -1) {
          state.employees[index] = action.payload;
        }
      },
      deleteEmployee: (state, action: PayloadAction<Employee>): any => {
        const { _id } = action.payload;
        const existingEmployee = state.employees.find((employee) => employee._id === _id);
        if (existingEmployee) {
          state.employees = state.employees.filter((employee) => employee._id !== _id);
        }
       
      },
  },
    extraReducers: (builder) => {
    builder.addCase(fetchEmployeeList.pending, () => {
      console.log("Fetching Data.....")
    });
    builder.addCase(fetchEmployeeList.fulfilled, (state, action) => {
      state.employees = action.payload;
      console.log("Fetching Data successfully")
    });
    builder.addCase(fetchEmployeeList.rejected, () => {
      console.log("Reject")
    });
  },

    },  
    );
  
  

export const  { addEmployee, editEmployee, deleteEmployee } = employeesSlice.actions
export default employeesSlice.reducer
export const getEmployeeSelector = (state: RootState) => state.employees.employees;