import { Box, Button } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getKontrak, deleteKontrak } from "../../api/api";
import Moment from "react-moment";

const DataKontrak = () => {
  //bridge to backend
  const [kontrak, setKontrak] = useState([]);
  useEffect(() => {
    fetchKontrak();
    // eslint-disable-next-line
  }, []);

  //get
  const fetchKontrak = async () => {
    const data = await getKontrak();
    setKontrak(data);
  };

  //delete
  const handleDelete = async (id) => {
    await deleteKontrak(id);
    fetchKontrak();
  };

  //frontend
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const columns = [
    { field: "id", headerName: "No", flex: 0.2 },
    {
      renderCell: (params: GridCellParams) => (
        <Moment format="DD/MM/YYYY" date={params.value}></Moment>
      ),
      field: "tgl_kontrak",
      headerName: "Tanggal",
      type: "Date",
      flex: 0.5,
      headerAlign: "left",
      align: "left",
      cellClassName: "name-column--cell",
    },
    {
      field: "nomor_kontrak",
      headerName: "No Kontrak",
      type: "text",
      flex: 0.5,
      cellClassName: "name-column--cell",
    },
    {
      field: "nama_pekerjaan",
      headerName: "Nama Pekerjaan",
      type: "text",
      flex: 1,
      headerAlign: "left",
      align: "left",
    },
    {
      field: "nilai_kontrak",
      headerName: "Nilai Kontrak",
      type: "number",
      headerAlign: "left",
      align: "left",
      flex: 0.5,
    },
    {
      field: "dpp",
      headerName: "DPP",
      type: "number",
      headerAlign: "left",
      align: "left",
      flex: 0.5,
    },
    {
      field: "ppn",
      headerName: "PPN",
      type: "number",
      headerAlign: "left",
      align: "left",
      flex: 0.5,
    },
    {
      field: "pph",
      headerName: "PPH",
      type: "number",
      headerAlign: "left",
      align: "left",
      flex: 0.5,
    },
    {
      field: "netto_akhir",
      headerName: "Netto Akhir",
      type: "number",
      headerAlign: "left",
      align: "left",
      flex: 0.5,
    },
    {
      field: "modal",
      headerName: "Modal",
      type: "number",
      headerAlign: "left",
      align: "left",
      flex: 0.5,
    },
    {
      field: "profit",
      headerName: "Profit Mitra",
      type: "number",
      headerAlign: "left",
      align: "left",
      flex: 0.5,
    },
    {
      field: "total_upp",
      headerName: "Total UPP",
      type: "number",
      headerAlign: "left",
      align: "left",
      flex: 0.5,
    },
    {
      field: "laba_rugi",
      headerName: "Laba Rugi",
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
          to={`../updatekontrak/${params.row._id}`}
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
      <Header
        title="Daftar Kontrak Pekerjaan"
        subtitle="List Data Kontrak Pekerjaan Koperasi Arrester"
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
          rows={kontrak}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  );
};

export default DataKontrak;
