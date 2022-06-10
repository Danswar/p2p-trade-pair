import { useState } from "react";
import Layout from "./components/Layout";
import AppBar from "./components/AppBar";
import { Link, MenuItem } from "@mui/material";

import Select, { SelectChangeEvent } from "@mui/material/Select";
import Button from "@mui/material/Button";
import Box from "@mui/system/Box";
import Slider from "react-slick";

const BEST_ADS_URL = `http://localhost:3000`;
const SUPPORTED_CURRENCIES = ["USDT", "ARS", "VED", "BRL"];

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
        <Slider>
          {ads.map(
            ({
              id,
              advertiser: { name, tradeCount, score },
              pair: { symbol },
              price,
              typeOperation,
              publicView
            }) => (
              <div
                key={id}
                style={{ margin: "5px", border: "solid black 1px" }}
              >
                <p>
                  {name} (<span>{tradeCount}</span> <span>{score}%</span>)
                </p>
                <p>
                  {price} {symbol}
                </p>
                <p>{typeOperation}</p>
                <Link href={publicView} target="blank">
                  Go to this ad
                </Link>
              </div>
            )
          )}
        </Slider>
      </Box>
    </Layout>
  );
}

export default App;
