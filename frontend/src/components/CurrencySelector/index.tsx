import Select, { SelectChangeEvent } from "@mui/material/Select";
import { MenuItem } from "@mui/material";

interface CurrencySelectorProps {
  supportedCurrencies: string[];
  selected: string;
  setSelected: (currencyCode: string) => void;
}

const CurrencySelector = ({
  supportedCurrencies,
  selected,
  setSelected
}: CurrencySelectorProps) => {
  const handleChangeFrom = (event: SelectChangeEvent) => {
    setSelected(event.target.value as string);
  };
  return (
    <Select value={selected} label="From" onChange={handleChangeFrom}>
      {supportedCurrencies.map((currencyCode) => (
        <MenuItem key={currencyCode} value={currencyCode}>
          {currencyCode}
        </MenuItem>
      ))}
    </Select>
  );
};

export default CurrencySelector;
