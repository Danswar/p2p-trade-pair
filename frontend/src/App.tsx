import { useState } from "react";
import Layout from "./components/Layout";
import AppBar from "./components/AppBar";
import useBestAds from "./hooks/useBestAds";
import AdSearchCard from "./components/AdSearchCard";

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
      <AdSearchCard
        currency={from}
        setCurrency={setFrom}
        supportedCurrencies={SUPPORTED_CURRENCIES}
        adList={ads}
        handleChangeAdvertise={handleChangeAdvertise}
        handleSearch={handleSearch}
      />
      <p>{currentAdvertise?.advertiser.name}</p>
    </Layout>
  );
}

export default App;
