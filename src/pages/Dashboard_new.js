import React, { useEffect, useRef, useState, } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useLocation } from 'react-router-dom';

import DataTable from 'react-data-table-component';


//socket
import io from 'socket.io-client'
const socket = io.connect('http://localhost:8080')
// http://ip-api.com/json/49.204.139.229

const columns = [
  { id: 'user_name', label: 'User Name', minWidth: 170 },
  {
    id: 'city',
    label: 'City',
    minWidth: 170,
    align: 'right',
  },
  {
    id: 'email',
    label: 'Email',
    minWidth: 170,
    align: 'right'
  },
  {
    id: 'country_code',
    label: 'Country Code',
    minWidth: 170,
    align: 'right'
  },
  {
    id: 'country',
    label: 'Country',
    minWidth: 170,
    align: 'right'
  },
  {
    id: 'date',
    label: 'Date',
    minWidth: 170,
    align: 'right'
  }
];


const rows = [
  {
    "country": "India",
    "country_code": "IN",
    "city": "Chennai",
    "email": "test@gmail.com",
    "user_name": "test ddsd",
    "date": "Date"
  }
];

export default function StickyHeadTable() {
  const location = useLocation()

  const userInfo = useRef({
    ipAddr: '',
    mailAddr: ''
  })
  
  const userInfoArr = useRef([])

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };


  console.log(userInfoArr.current.length , '****************', rows.length,rows)

  useEffect(() => {
    console.log('SOCKERRRR_EFFFF')

    socket.on("connect", () => {
      console.log(socket.id); // x8WIv7-mJelg7on_ALbx
    });

    socket.on("test", (data__) => {                // init get
      console.log(data__, 'data__data__'); // undefined
      // rows.push(data__)
      userInfoArr.current.push(data__)
    });

  }, [socket, userInfoArr.current.length])

  console.log('ipAddr', userInfo.current)

  useEffect(() => {
    console.log('KKKKKKKKKKKKK', location.state)
    userInfo.current['mailAddr'] = location.state.email
    userInfo.current['ipAddr'] = location.state.ip

    var testData = {
      ip: '147.15.16.155',
      email: "daidsd@hhdsds.adj"
    }

    socket.emit("test", (testData) => {                // init call
      console.log(testData, 'testDatatestData'); // undefined
    });


  }, [])


  return (
    <Paper sx={{ width: '70%', overflow: 'hidden', }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {userInfoArr.current
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
