import React, { useEffect, useState, useMemo } from 'react';
import './App.css';
import {  useNavigate } from 'react-router-dom';
import { useDisclosure } from '@nextui-org/react';
import axios from 'axios';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, User, Chip, Tooltip } from "@nextui-org/react"; 
import { columns } from "./data";
import TopContent from './components/topContent';
import PaginationComponent from './components/pagination';
import { EyeIcon } from './components/Icons/eyeIcon';
import { EditIcon } from './components/Icons/pencil';
import { DeleteIcon } from './components/Icons/bin';
import {ToastContainer, toast} from 'react-toastify'
function App() {
  const navigate=useNavigate()
  const [backdrop, setBackdrop] = React.useState('blur')
  const {isOpen, onOpen, onClose} = useDisclosure();
  const [empRecords, setEmpRecords] = useState([]);
  const [filterValue, setFilterValue] = React.useState("");
  const [selectedKeys, setSelectedKeys] = React.useState(new Set([]));
  const [visibleColumns, setVisibleColumns] = React.useState(new Set(columns.map(column => column.uid)));
  const [statusFilter, setStatusFilter] = React.useState("all");
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [sortDescriptor, setSortDescriptor] = React.useState({
    column: "age",
    direction: "ascending",
  });
  const headers = {'Content-Type': 'application/json',"projectId": "66aa11c539e2fdc09bbba4cb", "environmentId": "66aa11c639e2fdc09bbba4cc"};
  const navigateToMemberDetails = (id) => {
    console.log("Navigating to member details with id:", id);
    navigate(`memberDetails/${id}`);
  };

  const [page, setPage] = React.useState(1);

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column) => Array.from(visibleColumns).includes(column.uid));
  }, [visibleColumns]);

  const filteredItems = useMemo(() => {
    let filteredUsers = [...empRecords];

    if (hasSearchFilter) {
      filteredUsers = filteredUsers.filter((user) =>
        user.name.toLowerCase().includes(filterValue.toLowerCase()),
      );
    }
    if (statusFilter !== "all") {
      filteredUsers = filteredUsers.filter((user) =>
        Array.from(statusFilter).includes(user.status),
      );
    }

    return filteredUsers;
  }, [empRecords, filterValue, statusFilter]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = useMemo(() => {
    return [...items].sort((a, b) => {
      const first = a[sortDescriptor.column];
      const second = b[sortDescriptor.column];
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);
  


  const fetchEmployees = () => {
    axios.get("https://free-ap-south-1.cosmocloud.io/development/api/employeedetail" + "?limit=10&offset=0", { headers: headers }).then((response) => {
      setEmpRecords(response.data.data);
    }).catch((error)=>{
      console.log(error.message)
    });
  }
  const onDeleteUser = (id) => {
    if (window.confirm("Are you sure you want to delete this user?"+id)) {
      deleteUser(id);
    }
  };
  const deleteUser = async (id) => {
    try {
      const response = await axios.delete(`https://free-ap-south-1.cosmocloud.io/development/api/employeedetail/${id}`, { data: {}, headers: headers });
  
      console.log("Delete response:", response);
  
      if (response.status === 200) {
        console.log("Delete response data:", response.data);
        setEmpRecords(empRecords.filter(user => user._id !== id));
        toast.success("User deleted successfully");
      } else {
        throw new Error(response.statusText);
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      if (error instanceof TypeError) {
        console.error("Network error:", error.message);
        toast.error(`Failed to delete user: Network error - ${error.message}`);
      } else if (error.response && error.response.status === 400) {
        console.error("Error details:", error.response.data);
        toast.error(`Failed to delete user: ${error.response.data.message}`);
      } else {
        console.error("Error details:", error);
        toast.error(`Failed to delete user: ${error.message}`);
      }
    }
  };
  
  useEffect(() => {
    fetchEmployees();
  }, []);
  console.log(empRecords)
  const renderCell = React.useCallback((user, columnKey) => {
    const cellValue = user[columnKey];

    switch (columnKey) {
      case "name":
        return (
          <User
            avatarProps={{radius: "xl", src: user.name.index}}
            description={user.email}
            name={cellValue}
            className='font-bold'
          >
            {user.email}
          </User>
        );
      case "address":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm">{cellValue.line1}</p>
            <p className="text-bold text-sm">{cellValue.city}, {cellValue.country} {cellValue.zip_code}</p>
          </div>
        );
      case "contact_methods":
        return (
          <div className="flex flex-col">
            {cellValue.map((method, index) => (
              <p key={index} className="text-bold text-sm">{method.contact_method}: {method.value}</p>
            ))}
          </div>
        );
      case "role":
        return (
          <div className="flex flex-col justify-center items-center ">
             <p className="  w-1/2 p-2">
              {user.role}
              </p>
          </div>
        );
          
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip content="Details">
              <button onClick={()=>navigateToMemberDetails(user?._id)} className='p-0 '>
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <EyeIcon />
              </span>
              </button>
            </Tooltip>
            {/* <Tooltip content="Edit user">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <EditIcon/>
              </span>
            </Tooltip> */}
            <Tooltip color="danger" content="Delete user" className='px-2'>
              <span className="text-lg text-danger cursor-pointer active:opacity-50" onClick={() => onDeleteUser(user?._id)}>
                <DeleteIcon/>
              </span>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);


  return (
    <div className="flex flex-col items-center justify-center py-4 relative">
      <TopContent 
        filterValue={filterValue}
        users={empRecords}
        setFilterValue={setFilterValue}
        setPage={setPage}
        setRowsPerPage={setRowsPerPage}
      />
      <ToastContainer/>
      {empRecords.length > 0 ? (
        <Table aria-label="Example table with custom cells" >
          <TableHeader columns={headerColumns}>
            {(column) => (
              <TableColumn key={column.uid} align={column.uid === "actions" ? "center" : "start"}>
                {column.name}
              </TableColumn>
            )}
          </TableHeader>
          <TableBody items={sortedItems}>
            {(item) => (
              <TableRow key={item._id}>
                {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
              </TableRow>
            )}
          </TableBody>
        </Table>
      ) : (
        <div>Loading...</div>
      )}
      <PaginationComponent selectedKeys={selectedKeys} items={filteredItems} page={page} pages={pages} hasSearchFilter={hasSearchFilter} setPage={setPage}  />
    </div>
  );
}

export default App;
