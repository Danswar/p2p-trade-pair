import { useState } from "react";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  List,
  ListItem,
  ListItemText
} from "@mui/material";
import { ArrowDropDown } from "@mui/icons-material";

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
  const [open, setOpen] = useState(false);

  const handleSelected = (currencyCode: string) => {
    setSelected(currencyCode);
    setOpen(false);
  };

  return (
    <>
      <Button onClick={() => setOpen(true)} endIcon={<ArrowDropDown />}>
        {selected}
      </Button>
      {open && (
        <Dialog open={open} disableScrollLock>
          <DialogTitle>Select a currency</DialogTitle>
          <DialogContent>
            <List>
              {supportedCurrencies.map((currencyCode) => (
                <ListItem
                  key={currencyCode}
                  button
                  onClick={() => handleSelected(currencyCode)}
                >
                  <ListItemText>{currencyCode}</ListItemText>
                </ListItem>
              ))}
            </List>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default CurrencySelector;
