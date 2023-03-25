import { Box, Button } from "@mui/material";
import { DataGrid, GridToolbar, GridCellParams } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useTheme, CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import { getKas, deleteKas } from "../../api/api";

const DataKas = () => {
  //bridge to backend
  const [kas, setKas] = useState([]);
  const [isLoading, setIsLoading] = useState(true); 
  useEffect(() => {
    fetchKas();
    // eslint-disable-next-line
  }, []);

  //get
  const fetchKas = async () => {
    setIsLoading(true); // Set isLoading to true before fetching data
    const data = await getKas();
    setKas(data);
    setIsLoading(false); // Set isLoading to false after fetching data
  };

  //delete
  const handleDelete = async (id) => {
    await deleteKas(id);
    fetchKas();
  };

  //frontendd
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const column = [
    { field: "id", headerName: "No", flex: 0.2 },
    {
      renderCell: (params: GridCellParams) => (
        <Moment format="DD/MM/YYYY" date={params.value}></Moment>
      ),
      field: "tanggal",
      headerName: "Tanggal",
      type: "Date",
      flex: 0.8,
      headerAlign: "left",
      align: "left",
      cellClassName: "name-column--cell",
    },
    {
      field: "vendor",
      headerName: "Vendor",
      type: "text",
      headerAlign: "left",
      align: "left",
      flex: 1,
    },
    {
      field: "pekerjaan",
      headerName: "Pekerjaan",
      flex: 1,
    },
    {
      field: "keterangan",
      headerName: "Keterangan",
      flex: 1,
    },
    {
      field: "new_in",
      headerName: "In",
      type: "number",
      headerAlign: "left",
      align: "left",
      flex: 0.5,
    },
    {
      field: "out",
      headerName: "Out",
      type: "number",
      headerAlign: "left",
      align: "left",
      flex: 0.5,
    },
    {
      field: "totalSaldo",
      headerName: "Saldo",
      type: "number",
      headerAlign: "left",
      align: "left",
      flex: 0.5,
    },
    {
      field: "action",
      headerName: "Action",
      width: 100,
      flex: 0.5,
      headerAlign: "right",
      renderCell: (params: GridCellParams) => (
        <Button
          onClick={() => {
            handleDelete(params.row._id);
          }}
          color="warning"
          variant="contained"
        >
          Delete
        </Button>
      ),
    },
    {
      width: 100,
      flex: 0.5,
      renderCell: (params: GridCellParams) => (
        <Link
          to={`../updatekas/${params.row._id}`}
          style={{ textDecoration: "none" }}
        >
          <Button color="secondary" variant="contained">
            Update
          </Button>
        </Link>
      ),
    },
  ];

if (isLoading) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "75vh",
      }}
    >
      <CircularProgress color="secondary" size={64} />
    </Box>
  );
}

  return (
    <Box m="20px">
      <Header
        title="Data Buku Kas Umum"
        subtitle="List Data Buku Kas Umum Koperasi Arrester"
      />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <DataGrid
          rows={kas}
          columns={column}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  );
};

export default DataKas;
