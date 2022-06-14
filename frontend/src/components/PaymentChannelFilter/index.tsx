import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  List,
  ListItem,
  ListItemText
} from "@mui/material";
import { FilterAlt } from "@mui/icons-material";

interface PaymentChannelFilterProps {
  selected: string;
  setSelected: (filter: string) => void;
  filterOptions: string[];
}

const PaymentChannelFilter = ({
  filterOptions,
  selected,
  setSelected
}: PaymentChannelFilterProps) => {
  const [open, setOpen] = useState(false);

  const handleSelected = (filterLabel: string) => {
    setSelected(filterLabel);
    setOpen(false);
  };

  return (
    <>
      <IconButton onClick={() => setOpen(true)}>
        <FilterAlt />
      </IconButton>
      <Dialog open={open} onClose={() => setOpen(false)} disableScrollLock>
        <DialogTitle>Select a channels</DialogTitle>
        <DialogContent>
          <List>
            {filterOptions.map((filterLabel) => (
              <ListItem
                key={filterLabel}
                button
                onClick={() => handleSelected(filterLabel)}
              >
                <ListItemText>{filterLabel}</ListItemText>
              </ListItem>
            ))}
          </List>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PaymentChannelFilter;
