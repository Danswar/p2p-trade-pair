import Layout from "./components/Layout";
import AppBar from "./components/AppBar";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/system/Box";

const useQueryBestAds = () => {};

function App() {
  return (
    <Layout>
      <AppBar title="P2P Manager" />
      <Box component="form">
        <Box>
          <TextField label="monto" variant="standard" />
          <TextField label="tasa" variant="standard" />
        </Box>
        <Button onClick={() => {}} variant="contained">
          Buscar
        </Button>
      </Box>
    </Layout>
  );
}

export default App;
