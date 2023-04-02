import { Button } from '@mui/material';
import axios from 'axios';
import React,{useEffect,useState} from 'react'
import DataTable from 'react-data-table-component';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
    const Navigate = useNavigate()
const [respData , setRespData] = useState();

const fetchData=async()=>{
    let res = await axios.get('http://localhost:8080/user/loginhistory')
    console.log(res.data.resp,"axios data")
    setRespData(res.data.resp)
}
 useEffect(()=>{
    fetchData()
 },[])  

 setTimeout(()=>{
    fetchData()
 },30000)
 
 const logout =()=>{
    Navigate('/')
 }


    const columns = [
        {
            name: 'Email',
            selector: row => row.email,
        },
        {
            name: 'First Name',
            selector: row => row.first_name,
        },
        {
            name: 'Last Name',
            selector: row => row.last_name,
        },
    ];
         
  return (
    <div>
         <Button sx={{ marginLeft: "1200px" }} onClick={logout}>Logout</Button>
        <DataTable
            columns={columns}
            data={respData}
        />
       
    </div>
  )
}

export default Dashboard