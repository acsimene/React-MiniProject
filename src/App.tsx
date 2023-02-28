import React, { useEffect, useRef, useState } from 'react';
import Icon, { DeleteTwoTone, EditFilled, PlusSquareFilled, SearchOutlined, WarningTwoTone } from '@ant-design/icons';
import { InputRef, Modal } from 'antd';
import { Button, Input, Space, Table } from 'antd';
import type { ColumnsType, ColumnType } from 'antd/es/table';
import type { FilterConfirmProps } from 'antd/es/table/interface';
import { getEmployeeSelector, fetchEmployeeList } from './employeeReducer';
import { useAppSelector, useAppDispatch } from './store';
import { DataType, Employee } from './model/model';
import { Link } from 'react-router-dom';
import { deleteEmployeeAction } from './employeeAction';





type DataIndex = keyof DataType;



const App: React.FC = () => {
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const [visibility, setVisibility] = useState(false);
  const searchInput = useRef<InputRef>(null);

  const data =  useAppSelector(getEmployeeSelector)
  const dispatch = useAppDispatch();
  
  useEffect(() => {
      dispatch(fetchEmployeeList())
  },[])

  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: DataIndex,
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText('');
  };

  const getColumnSearchProps = (dataIndex: any): ColumnType<any> => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
        text
  });

  const [employeeRemove, setEmployeeRemove] = useState<Employee>(
    { name: '',
      email: '',
      job: '',
      gender: 'Male'
  })

  const removeEmployee = (employeetoRemove: any) => {
      setVisibility(true)
      setEmployeeRemove(employeetoRemove)
  }

 
  const columns: any = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: '30%',
      ...getColumnSearchProps('name'),
    },
    {
      title: 'Job',
      dataIndex: 'job',
      key: 'job',
      width: '20%',
    
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
     
    },
    ,
    {
      title: 'Gender',
      dataIndex: 'gender',
      key: 'gender',
     
    },
    {
    title: 'Action',
    key: 'action',
    render: (data: any) => (
    <Space size="middle"> 

        <Link to={`edit/${data._id}`}>
          <EditFilled />              
        </Link>
        <a style={{ cursor: "pointer"}}
          onClick={ () => removeEmployee(data)}>
        <DeleteTwoTone twoToneColor="#eb2f96"/>   
        </a>  
            
    </Space>
    ),
    },

  ];
  const closeModal = (): void => {
    setVisibility(false);
  } 
  const handleOk = () => {
    dispatch(deleteEmployeeAction(employeeRemove))
        closeModal();
  };
  return (
    <>
    <Modal
        title={
          <span>
            <WarningTwoTone twoToneColor="#fadb14"  style={{fontSize: "24px"}}/> Delete Confirmation
          </span>
        }
        open={visibility}
        onOk={handleOk}
        onCancel={closeModal}
        okText="Confirm"
        cancelText="Cancel"
        
        > 
        <p>Are you sure you want to delete {employeeRemove.name}'s data? </p>
        
      </Modal>
  <Link to="add" style={{marginLeft: "85%" }}>   Add Employee <PlusSquareFilled /> </Link>
  <Table columns={columns} dataSource={data} />
   </>
  )
};

export default App;



