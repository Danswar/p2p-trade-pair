import { useState } from "react";
import Layout from "./components/Layout";
import AppBar from "./components/AppBar";
import useBestAds from "./hooks/useBestAds";
import AdSearchCard from "./components/AdSearchCard";

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
    </Layout>
  );
}

export default App;
