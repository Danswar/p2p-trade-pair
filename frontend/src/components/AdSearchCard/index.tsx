import { Refresh } from "@mui/icons-material";
import { IconButton, TextField } from "@mui/material";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
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
  typeOperation: string;
  setTypeOperation: (type: string) => void;
}

const AdSearchCard = ({
  currency,
  setCurrency,
  supportedCurrencies,
  adList,
  handleChangeAdvertise,
  handleSearch,
  typeOperation,
  setTypeOperation
}: AdSearchCardProps) => {
  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string
  ) => {
    setTypeOperation(newAlignment);
  };

  return (
    <Box component="form">
      <TextField size="small" />
      <ToggleButtonGroup
        color="primary"
        value={typeOperation}
        exclusive
        onChange={handleChange}
      >
        <ToggleButton value="buy">Buy</ToggleButton>
        <ToggleButton value="sell">Sell</ToggleButton>
      </ToggleButtonGroup>
      <IconButton onClick={handleSearch}>
        <CurrencySelector
          supportedCurrencies={supportedCurrencies}
          selected={currency}
          setSelected={setCurrency}
        />
        <Refresh />
      </IconButton>
      <Box>
        <AdsList ads={adList} onChange={handleChangeAdvertise} />
      </Box>
    </Box>
  );
};

export default AdSearchCard;
