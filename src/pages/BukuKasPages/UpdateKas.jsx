import { Box, Button, TextField, FormLabel, Select, MenuItem } from "@mui/material";
import { Formik } from "formik";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getKasById, updateKasById } from "../../api/api";

const UpdateKas = () => {
  //bridgetobakcend
  const [tanggal, setTanggal] = useState("");
  const [vendor, setVendor] = useState("");
  const [keterangan, setKeterangan] = useState("");
  const [pekerjaan, setPekerjaan] = useState("");
  const [inn, setInn] = useState("");
  const [out, setOut] = useState("");
  const [new_in, setNewIn] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();
  const [kas, setKas] = useState([]);

  useEffect(() => {
    getKas();
    // eslint-disable-next-line
  }, []);

  //get
  const getKas = async () => {
    const data = await getKasById(id);
    setTanggal(data.tanggal);
    setVendor(data.vendor);
    setKeterangan(data.keterangan);
    setPekerjaan(data.pekerjaan);
    setInn(data.in);
    setOut(data.out);
    setNewIn(data.new_in);
  };

  const updateKas = async (e) => {
    e.preventDefault();
    try {
      const saldo = parseFloat(inn || 0) || 0; // convert inn to a number, default to 0 if empty or NaN
      const outValue = parseFloat(out || 0) || 0; // convert out to a number, default to 0 if empty or NaN
      const inValue = parseFloat(new_in || 0) || 0;
      const totalSaldo = saldo + inValue - outValue; // calculate totalSaldo based on saldo and outValue
      await updateKasById(id, {
        tanggal,
        vendor,
        keterangan,
        pekerjaan,
        in: saldo, // use saldo as the value of in
        out: outValue, // use outValue as the value of out
        saldo, // use saldo as the value of saldo
        totalSaldo, // use totalSaldo as the value of totalSaldo
        new_in: inValue,
      });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  //handleform
  const isNonMobile = useMediaQuery("(min-width:600px)");

  return (
    <Box m="20px">
      <Header
        title="Data Buku Kas Umum"
        subtitle="Halaman Update Data Buku Kas Umum"
      />
      <Formik>
        {({ errors, touched, handleBlur, handleSubmit }) => (
          <form onSubmit={(handleSubmit, updateKas)}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <FormLabel sx={{ gridColumn: "span 3" }} className="label">
                Tanggal
              </FormLabel>
              <TextField
                fullWidth
                variant="filled"
                type="date"
                onBlur={handleBlur}
                onChange={(e) => setTanggal(e.target.value)}
                value={tanggal}
                name="tanggal"
                error={!!touched.tanggal && !!errors.tanggal}
                helperText={touched.tanggal && errors.tanggal}
                sx={{ gridColumn: "span 4" }}
              />
              <FormLabel sx={{ gridColumn: "span 3" }} className="label">
                Vendor
              </FormLabel>
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Vendor"
                onBlur={handleBlur}
                onChange={(e) => setVendor(e.target.value)}
                value={vendor}
                name="vendor"
                error={!!touched.vendor && !!errors.vendor}
                helperText={touched.vendor && errors.vendor}
                sx={{ gridColumn: "span 4" }}
              />
              <FormLabel sx={{ gridColumn: "span 3" }} className="label">
                Keterangan
              </FormLabel>
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Keterangan"
                onBlur={handleBlur}
                onChange={(e) => setKeterangan(e.target.value)}
                value={keterangan}
                name="keterangan"
                error={!!touched.keterangan && !!errors.keterangan}
                helperText={touched.keterangan && errors.keterangan}
                sx={{ gridColumn: "span 4" }}
              />
              <FormLabel sx={{ gridColumn: "span 3" }} className="label">
                Pekerjaan
              </FormLabel>
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Pekerjaan"
                onBlur={handleBlur}
                onChange={(e) => setPekerjaan(e.target.value)}
                value={pekerjaan}
                name="pekerjaan"
                error={!!touched.pekerjaan && !!errors.pekerjaan}
                helperText={touched.pekerjaan && errors.pekerjaan}
                sx={{ gridColumn: "span 4" }}
              />
              <FormLabel sx={{ gridColumn: "span 3" }} className="label">
                In
              </FormLabel>
              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Out"
                onBlur={handleBlur}
                onChange={(e) => setNewIn(e.target.value)}
                value={new_in}
                name="new_in"
                error={!!touched.new_in && !!errors.new_in}
                helperText={touched.new_in && errors.new_in}
                sx={{ gridColumn: "span 4" }}
              />
              <FormLabel sx={{ gridColumn: "span 3" }} className="label">
                Out
              </FormLabel>
              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Out"
                onBlur={handleBlur}
                onChange={(e) => setOut(e.target.value)}
                value={out}
                name="out"
                error={!!touched.out && !!errors.out}
                helperText={touched.out && errors.out}
                sx={{ gridColumn: "span 4" }}
              />
              <FormLabel sx={{ gridColumn: "span 3" }} className="label">
                Saldo
              </FormLabel>
              <Select
                fullWidth
                variant="filled"
                label="In"
                onBlur={handleBlur}
                onChange={(e) => setInn(e.target.value)}
                value={inn}
                name="inn"
                error={!!touched.inn && !!errors.inn}
                helperText={touched.inn && errors.inn}
                sx={{ gridColumn: "span 4" }}
              >
                {/* check if kas array is empty or last element doesn't have totalSaldo */}
                {kas.length === 0 ||
                kas.slice(-1)[0].totalSaldo === undefined ? (
                  // if condition is true, render new MenuItem with input field
                  <MenuItem value="">
                    <TextField
                      label="Total Saldo"
                      variant="outlined"
                      value={inn}
                      onChange={(e) => setInn(e.target.value)}
                      onClick={(e) => e.stopPropagation()} // Add this line
                      error={!!touched.inn && !!errors.inn}
                      helperText={touched.inn && errors.inn}
                    />
                  </MenuItem>
                ) : (
                  // if condition is false, render MenuItem with totalSaldo value
                  <MenuItem value={kas.slice(-1)[0].totalSaldo}>
                    {kas.slice(-1)[0].totalSaldo}
                  </MenuItem>
                )}
              </Select>
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Update Data
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default UpdateKas;
