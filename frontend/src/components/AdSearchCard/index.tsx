import { FilterAlt, Refresh } from "@mui/icons-material";
import { IconButton, InputAdornment, OutlinedInput } from "@mui/material";
import Box from "@mui/system/Box";

import { Advertise } from "../../interfaces/Advertise";
import TypeOperationToggle from "../TypeOperationToggle";
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
  return (
    <Box component="form" sx={{ padding: 1 }}>
      <OutlinedInput
        placeholder="Input the amount"
        size="small"
        fullWidth
        sx={{ paddingRight: "10px" }}
        endAdornment={
          <InputAdornment position="end">
            <CurrencySelector
              supportedCurrencies={supportedCurrencies}
              selected={currency}
              setSelected={setCurrency}
            />
          </InputAdornment>
        }
      />
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "5px"
        }}
      >
        <Box>
          <TypeOperationToggle
            typeOperation={typeOperation}
            onChange={setTypeOperation}
          />
        </Box>
        <Box>
          <IconButton onClick={handleSearch}>
            <Refresh />
          </IconButton>
          <IconButton onClick={() => {}}>
            <FilterAlt />
          </IconButton>
        </Box>
      </Box>
      <Box>
        <AdsList ads={adList} onChange={handleChangeAdvertise} />
      </Box>
    </Box>
  );
};

export default AdSearchCard;
