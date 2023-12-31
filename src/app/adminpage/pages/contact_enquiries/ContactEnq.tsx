"use client";
import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import {Button} from "@mui/material"
import Paper from "@mui/material/Paper";
import axios from "axios";
import * as XLSX from "xlsx";

function createData(
  name: string,
  phoneNo: number,
  email: string,
  message: string,
  date: string
) {
  return { name, phoneNo, email, message, date };
}

export default function ContactEnq() {
  const [rows, setrows] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:4000/user/getAllcontactenquiries")
      .then((res) => {
        setrows(res.data.data);
      })
      .catch((err) => {
        console.log("error");
      });
  }, []);

  const exportToExcel = () => {
    const dataForExcel = rows.map((row: any) => [
      row.firstName,
      row.lastName,
      row.phoneNumber,
      row.email,
      row.address,
      row.city,
      row.locality,
      row.area,
      row.zipcode,
      row.date,
    ]);

    const ws = XLSX.utils.aoa_to_sheet([
      ["First Name", "Last Name", "Phone Number", "Email", "Address", "City", "Locality", "Area", "Zipcode", "Date"],
      ...dataForExcel,
    ]);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Contact Enquiries");
    XLSX.writeFile(wb, "contact_enquiries.xlsx");
  };

  return (
    <>
    <div style={{textAlign:"end"}}>
      <Button variant="contained" color="primary" onClick={exportToExcel}>Export</Button>
    </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>First Name</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Last Name</TableCell>
              <TableCell sx={{ fontWeight: "bold" }} align="center">
                Email
              </TableCell>
              <TableCell sx={{ fontWeight: "bold" }} align="center">
                Phone Number
              </TableCell>
              <TableCell sx={{ fontWeight: "bold" }} align="center">
                Address
              </TableCell>
              <TableCell sx={{ fontWeight: "bold" }} align="center">
                City
              </TableCell>
              <TableCell sx={{ fontWeight: "bold" }} align="center">
                Locality
              </TableCell>
              <TableCell sx={{ fontWeight: "bold" }} align="center">
                Area
              </TableCell>
              <TableCell sx={{ fontWeight: "bold" }} align="center">
                Zipcode
              </TableCell>
              <TableCell sx={{ fontWeight: "bold" }} align="center">
                Date
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row: any) => (
              <TableRow
                key={row.firstName}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.firstName}
                </TableCell>
                <TableCell component="th" scope="row">
                  {row.lastName}
                </TableCell>
                <TableCell align="center">{row.email}</TableCell>
                <TableCell align="center">{row.phoneNumber}</TableCell>
                <TableCell align="center">{row.address}</TableCell>
                <TableCell align="center">{row.city}</TableCell>
                <TableCell align="center">{row.locality}</TableCell>
                <TableCell align="center">{row.area}</TableCell>
                <TableCell align="center">{row.zipcode}</TableCell>
                <TableCell align="center">{row.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
