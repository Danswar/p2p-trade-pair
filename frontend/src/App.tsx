import Layout from "./components/Layout";
import AppBar from "./components/AppBar";
import useBestAds from "./hooks/useBestAds";
import AdSearchCard from "./components/AdSearchCard";
import { Typography } from "@mui/material";
import { useEffect } from "react";

const SUPPORTED_CURRENCIES = ["USDT", "ARS", "VED", "BRL"];

function App() {
  const {
    ads: inputAds,
    currentAdvertise: currentInputAd,
    handleChangeAdvertise: handleChangeInputAd,
    searchAds: searchInputAds,
    currency: inputCurrency,
    setCurrency: setInputCurrency
  } = useBestAds();

  const {
    ads: outputAds,
    currentAdvertise: currentOutputAd,
    handleChangeAdvertise: handleChangeOutputAd,
    searchAds: searchOutputAds,
    currency: outputCurrency,
    setCurrency: setOutputCurrency
  } = useBestAds();

  const inputRate = currentInputAd?.price || 0;
  const outputRate = currentOutputAd?.price || 0;
  const rate = inputRate && outputRate ? outputRate / inputRate : 0;

  const handleInputSearch = () => {
    searchInputAds({
      from: inputCurrency,
      to: "BTC",
      amount: "1000",
      typeOperation: "sell"
    });
  };

  const handleOutputSearch = () => {
    searchOutputAds({
      from: outputCurrency,
      to: "BTC",
      amount: "1000",
      typeOperation: "sell"
    });
  };

  useEffect(() => {
    handleInputSearch();
  }, [inputCurrency]);

  useEffect(() => {
    handleOutputSearch();
  }, [outputCurrency]);

  return (
    <Layout>
      <AppBar title="P2P Manager" />
      <AdSearchCard
        currency={inputCurrency}
        setCurrency={setInputCurrency}
        supportedCurrencies={SUPPORTED_CURRENCIES}
        adList={inputAds}
        handleChangeAdvertise={handleChangeInputAd}
        handleSearch={handleInputSearch}
      />
      <AdSearchCard
        currency={outputCurrency}
        setCurrency={setOutputCurrency}
        supportedCurrencies={SUPPORTED_CURRENCIES}
        adList={outputAds}
        handleChangeAdvertise={handleChangeOutputAd}
        handleSearch={handleOutputSearch}
      />
      <Typography variant="h1" textAlign={"center"}>
        {rate}
      </Typography>
    </Layout>
  );
}

export default App;
