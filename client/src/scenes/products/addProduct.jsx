import React from "react";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Grid,
  Box,
  Typography,
  FormControl,
  useTheme,
  useMediaQuery,
  Container,
  InputLabel,
  MenuItem,
  Select,
  FormHelperText,
  Rating,
} from "@mui/material";
import Header from "components/Header";
import InventoryOutlinedIcon from "@mui/icons-material/InventoryOutlined";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import FlexBetween from "components/FlexBetween";

const AddProduct = () => {
  const theme = useTheme();
  const isNonMobile = useMediaQuery("(min-width: 700px)");

  return (
    <Box m="1.5rem 3.5rem">
      <FlexBetween>
        <Header
          title="Add a new product"
          subtitle="Fill in the details to add a new products"
        />
      </FlexBetween>
      <Container sx={{ maxWidth: isNonMobile ? "sm" : "xs" }}>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: theme.palette.secondary.main }}>
            <InventoryOutlinedIcon />
          </Avatar>
          <Typography
            component="h1"
            variant="h5"
            color={theme.palette.secondary.light}
          >
            Product Details
          </Typography>
          <Box component="form" noValidate onSubmit={"submit"} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  value="test"
                  autoComplete="off"
                  name="name"
                  required
                  fullWidth
                  id="name"
                  label="Product Name"
                  autoFocus
                  onChange={"change"}
                />
                <FormHelperText>Required</FormHelperText>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl required sx={{ width: "100%" }}>
                  <InputLabel id="category">Category</InputLabel>
                  <Select
                    labelId="category"
                    id="category"
                    value="test"
                    label="Category *"
                    onChange={"change"}
                  >
                    <MenuItem value="">
                      <em>Choose a category</em>
                    </MenuItem>
                    <MenuItem value="shoes">Shoes</MenuItem>
                    <MenuItem value="accessories">Accessories</MenuItem>
                    <MenuItem value="misc">Misc</MenuItem>
                    <MenuItem value="clothing">Clothing</MenuItem>
                  </Select>
                  <FormHelperText>Required</FormHelperText>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  value="test"
                  name="description"
                  label="Description"
                  type="text"
                  id="description"
                  autoComplete="off"
                  onChange={"change"}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="price"
                  label="Price"
                  name="price"
                  type="number"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={"change"}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="supply"
                  type="number"
                  label="Supply"
                  name="supply"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={"change"}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography component="legend">Disabled</Typography>
                <Rating name="disabled" value={"2"} disabled />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, color: theme.palette.secondary.light }}
            >
              Add you product
            </Button>
            <Grid container justifyContent="flex-start" mb="20px">
              <Button
                sx={{ color: theme.palette.secondary[500], marginTop: "15px" }}
                variant="outlined"
                startIcon={<ArrowBackOutlinedIcon />}
                href="/products"
              >
                Go back
              </Button>
            </Grid>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default AddProduct;
