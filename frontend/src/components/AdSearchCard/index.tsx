import { Refresh } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import Box from "@mui/system/Box";

import { Advertise } from "../../interfaces/Advertise";
import PaymentChannelFilter from "../PaymentChannelFilter";
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
  filters: {
    availablePaymentChannels: string[];
  };
}

const AdSearchCard = ({
  currency,
  setCurrency,
  supportedCurrencies,
  adList,
  handleChangeAdvertise,
  handleSearch,
  typeOperation,
  setTypeOperation,
  filters: { availablePaymentChannels = [] }
}: AdSearchCardProps) => {
  return (
    <Box component="form" sx={{ padding: 1 }}>
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
          <CurrencySelector
            supportedCurrencies={supportedCurrencies}
            selected={currency}
            setSelected={setCurrency}
          />
        </Box>
        <Box>
          <IconButton onClick={handleSearch}>
            <Refresh />
          </IconButton>
          <PaymentChannelFilter
            selected={availablePaymentChannels}
            setSelected={() => {}}
            filterOptions={availablePaymentChannels}
          />
        </Box>
      </Box>
      <Box>
        <AdsList ads={adList} onChange={handleChangeAdvertise} />
      </Box>
    </Box>
  );
};

export default AdSearchCard;
