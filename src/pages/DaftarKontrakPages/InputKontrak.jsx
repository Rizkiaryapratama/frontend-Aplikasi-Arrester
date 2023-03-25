import { Box, Button, TextField, FormLabel } from "@mui/material";
import { Formik } from "formik";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { postKontrak } from "../../api/api";

const InputKontrak = () => {
  //bridgetobakcend
  const [tgl_kontrak, setTglKontrak] = useState("");
  const [nomor_kontrak, setNomorKontrak] = useState("");
  const [nama_pekerjaan, setNamaPekerjaan] = useState("");
  const [nilai_kontrak, setNilaiKontrak] = useState("");
  const [dpp, setDpp] = useState("");
  const [modal, setModal] = useState("");
  const [profit, setProfit] = useState("");
  const [total_upp, setTotalUpp] = useState("");
  const [laba_rugi, setLabaRugi] = useState("");
  const navigate = useNavigate();

  //post
  const saveKontrak = async (e) => {
    e.preventDefault();
    try {
      await postKontrak({
        tgl_kontrak,
        nomor_kontrak,
        nama_pekerjaan,
        nilai_kontrak,
        dpp,
        ppn:dpp*0.11,
        pph:dpp*0.005,
        netto_akhir:(nilai_kontrak-(dpp*0.11)-(dpp*0.005)),
        modal,
        profit,
        total_upp,
        laba_rugi,
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
        title="Data Kontrak Pekerjaan"
        subtitle="Form Input Data Kontrak Kerja Koperasi Arrester"
      />
      <Formik>
        {({ errors, touched, handleBlur, handleSubmit }) => (
          <form onSubmit={(handleSubmit, saveKontrak)}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <FormLabel sx={{ gridColumn: "span 3" }} className="label">
                Tanggal Kontrak
              </FormLabel>
              <TextField
                fullWidth
                variant="filled"
                type="date"
                onBlur={handleBlur}
                onChange={(e) => setTglKontrak(e.target.value)}
                value={tgl_kontrak}
                name="tgl_kontrak"
                error={!!touched.tgl_kontrak && !!errors.tgl_kontrak}
                helperText={touched.tgl_kontrak && errors.tgl_kontrak}
                sx={{ gridColumn: "span 4" }}
                required={true}
              />
              <FormLabel sx={{ gridColumn: "span 3" }} className="label">
                Nomor Kontrak
              </FormLabel>
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Nomor Kontrak"
                onBlur={handleBlur}
                onChange={(e) => setNomorKontrak(e.target.value)}
                value={nomor_kontrak}
                name="nomor_kontrak"
                error={!!touched.nomor_kontrak && !!errors.nomor_kontrak}
                helperText={touched.nomor_kontrak && errors.nomor_kontrak}
                sx={{ gridColumn: "span 4" }}
                required={true}
              />
              <FormLabel sx={{ gridColumn: "span 3" }} className="label">
                Nama Pekerjaan
              </FormLabel>
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Nama Pekerjaan"
                onBlur={handleBlur}
                onChange={(e) => setNamaPekerjaan(e.target.value)}
                value={nama_pekerjaan}
                name="nama_pekerjaan"
                error={!!touched.nama_pekerjaan && !!errors.nama_pekerjaan}
                helperText={touched.nama_pekerjaan && errors.nama_pekerjaan}
                sx={{ gridColumn: "span 4" }}
                required={true}
              />
              <FormLabel sx={{ gridColumn: "span 3" }} className="label">
                Nilai Kontrak
              </FormLabel>
              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Nilai Kontrak"
                onBlur={handleBlur}
                onChange={(e) => setNilaiKontrak(e.target.value)}
                value={nilai_kontrak}
                name="nilai_kontrak"
                error={!!touched.nilai_kontrak && !!errors.nilai_kontrak}
                helperText={touched.nilai_kontrak && errors.nilai_kontrak}
                sx={{ gridColumn: "span 4" }}
                required={true}
              />
              <FormLabel sx={{ gridColumn: "span 3" }} className="label">
                Dpp
              </FormLabel>
              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Dpp"
                onBlur={handleBlur}
                onChange={(e) => setDpp(e.target.value)}
                value={dpp}
                name="dpp"
                error={!!touched.dpp && !!errors.dpp}
                helperText={touched.dpp && errors.dpp}
                sx={{ gridColumn: "span 4" }}
                required={true}
              />
              <FormLabel sx={{ gridColumn: "span 3" }} className="label">
                Modal
              </FormLabel>
              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Modal"
                onBlur={handleBlur}
                onChange={(e) => setModal(e.target.value)}
                value={modal}
                name="modal"
                error={!!touched.modal && !!errors.modal}
                helperText={touched.modal && errors.modal}
                sx={{ gridColumn: "span 4" }}
                required={true}
              />
              <FormLabel sx={{ gridColumn: "span 3" }} className="label">
                Profit Mitra
              </FormLabel>
              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Profit Mitra"
                onBlur={handleBlur}
                onChange={(e) => setProfit(e.target.value)}
                value={profit}
                name="profit"
                error={!!touched.profit && !!errors.profit}
                helperText={touched.profit && errors.profit}
                sx={{ gridColumn: "span 4" }}
                required={true}
              />
              <FormLabel sx={{ gridColumn: "span 3" }} className="label">
                Total Upp
              </FormLabel>
              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Total Upp"
                onBlur={handleBlur}
                onChange={(e) => setTotalUpp(e.target.value)}
                value={total_upp}
                name="total_upp"
                error={!!touched.total_upp && !!errors.total_upp}
                helperText={touched.total_upp && errors.total_upp}
                sx={{ gridColumn: "span 4" }}
                required={true}
              />
              <FormLabel sx={{ gridColumn: "span 3" }} className="label">
                Laba Rugi
              </FormLabel>
              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Laba Rugi"
                onBlur={handleBlur}
                onChange={(e) => setLabaRugi(e.target.value)}
                value={laba_rugi}
                name="laba_rugi"
                error={!!touched.laba_rugi && !!errors.laba_rugi}
                helperText={touched.laba_rugi && errors.laba_rugi}
                sx={{ gridColumn: "span 4" }}
                required={true}
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

export default InputKontrak;
