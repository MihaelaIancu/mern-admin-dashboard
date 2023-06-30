import { Box, Grid, Button, useTheme } from "@mui/material";
import Header from "components/Header";
import BarChart from "components/BarChart";
import { useNavigate, useParams } from "react-router-dom";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";

const BreakdownRevenue = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const params = useParams();
  console.log(params);

  const handleClick = () => {
    navigate("/breakdown");
  };

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="BREAKDOWN" subtitle="Breakdown of Products By Revenue" />
      <Box mt="40px" height="75vh">
        <BarChart category={params.category} />
      </Box>
      <Grid container justifyContent="flex-start" mb="20px">
        <Button
          sx={{
            color: theme.palette.secondary[500],
            margin: "25px 0px",
          }}
          variant="outlined"
          startIcon={<ArrowBackOutlinedIcon />}
          onClick={handleClick}
        >
          Go Back to Breakdown
        </Button>
      </Grid>
    </Box>
  );
};

export default BreakdownRevenue;
