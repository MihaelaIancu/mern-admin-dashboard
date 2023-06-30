import React, { useState } from "react";
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
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useGetProductsQuery } from "state/api";

const AddProduct = () => {
  const theme = useTheme();
  const isNonMobile = useMediaQuery("(min-width: 700px)");
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: 0,
    rating: 0,
    category: "",
    supply: 0,
  });

  const { refetch } = useGetProductsQuery();

  const handleChange = (e) => {
    setProduct({...product, [e.target.name]: e.target.value });
  };

  const sendRequest = async () => {
    const res = await axios
      .post("http://localhost:5001/client/addProduct", {
        name: product.name,
        description: product.description,
        price: product.price,
        rating: 0,
        category: product.category,
        supply: product.supply,
      })
      .catch((err) => console.log(err));

    const data = await res.data;

    return data;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setProduct({
      name: "",
      description: "",
      price: 0,
      rating: 0,
      category: "",
      supply: 0,
    });

    sendRequest()
      .then(() => refetch())
      .then(() => navigate("/products"));
  };

  const handleClick = () => {
  navigate("/products");
  }

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
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  value={product.name}
                  autoComplete="off"
                  name="name"
                  required
                  fullWidth
                  id="name"
                  label="Product Name"
                  autoFocus
                  onChange={handleChange}
                />
                <FormHelperText>Required</FormHelperText>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl required sx={{ width: "100%" }}>
                  <InputLabel id="category">Category</InputLabel>
                  <Select
                    labelId="category"
                    name="category"
                    id="category"
                    value={product.category}
                    label="Category *"
                    onChange={handleChange}
                  >
                    <MenuItem value="default">
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
                  value={product.description}
                  name="description"
                  label="Description"
                  type="text"
                  id="description"
                  autoComplete="off"
                  onChange={handleChange}
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
                  value={product.price}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={handleChange}
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
                  value={product.supply}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography component="legend">Disabled</Typography>
                <Rating name="disabled" value={product.rating} disabled />
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
                onClick={handleClick}
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
