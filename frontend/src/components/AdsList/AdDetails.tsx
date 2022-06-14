import { Button, Card, CardContent, Typography } from "@mui/material";
import { Box } from "@mui/system";

interface AdDetailsProps {
  id: number;
  name: string;
  tradeCount: number;
  score: number;
  price: number;
  symbol: string;
  minAmount: number;
  maxAmount: number;
  typeOperation: string;
  paymentChannels: string[];
  publicView: string;
}

const AdDetails = ({
  id,
  name,
  tradeCount,
  score,
  price,
  symbol,
  minAmount,
  maxAmount,
  typeOperation,
  publicView,
  paymentChannels
}: AdDetailsProps) => {
  return (
    <Card key={id}>
      <CardContent sx={{ paddingBottom: "15px" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
          }}
        >
          <Box>
            <Typography>{name}</Typography>
          </Box>
          <Box>
            <Typography variant="caption">
              {tradeCount} orders | {score}% score
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between"
          }}
        >
          <Box>
            <Typography variant="caption">Price</Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between"
              }}
            >
              <Typography fontSize={35}>{price}</Typography>
              <Typography sx={{ verticalAlign: "bottom", lineHeight: "4" }}>
                {symbol}
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex"
              }}
            >
              <Typography variant="caption">Limit: </Typography>
              <Typography variant="caption">
                {minAmount} - {maxAmount}
              </Typography>
            </Box>
          </Box>
          <Box sx={{ alignSelf: "flex-end" }}>
            <Button variant="contained" href={publicView} target="blank">
              {typeOperation}
            </Button>
          </Box>
        </Box>
        <Box sx={{ display: "flex", flexWrap: "wrap", marginTop: "10px" }}>
          {paymentChannels.map((channelName) => (
            <Box
              sx={{
                border: "1px grey solid",
                margin: "2px",
                padding: "0 2px"
              }}
            >
              <Typography variant="caption">{channelName}</Typography>
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};

export default AdDetails;
