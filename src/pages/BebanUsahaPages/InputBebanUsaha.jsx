import { Box, Button, TextField, FormLabel } from "@mui/material";
import { Formik } from "formik";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import { postBebanUsaha } from "../../api/api";

const InputBebanUsaha = () => {
  //bridgetobakcend
  const [gaji_karyawan, setGajiKaryawan] = useState("");
  const [beban_operasional, setBebanOperasional] = useState("");
  const [biaya_jamsostek, setBiayaJamsostek] = useState("");
  const [biaya_lain, setBiayaLain] = useState("");
  const [biaya_aset, setBiayaAset] = useState("");
  const [biaya_jilid, setBiayaJilid] = useState("");
  const [biaya_atk, setBiayaAtk] = useState("");
  const navigate = useNavigate();

  const saveBebanUsaha = async (e) => {
    e.preventDefault();
    try {
      await postBebanUsaha({
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

  // const saveBebanUsaha = async (e) => {
  //   e.preventDefault();
  //   try {
  //     await axios.post("http://localhost:5000/bebanusaha", {
  //       gaji_karyawan,
  //       beban_operasional,
  //       biaya_jamsostek,
  //       biaya_lain,
  //       biaya_aset,
  //       biaya_jilid,
  //       biaya_atk,
  //     });
  //     navigate("/");
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  //handleform
  const isNonMobile = useMediaQuery("(min-width:600px)");

  return (
    <Box m="20px">
      <Header title="Data Beban Usaha" subtitle="Form Input Data Beban Usaha" />

      <Formik
      >
        {({
          errors,
          touched,
          handleBlur,
          handleSubmit,
        }) => (
          <form onSubmit={(handleSubmit, saveBebanUsaha)}>
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
                error={!!touched.email && !!errors.email}
                helperText={touched.email && errors.email}
                sx={{ gridColumn: "span 4" }}
              />
              <FormLabel sx={{ gridColumn: "span 3" }} className="label">
                Beban Operasional
              </FormLabel>
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="beban"
                onBlur={handleBlur}
                onChange={(e) => setBebanOperasional(e.target.value)}
                value={beban_operasional}
                name="contact"
                error={!!touched.contact && !!errors.contact}
                helperText={touched.contact && errors.contact}
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
                Simpan Data
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default InputBebanUsaha;
