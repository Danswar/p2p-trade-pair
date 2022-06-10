import { useState } from "react";
import Layout from "./components/Layout";
import AppBar from "./components/AppBar";
import { MenuItem } from "@mui/material";

import Select, { SelectChangeEvent } from "@mui/material/Select";
import Button from "@mui/material/Button";
import Box from "@mui/system/Box";
import AdsList from "./components/AdsList";
import { Advertise } from "./interfaces/Advertise";

const BEST_ADS_URL = `http://localhost:3000`;
const SUPPORTED_CURRENCIES = ["USDT", "ARS", "VED", "BRL"];

type FetchAdsInput = {
  typeOperation: string;
  from: string;
  to: string;
  amount: string;
};

const fetchAds = async ({
  typeOperation,
  from,
  to,
  amount
}: FetchAdsInput): Promise<Advertise[]> => {
  const res = await fetch(
    `${BEST_ADS_URL}/${typeOperation}/${from}/${to}/${amount}`
  );
  const { data }: { data: Advertise[] } = await res.json();
  return data;
};

function App() {
  const [ads, setAds] = useState<Advertise[]>([]);
  const [from, setFrom] = useState("USDT");

  const handleChangeFrom = (event: SelectChangeEvent) => {
    setFrom(event.target.value as string);
  };

  const searchAds = async () => {
    setAds(
      await fetchAds({
        typeOperation: "sell",
        from,
        to: "btc",
        amount: "100"
      })
    );
  };

  return (
    <Layout>
      <AppBar title="P2P Manager" />
      <Box component="form">
        <Select value={from} label="From" onChange={handleChangeFrom}>
          {SUPPORTED_CURRENCIES.map((currencyCode) => (
            <MenuItem value={currencyCode}>{currencyCode}</MenuItem>
          ))}
        </Select>
        <Button onClick={searchAds} variant="contained">
          Buscar
        </Button>
      </Box>
      <Box>
        <AdsList ads={ads} />
      </Box>
    </Layout>
  );
}

export default App;
