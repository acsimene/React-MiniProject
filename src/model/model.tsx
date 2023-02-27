// import { EditFilled, DeleteFilled } from "@ant-design/icons";
// import { Space } from "antd";
// import { ColumnsType } from "antd/es/table";
// import { Link } from "react-router-dom";

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
  
//   export const columns: ColumnsType<any> = [
//     {
//       title: 'Name',
//       dataIndex: 'name',
//       key: 'name',
//     },
//     {
//       title: 'Job',
//       dataIndex: 'job',
//       key: 'job',
//     },
//     {
//       title: 'Email',
//       dataIndex: 'email',
//       key: 'email',
//     },
//     {
//       title: 'Gender',
//       dataIndex: 'gender',
//       key: 'gender',
//     },
//     {
//       title: 'Action',
//       key: 'action',
//       render: () => (
//         <Space size="middle"> 
        
//           <EditFilled />              
            
//           <DeleteFilled />       
//         </Space>
//       ),
//     },
//   ];
  