import { useState } from "react";
import Layout from "./components/Layout";
import AppBar from "./components/AppBar";
import Button from "@mui/material/Button";
import Box from "@mui/system/Box";
import AdsList from "./components/AdsList";
import { Advertise } from "./interfaces/Advertise";
import CurrencySelector from "./components/CurrencySelector";
import fetchAds from "./utils/fetchAds";

const SUPPORTED_CURRENCIES = ["USDT", "ARS", "VED", "BRL"];

function App() {
  const [ads, setAds] = useState<Advertise[]>([]);
  const [currentAdvertise, setCurrentAdvertise] = useState<Advertise | null>(
    null
  );
  const [from, setFrom] = useState("USDT");

  const handleChangeAdvertise = (currentIndex: number) => {
    const currentAd = ads[currentIndex];
    setCurrentAdvertise(currentAd);
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
        <CurrencySelector
          supportedCurrencies={SUPPORTED_CURRENCIES}
          selected={from}
          setSelected={setFrom}
        />
        <Button onClick={searchAds} variant="contained">
          Buscar
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
