import * as Yup from 'yup'

 export interface Employee{
  name: string,
  job: string,
  email: string,
  gender: string,
  _id?: string
 }
 
 export interface DataType {
    key: string;
    job: string;
    email: string;
    gender: string;
  }
  

 export const employeeSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    job: Yup.string().required('Job is required'),
    email: Yup.string().email('Invalid Email')
    .test('no-spaces', 'Email must not contain spaces', (value) =>{
      if(value){
        return !/\s/.test(value)
      }
    })
    .required('Email is required'),
    gender: Yup.string().required('Gender is required'),
  })
