import FormControl from "@mui/material/FormControl";
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
    <FormControl size="small">
      <Select value={selected} label="From" onChange={handleChangeFrom}>
        {supportedCurrencies.map((currencyCode) => (
          <MenuItem key={currencyCode} value={currencyCode}>
            {currencyCode}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default CurrencySelector;
