import { useState } from "react";
import Layout from "./components/Layout";
import AppBar from "./components/AppBar";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/system/Box";

const BEST_ADS_URL = `http://localhost:3000`;

type FetchAdsInput = {
  typeOperation: string;
  from: string;
  to: string;
  amount: string;
};

const fetchAds = async ({ typeOperation, from, to, amount }: FetchAdsInput) => {
  const res = await fetch(
    `${BEST_ADS_URL}/${typeOperation}/${from}/${to}/${amount}`
  );
  const { data } = await res.json();
  return data;
};

function App() {
  const [ads, setAds] = useState([]);

  const searchAds = async () => {
    setAds(
      await fetchAds({
        typeOperation: "sell",
        from: "usdt",
        to: "btc",
        amount: "100"
      })
    );
  };

  return (
    <Layout>
      <AppBar title="P2P Manager" />
      <Box component="form">
        <Box>
          <TextField label="monto" variant="standard" />
          <TextField label="tasa" variant="standard" />
        </Box>
        <Button onClick={searchAds} variant="contained">
          Buscar
        </Button>
      </Box>
      <Box>
        {ads.map((ad: { id: string }) => (
          <div key={ad.id}>{ad.id}</div>
        ))}
      </Box>
    </Layout>
  );
}

export default App;
