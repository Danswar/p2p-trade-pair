import Layout from "./components/Layout";
import AppBar from "./components/AppBar";
import useBestAds from "./hooks/useBestAds";
import AdSearchCard from "./components/AdSearchCard";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";

const SUPPORTED_CURRENCIES = ["USDT", "ARS", "VED", "BRL"];

function App() {
  const {
    ads: inputAds,
    currentAdvertise: currentInputAd,
    handleChangeAdvertise: handleChangeInputAd,
    searchAds: searchInputAds,
    currency: inputCurrency,
    handleChangeCurrency: setInputCurrency,
    typeOperation: inputTypeOperation,
    handleChangeTypeOperation: setInputTypeOperation
  } = useBestAds();

  const {
    ads: outputAds,
    currentAdvertise: currentOutputAd,
    handleChangeAdvertise: handleChangeOutputAd,
    searchAds: searchOutputAds,
    currency: outputCurrency,
    handleChangeCurrency: setOutputCurrency,
    typeOperation: outputTypeOperation,
    handleChangeTypeOperation: setOutputTypeOperation
  } = useBestAds();

  const inputRate = currentInputAd?.price || 0;
  const outputRate = currentOutputAd?.price || 0;
  const rate = inputRate && outputRate ? outputRate / inputRate : 0;

  return (
    <Layout>
      <AppBar title="P2P Manager" />
      <AdSearchCard
        currency={inputCurrency}
        setCurrency={setInputCurrency}
        supportedCurrencies={SUPPORTED_CURRENCIES}
        adList={inputAds}
        handleChangeAdvertise={handleChangeInputAd}
        handleSearch={searchInputAds}
        typeOperation={inputTypeOperation}
        setTypeOperation={setInputTypeOperation}
      />
      <AdSearchCard
        currency={outputCurrency}
        setCurrency={setOutputCurrency}
        supportedCurrencies={SUPPORTED_CURRENCIES}
        adList={outputAds}
        handleChangeAdvertise={handleChangeOutputAd}
        handleSearch={searchOutputAds}
        typeOperation={outputTypeOperation}
        setTypeOperation={setOutputTypeOperation}
      />
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Typography variant="h4" textAlign={"center"}>
          {rate.toFixed(4)}
        </Typography>
        <Typography
          sx={{ lineHeight: 3.5 }}
        >{`${outputCurrency}/${inputCurrency}`}</Typography>
      </Box>
    </Layout>
  );
}

export default App;
