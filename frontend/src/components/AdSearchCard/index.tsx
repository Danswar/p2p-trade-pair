import { Refresh } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import Button from "@mui/material/Button";
import Box from "@mui/system/Box";
import { Advertise } from "../../interfaces/Advertise";

import AdsList from "./../AdsList";
import CurrencySelector from "./../CurrencySelector";

interface AdSearchCardProps {
  currency: string;
  setCurrency: (currencyCode: string) => void;
  supportedCurrencies: string[];
  adList: Advertise[];
  handleChangeAdvertise: (current: number) => void;
  handleSearch: () => void;
}

const AdSearchCard = ({
  currency,
  setCurrency,
  supportedCurrencies,
  adList,
  handleChangeAdvertise,
  handleSearch
}: AdSearchCardProps) => {
  return (
    <Box component="form">
      <CurrencySelector
        supportedCurrencies={supportedCurrencies}
        selected={currency}
        setSelected={setCurrency}
      />
      <IconButton onClick={handleSearch}>
        <Refresh />
      </IconButton>
      <Box>
        <AdsList ads={adList} onChange={handleChangeAdvertise} />
      </Box>
    </Box>
  );
};

export default AdSearchCard;
