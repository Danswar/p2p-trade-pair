import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

const TypeOperationToggle = ({
  typeOperation,
  onChange
}: {
  typeOperation: string;
  onChange: (type: string) => void;
}) => {
  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newTypeOperation: string
  ) => {
    onChange(newTypeOperation);
  };

  return (
    <ToggleButtonGroup
      color="primary"
      value={typeOperation}
      exclusive
      onChange={handleChange}
      size="small"
    >
      <ToggleButton value="buy">Buy</ToggleButton>
      <ToggleButton value="sell">Sell</ToggleButton>
    </ToggleButtonGroup>
  );
};

export default TypeOperationToggle;
