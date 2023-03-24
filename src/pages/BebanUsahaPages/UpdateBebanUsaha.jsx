import { Box, Button, TextField, FormLabel } from "@mui/material";
import { Formik } from "formik";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getBebanUsahaById, updateBebanUsahaById } from "../../api/api";

const UpdateBebanUsaha = () => {
  //bridgetobakcend
  const [gaji_karyawan, setGajiKaryawan] = useState("");
  const [beban_operasional, setBebanOperasional] = useState("");
  const [biaya_jamsostek, setBiayaJamsostek] = useState("");
  const [biaya_lain, setBiayaLain] = useState("");
  const [biaya_aset, setBiayaAset] = useState("");
  const [biaya_jilid, setBiayaJilid] = useState("");
  const [biaya_atk, setBiayaAtk] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    getBebanUsaha();
    // eslint-disable-next-line
  }, []);

  //get
  const getBebanUsaha = async () => {
    const data = await getBebanUsahaById(id);
    setGajiKaryawan(data.gaji_karyawan);
    setBebanOperasional(data.beban_operasional);
    setBiayaJamsostek(data.biaya_jamsostek);
    setBiayaLain(data.biaya_lain);
    setBiayaAset(data.biaya_aset);
    setBiayaJilid(data.biaya_jilid);
    setBiayaAtk(data.biaya_atk);
  };
  
  const updateBebanUsaha = async (e) => {
    e.preventDefault();
    try {
      await updateBebanUsahaById(id, {
        gaji_karyawan,
        beban_operasional,
        biaya_jamsostek,
        biaya_lain,
        biaya_aset,
        biaya_jilid,
        biaya_atk,
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
      <Header title="Data Beban Usaha" subtitle="Halaman Update Data Beban Usaha" />

      <Formik>
        {({ errors, touched, handleBlur, handleSubmit }) => (
          <form onSubmit={(handleSubmit, updateBebanUsaha)}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <FormLabel sx={{ gridColumn: "span 3" }} className="label">
                Gaji Karyawan
              </FormLabel>
              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Gaji"
                onBlur={handleBlur}
                onChange={(e) => setGajiKaryawan(e.target.value)}
                value={gaji_karyawan}
                name="Gaji Karyawan"
                error={!!touched.gaji_karyawan && !!errors.gaji_karyawan}
                helperText={touched.gaji_karyawan && errors.gaji_karyawan}
                sx={{ gridColumn: "span 4" }}
              />
              <FormLabel sx={{ gridColumn: "span 3" }} className="label">
                Beban Operasional
              </FormLabel>
              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="beban"
                onBlur={handleBlur}
                onChange={(e) => setBebanOperasional(e.target.value)}
                value={beban_operasional}
                name="beban_operasional"
                error={!!touched.beban_operasional && !!errors.beban_operasional}
                helperText={touched.beban_operasional && errors.beban_operasional}
                sx={{ gridColumn: "span 4" }}
              />
              <FormLabel sx={{ gridColumn: "span 3" }} className="label">
                Biaya Jamsostek
              </FormLabel>
              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Biaya"
                onBlur={handleBlur}
                onChange={(e) => setBiayaJamsostek(e.target.value)}
                value={biaya_jamsostek}
                name="biayajamsostek"
                error={!!touched.email && !!errors.email}
                helperText={touched.email && errors.email}
                sx={{ gridColumn: "span 4" }}
              />
              <FormLabel sx={{ gridColumn: "span 3" }} className="label">
                Biaya Lain Lain
              </FormLabel>
              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Biaya"
                onBlur={handleBlur}
                onChange={(e) => setBiayaLain(e.target.value)}
                value={biaya_lain}
                name="Biaya Lain"
                error={!!touched.address1 && !!errors.address1}
                helperText={touched.address1 && errors.address1}
                sx={{ gridColumn: "span 4" }}
              />
              <FormLabel sx={{ gridColumn: "span 3" }} className="label">
                Biaya Pemeliharaan Aset
              </FormLabel>
              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Biaya"
                onBlur={handleBlur}
                onChange={(e) => setBiayaAset(e.target.value)}
                value={biaya_aset}
                name="biayaaset"
                error={!!touched.address1 && !!errors.address1}
                helperText={touched.address1 && errors.address1}
                sx={{ gridColumn: "span 4" }}
              />
              <FormLabel sx={{ gridColumn: "span 3" }} className="label">
                Biaya Jilid & Fotocopy
              </FormLabel>
              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Biaya"
                onBlur={handleBlur}
                onChange={(e) => setBiayaJilid(e.target.value)}
                value={biaya_jilid}
                name="biayajilid"
                error={!!touched.address1 && !!errors.address1}
                helperText={touched.address1 && errors.address1}
                sx={{ gridColumn: "span 4" }}
              />
              <FormLabel sx={{ gridColumn: "span 3" }} className="label">
                Biaya ATK & Materai
              </FormLabel>
              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Biaya"
                onBlur={handleBlur}
                onChange={(e) => setBiayaAtk(e.target.value)}
                value={biaya_atk}
                name="biayaatk"
                error={!!touched.address1 && !!errors.address1}
                helperText={touched.address1 && errors.address1}
                sx={{ gridColumn: "span 4" }}
              />
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

export default UpdateBebanUsaha
