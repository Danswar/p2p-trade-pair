import { useState } from "react";
import Layout from "./components/Layout";
import AppBar from "./components/AppBar";
import { Link } from "@mui/material";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/system/Box";
import mockedAds from "./mocks/ads.json";

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
  const [ads, setAds] = useState(mockedAds);

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
        {ads.map(
          ({
            id,
            advertiser: { name, tradeCount, score },
            price,
            typeOperation,
            publicView
          }) => (
            <div key={id} style={{ margin: "5px", border: "solid black 1px" }}>
              <p>{name}</p>
              <p>
                <span>{tradeCount}</span> <span>{score}%</span>
              </p>
              <p>{price}</p>
              <p>{typeOperation}</p>
              <Link href={publicView}>Go to this ad</Link>
            </div>
          )
        )}
      </Box>
    </Layout>
  );
}

export default App;
