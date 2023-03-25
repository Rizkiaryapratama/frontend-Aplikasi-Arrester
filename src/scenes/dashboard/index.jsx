import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import AddBusinessIcon from "@mui/icons-material/AddBusiness";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import Header from "../../components/Header";
import LineChart from "../../components/LineChart";
import BarChart from "../../components/BarChart";
import StatBox from "../../components/StatBox";
import ProgressCircle from "../../components/ProgressCircle";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { useState, useEffect } from "react";
import { getKas, getKontrak } from "../../api/api";
import Moment from "react-moment";
import { NumericFormat } from "react-number-format";
import { CircularProgress } from "@mui/material";

const Dashboard = () => {
  //bridge to backend
  const [kas, setKas] = useState([]);
  const [kontrak, setKontrak] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    fetchKas();
    fetchKontrak();
    // eslint-disable-next-line
  }, []);

  //get kas api
  const fetchKas = async () => {
    setIsLoading(true); // Set isLoading to true before fetching data
    const data = await getKas();
    setKas(data);
    setIsLoading(false); // Set isLoading to false after fetching data
  };

  //get kontrak api
  const fetchKontrak = async () => {
    setIsLoading(true); // Set isLoading to true before fetching data
    const data = await getKontrak();
    setKontrak(data);
    setIsLoading(false); // Set isLoading to false after fetching data
  };

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

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  //feature for Kas
  //Total Saldo Masuk
  const totalSaldo = kas.reduce(
    (total, currentKas) => (total = total + currentKas.new_in),
    0
  );
  const totalSaldo2 = kas
    .slice(0, -1)
    .reduce((total, currentKas) => (total = total + currentKas.new_in), 0);
  const percentageTotalSaldo = (
    ((totalSaldo - totalSaldo2) / totalSaldo) *
    100
  ).toFixed(2);
  const barTotalSaldo = percentageTotalSaldo / 100;

  //Vendor Terbaru
  const vendorTerbaru = kas.length > 0 ? kas[kas.length - 1].vendor : 0;
  //Jumlah Vendor
  const jumlahVendor = kas.length;
  const percentageJumlahVendor = (
    ((kas.length - (kas.length - 1)) / kas.length) *
    100
  ).toFixed(2);
  const barJumlahVendor = percentageJumlahVendor / 100;
  //Saldo Terkini
  const currentSaldo = kas.length > 0 ? kas[kas.length - 1].totalSaldo : 0;

  const currentSaldo2 = kas.length > 0 ? kas[kas.length - 2].totalSaldo : 0;
  const change = currentSaldo - currentSaldo2;
  const changeSign = change >= 0 ? "+" : "-";
  const percentageChange = ((change / currentSaldo) * 100).toFixed(2);

  const barSaldoTerkini = percentageChange / 100;

  //feature for Kontrak
  // Kontrak Terbaru
  const kontrakTerbaru =
    kontrak.length > 0 ? kontrak[kontrak.length - 1].nama_pekerjaan : 0;
  // Tanggal Kontrak Terbaru
  const tglKontrakTerbaru =
    kontrak.length > 0 ? kontrak[kontrak.length - 1].tgl_kontrak : 0;
  // Nilai Kontrak Terbaru
  const nilaiKontrakTerbaru =
    kontrak.length > 0 ? kontrak[kontrak.length - 1].nilai_kontrak : 0;
  // Nomor Kontrak Terbaru
  const noKontrakTerbaru =
    kontrak.length > 0 ? kontrak[kontrak.length - 1].nomor_kontrak : 0;
  // total Nilai Kontrak
  const totalNilaiKontrak = kontrak.reduce(
    (total, currentKontrak) => (total = total + currentKontrak.nilai_kontrak),
    0
  );
  const totalNilaiKontrak2 = kontrak
    .slice(0, -1)
    .reduce(
      (total, currentKontrak) => (total = total + currentKontrak.nilai_kontrak),
      0
    );
  const percentageNilaiKontrak = (
    ((totalNilaiKontrak - totalNilaiKontrak2) / totalNilaiKontrak) *
    100
  ).toFixed(2);

  //total DPP
  const totalDpp = kontrak.reduce(
    (total, currentKontrak) => (total = total + currentKontrak.dpp),
    0
  );
  const totalDpp2 = kontrak
    .slice(0, -1)
    .reduce((total, currentKontrak) => (total = total + currentKontrak.dpp), 0);
  const percentageDpp = (((totalDpp - totalDpp2) / totalDpp) * 100).toFixed(2);

  //total PPN
  const totalPpn = kontrak.reduce(
    (total, currentKontrak) => (total = total + currentKontrak.ppn),
    0
  );
  const totalPpn2 = kontrak
    .slice(0, -1)
    .reduce((total, currentKontrak) => (total = total + currentKontrak.ppn), 0);
  const percentagePpn = (((totalPpn - totalPpn2) / totalPpn) * 100).toFixed(2);

  //total PPH
  const totalPph = kontrak.reduce(
    (total, currentKontrak) => (total = total + currentKontrak.pph),
    0
  );
  const totalPph2 = kontrak
    .slice(0, -1)
    .reduce((total, currentKontrak) => (total = total + currentKontrak.pph), 0);
  const percentagePph = (((totalPph - totalPph2) / totalPph) * 100).toFixed(2);

  //total Netto Akhir
  const totalNettoAkhir = kontrak.reduce(
    (total, currentKontrak) => (total = total + currentKontrak.netto_akhir),
    0
  );
  const totalNettoAkhir2 = kontrak
    .slice(0, -1)
    .reduce(
      (total, currentKontrak) => (total = total + currentKontrak.netto_akhir),
      0
    );
  const percentageNettoAkhir = (
    ((totalNettoAkhir - totalNettoAkhir2) / totalNettoAkhir) *
    100
  ).toFixed(2);

  //total Modal
  const totalModal = kontrak.reduce(
    (total, currentKontrak) => (total = total + currentKontrak.modal),
    0
  );
  const totalModal2 = kontrak
    .slice(0, -1)
    .reduce(
      (total, currentKontrak) => (total = total + currentKontrak.modal),
      0
    );
  const percentageModal = (
    ((totalModal - totalModal2) / totalModal) *
    100
  ).toFixed(2);

  //total Profit Mitra
  const totalProfitMitra = kontrak.reduce(
    (total, currentKontrak) => (total = total + currentKontrak.profit),
    0
  );
  const totalProfitMitra2 = kontrak
    .slice(0, -1)
    .reduce(
      (total, currentKontrak) => (total = total + currentKontrak.profit),
      0
    );
  const percentageMitra = (
    ((totalProfitMitra - totalProfitMitra2) / totalProfitMitra) *
    100
  ).toFixed(2);

  //total Upp
  const totalUpp = kontrak.reduce(
    (total, currentKontrak) => (total = total + currentKontrak.total_upp),
    0
  );
  const totalUpp2 = kontrak
    .slice(0, -1)
    .reduce(
      (total, currentKontrak) => (total = total + currentKontrak.total_upp),
      0
    );
  const percentageUpp = (((totalUpp - totalUpp2) / totalUpp) * 100).toFixed(2);

  //total LabaRugi
  const totalLabaRugi = kontrak.reduce(
    (total, currentKontrak) => (total = total + currentKontrak.laba_rugi),
    0
  );
  const totalLabaRugi2 = kontrak
    .slice(0, -1)
    .reduce(
      (total, currentKontrak) => (total = total + currentKontrak.laba_rugi),
      0
    );
  const percentageLabaRugi = (
    ((totalLabaRugi - totalLabaRugi2) / totalLabaRugi) *
    100
  ).toFixed(2);

  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header
          title="DASHBOARD"
          subtitle="Halaman Dashboard Koperasi Arrester"
        />

        <Box>
          <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
          >
            <DownloadOutlinedIcon sx={{ mr: "10px" }} />
            Download Reports
          </Button>
        </Box>
      </Box>

      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        {/* ROW 1 */}
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={
              <NumericFormat
                value={totalSaldo}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"Rp "}
              />
            }
            subtitle="Total Saldo Masuk"
            progress={barTotalSaldo}
            increase={`${changeSign}${percentageTotalSaldo}%`}
            icon={
              <AddBusinessIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={
              <NumericFormat
                value={currentSaldo}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"Rp "}
              />
            }
            subtitle="Saldo Terkini"
            progress={barSaldoTerkini}
            increase={`${changeSign}${percentageChange}%`}
            icon={
              <AttachMoneyIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={vendorTerbaru}
            subtitle="Vendor Terbaru"
            progress="0.30"
            icon={
              <PersonAddIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={jumlahVendor}
            subtitle="SUM Vendor"
            progress={barJumlahVendor}
            increase={`${changeSign}${percentageJumlahVendor}%`}
            icon={
              <GroupAddIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>

        {/* ROW 2 */}
        <Box
          gridColumn="span 8"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Box
            mt="25px"
            p="0 30px"
            display="flex "
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Typography
                variant="h5"
                fontWeight="600"
                color={colors.grey[100]}
              >
                Chart Buku Kas Umum
              </Typography>
              <Typography
                variant="h3"
                fontWeight="bold"
                color={colors.greenAccent[500]}
              >
                <NumericFormat
                  value={currentSaldo}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"Rp "}
                />
              </Typography>
            </Box>
            <Box>
              <IconButton>
                <DownloadOutlinedIcon
                  sx={{ fontSize: "26px", color: colors.greenAccent[500] }}
                />
              </IconButton>
            </Box>
          </Box>
          <Box height="250px" m="-20px 0 0 0">
            <LineChart isDashboard={true} />
          </Box>
        </Box>

        <Box
          gridColumn="span 4"
          gridRow="span 4"
          backgroundColor={colors.primary[400]}
          overflow="auto"
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`4px solid ${colors.primary[500]}`}
            colors={colors.grey[100]}
            p="15px"
          >
            <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
              Informasi Kontrak Pekerjaan Terbaru
            </Typography>
          </Box>

          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`4px solid ${colors.primary[500]}`}
            p="15px"
          >
            <Box>
              <Typography
                color={colors.greenAccent[500]}
                variant="h5"
                fontWeight="600"
              >
                {kontrakTerbaru}
              </Typography>
              <Typography color={colors.grey[100]}>
                Nomor Kontrak : {noKontrakTerbaru}
              </Typography>
            </Box>
            <Moment format="DD/MM/YYYY">
              <Box color={colors.grey[100]}>{tglKontrakTerbaru}</Box>
            </Moment>
            <Box
              backgroundColor={colors.greenAccent[500]}
              p="5px 10px"
              borderRadius="4px"
              marginLeft="15px"
            >
              <NumericFormat
                value={nilaiKontrakTerbaru}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"Rp "}
              />
            </Box>
          </Box>

          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`4px solid ${colors.primary[500]}`}
            colors={colors.grey[100]}
            p="15px"
          >
            <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
              Informasi Keuangan Kontrak
            </Typography>
          </Box>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`4px solid ${colors.primary[500]}`}
            p="15px"
          >
            <Box>
              <Typography
                color={colors.greenAccent[500]}
                variant="h5"
                fontWeight="600"
              >
                Total Nilai Kontrak :
              </Typography>
            </Box>
            <Box color={colors.grey[100]}>
              <NumericFormat
                value={totalNilaiKontrak}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"Rp "}
              />
            </Box>
            <Box
              backgroundColor={colors.greenAccent[500]}
              p="5px 10px"
              borderRadius="4px"
            >
              {`${changeSign}${percentageNilaiKontrak}%`}
            </Box>
          </Box>

          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`4px solid ${colors.primary[500]}`}
            p="15px"
          >
            <Box>
              <Typography
                color={colors.greenAccent[500]}
                variant="h5"
                fontWeight="600"
              >
                Total DPP :
              </Typography>
            </Box>
            <Box color={colors.grey[100]}>
              <NumericFormat
                value={totalDpp}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"Rp "}
              />
            </Box>
            <Box
              backgroundColor={colors.greenAccent[500]}
              p="5px 10px"
              borderRadius="4px"
            >
              {`${changeSign}${percentageDpp}%`}
            </Box>
          </Box>

          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`4px solid ${colors.primary[500]}`}
            p="15px"
          >
            <Box>
              <Typography
                color={colors.greenAccent[500]}
                variant="h5"
                fontWeight="600"
              >
                Total PPN :
              </Typography>
            </Box>
            <Box color={colors.grey[100]}>
              <NumericFormat
                value={totalPpn}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"Rp "}
              />
            </Box>
            <Box
              backgroundColor={colors.greenAccent[500]}
              p="5px 10px"
              borderRadius="4px"
            >
              {`${changeSign}${percentagePpn}%`}
            </Box>
          </Box>

          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`4px solid ${colors.primary[500]}`}
            p="15px"
          >
            <Box>
              <Typography
                color={colors.greenAccent[500]}
                variant="h5"
                fontWeight="600"
              >
                Total PPH :
              </Typography>
            </Box>
            <Box color={colors.grey[100]}>
              <NumericFormat
                value={totalPph}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"Rp "}
              />
            </Box>
            <Box
              backgroundColor={colors.greenAccent[500]}
              p="5px 10px"
              borderRadius="4px"
            >
              {`${changeSign}${percentagePph}%`}
            </Box>
          </Box>

          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`4px solid ${colors.primary[500]}`}
            p="15px"
          >
            <Box>
              <Typography
                color={colors.greenAccent[500]}
                variant="h5"
                fontWeight="600"
              >
                Total Netto Akhir :
              </Typography>
            </Box>
            <Box color={colors.grey[100]}>
              <NumericFormat
                value={totalNettoAkhir}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"Rp "}
              />
            </Box>
            <Box
              backgroundColor={colors.greenAccent[500]}
              p="5px 10px"
              borderRadius="4px"
            >
              {`${changeSign}${percentageNettoAkhir}%`}
            </Box>
          </Box>

          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`4px solid ${colors.primary[500]}`}
            p="15px"
          >
            <Box>
              <Typography
                color={colors.greenAccent[500]}
                variant="h5"
                fontWeight="600"
              >
                Total Modal Keluar :
              </Typography>
            </Box>
            <Box color={colors.grey[100]}>
              <NumericFormat
                value={totalModal}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"Rp "}
              />
            </Box>
            <Box
              backgroundColor={colors.greenAccent[500]}
              p="5px 10px"
              borderRadius="4px"
            >
              {`${changeSign}${percentageModal}%`}
            </Box>
          </Box>

          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`4px solid ${colors.primary[500]}`}
            p="15px"
          >
            <Box>
              <Typography
                color={colors.greenAccent[500]}
                variant="h5"
                fontWeight="600"
              >
                Total Profit Mitra :
              </Typography>
            </Box>
            <Box color={colors.grey[100]}>
              <NumericFormat
                value={totalProfitMitra}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"Rp "}
              />
            </Box>
            <Box
              backgroundColor={colors.greenAccent[500]}
              p="5px 10px"
              borderRadius="4px"
            >
              {`${changeSign}${percentageMitra}%`}
            </Box>
          </Box>

          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`4px solid ${colors.primary[500]}`}
            p="15px"
          >
            <Box>
              <Typography
                color={colors.greenAccent[500]}
                variant="h5"
                fontWeight="600"
              >
                SUM Total UPP :
              </Typography>
            </Box>
            <Box color={colors.grey[100]}>
              <NumericFormat
                value={totalUpp}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"Rp "}
              />
            </Box>
            <Box
              backgroundColor={colors.greenAccent[500]}
              p="5px 10px"
              borderRadius="4px"
            >
              {`${changeSign}${percentageUpp}%`}
            </Box>
          </Box>

          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`4px solid ${colors.primary[500]}`}
            p="15px"
          >
            <Box>
              <Typography
                color={colors.greenAccent[500]}
                variant="h5"
                fontWeight="600"
              >
                Total Laba Rugi :
              </Typography>
            </Box>
            <Box color={colors.grey[100]}>
              <NumericFormat
                value={totalLabaRugi}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"Rp "}
              />
            </Box>
            <Box
              backgroundColor={colors.greenAccent[500]}
              p="5px 10px"
              borderRadius="4px"
            >
              {`${changeSign}${percentageLabaRugi}%`}
            </Box>
          </Box>

          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`4px solid ${colors.primary[500]}`}
            colors={colors.grey[100]}
            p="15px"
          ></Box>
        </Box>

        {/* ROW 3 */}
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          p="30px"
        >
          <Typography variant="h5" fontWeight="600">
            Campaign
          </Typography>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            mt="25px"
          >
            <ProgressCircle size="125" />
            <Typography
              variant="h5"
              color={colors.greenAccent[500]}
              sx={{ mt: "15px" }}
            >
              $48,352 revenue generated
            </Typography>
            <Typography>Includes extra misc expenditures and costs</Typography>
          </Box>
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ padding: "30px 30px 0 30px" }}
          >
            Sales Quantity
          </Typography>
          <Box height="250px" mt="-20px">
            <BarChart isDashboard={true} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
