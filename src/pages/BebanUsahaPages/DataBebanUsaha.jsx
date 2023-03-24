import { Box, Button } from "@mui/material";
import { DataGrid, GridToolbar, GridCellParams } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { deleteBebanUsaha, getBebanUsaha } from "../../api/api";

const DataBebanUsaha = () => {
  //bridge to backend
  const [bebanusaha, setBebanUsaha] = useState([]);
  useEffect(() => {
    fetchBebanUsaha();
    // eslint-disable-next-line
  }, []);

  //get
  const fetchBebanUsaha = async () => {
    const data = await getBebanUsaha();
    setBebanUsaha(data);
  };

  //delete
  const handleDelete = async (id) => {
    await deleteBebanUsaha(id);
    fetchBebanUsaha();
  };

  //frontendd
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const column = [
    { field: "id", headerName: "No", flex: 0.2 },
    {
      field: "gaji_karyawan",
      headerName: "Gaji Karyawan",
      flex: 0.7,
      type: "number",
      headerAlign: "left",
      align: "left",
      cellClassName: "name-column--cell",
    },
    {
      field: "beban_operasional",
      headerName: "Beban Operasional",
      type: "number",
      headerAlign: "left",
      align: "left",
      flex: 0.7,
    },
    {
      field: "biaya_jamsostek",
      headerName: "Biaya Jamsostek",
      type: "number",
      headerAlign: "left",
      align: "left",
      flex: 0.7,
    },
    {
      field: "biaya_lain",
      headerName: "Biaya Lain Lain",
      type: "number",
      headerAlign: "left",
      align: "left",
      flex: 0.7,
    },
    {
      field: "biaya_aset",
      headerName: "Biaya Pemeliharaan Aset",
      type: "number",
      headerAlign: "left",
      align: "left",
      flex: 0.7,
    },
    {
      field: "biaya_jilid",
      headerName: "Biaya Jilid",
      type: "number",
      headerAlign: "left",
      align: "left",
      flex: 0.7,
    },
    {
      field: "biaya_atk",
      headerName: "Biaya ATK",
      type: "number",
      headerAlign: "left",
      align: "left",
      flex: 0.7,
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
          to={`../updatebebanusaha/${params.row._id}`}
          style={{ textDecoration: "none" }}
        >
          <Button color="secondary" variant="contained">
            Update
          </Button>
        </Link>
      ),
    },
  ];

  return (
    <Box m="20px">
      <Header title="Daftar Beban Usaha" subtitle="List Data Beban Usaha" />
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
          rows={bebanusaha}
          columns={column}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  );
};

export default DataBebanUsaha;
