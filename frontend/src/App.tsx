import { useState } from "react";
import Layout from "./components/Layout";
import AppBar from "./components/AppBar";
import Button from "@mui/material/Button";
import Box from "@mui/system/Box";
import AdsList from "./components/AdsList";
import { Advertise } from "./interfaces/Advertise";
import CurrencySelector from "./components/CurrencySelector";
import { Divider } from "@mui/material";
import useBestAds from "./hooks/useBestAds";

const SUPPORTED_CURRENCIES = ["USDT", "ARS", "VED", "BRL"];

function App() {
  const { ads, currentAdvertise, handleChangeAdvertise, searchAds } =
    useBestAds();
  const [from, setFrom] = useState("USDT");

  const handleSearch = () => {
    searchAds({
      from,
      to: "BTC",
      amount: "1000",
      typeOperation: "sell"
    });
  };

  return (
    <Layout>
      <AppBar title="P2P Manager" />
      <Box component="form">
        <CurrencySelector
          supportedCurrencies={SUPPORTED_CURRENCIES}
          selected={from}
          setSelected={setFrom}
        />
        <Button onClick={handleSearch} variant="contained">
          Buscar seller
        </Button>
      </Box>
      <Box>
        <AdsList ads={ads} onChange={handleChangeAdvertise} />
      </Box>
      <p>{currentAdvertise?.advertiser.name}</p>
    </Layout>
  );
}

export default App;
