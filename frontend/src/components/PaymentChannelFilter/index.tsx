import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from "@mui/material";
import { Check, FilterAlt } from "@mui/icons-material";

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
            <ListItem button onClick={() => handleSelected("")}>
              {!selected && (
                <ListItemIcon>
                  <Check />
                </ListItemIcon>
              )}
              <ListItemText>All</ListItemText>
            </ListItem>
            {filterOptions.map((filterLabel) => (
              <ListItem
                key={filterLabel}
                button
                onClick={() => handleSelected(filterLabel)}
              >
                {filterLabel === selected && (
                  <ListItemIcon>
                    <Check />
                  </ListItemIcon>
                )}
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
