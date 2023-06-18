import React, { useState, useEffect } from "react";
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
import { useGetProductsQuery } from "state/api";
import { useParams } from "react-router-dom";

const EditProduct = () => {
  const { data, isLoading } = useGetProductsQuery();
  const params = useParams();
  const theme = useTheme();
  const isNonMobile = useMediaQuery("(min-width: 700px)");
  const product = data?.find((elem) => elem._id === params.id);

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [supply, setSupply] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [rating, setRating] = useState("");

  useEffect(() => {
    if (product) {
      setName(product.name);
      setCategory(product.category);
      setSupply(product.supply);
      setPrice(product.price);
      setRating(product.rating);
      setDescription(product.description);
    }
  }, [product]);

  if (isLoading) {
    return <Box sx={{ m: "15px" }}>Loading...</Box>;
  }

  return (
    <Box m="1.5rem 3.5rem">
      <FlexBetween>
        <Header
          title="Edit your product details"
          subtitle={`Product with ID: ${params.id}`}
        />
      </FlexBetween>
      {product ? (
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
                    value={name}
                    autoComplete="off"
                    name="name"
                    type="text"
                    required
                    fullWidth
                    id="name"
                    label="Product Name"
                    autoFocus
                    onChange={(e) => setName(e.target.value)}
                  />
                  <FormHelperText>Required</FormHelperText>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl required sx={{ width: "100%" }}>
                    <InputLabel id="category">Category</InputLabel>
                    <Select
                      labelId="category"
                      id="category"
                      value={category}
                      type="text"
                      label="Category *"
                      onChange={(e) => setCategory(e.target.value)}
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
                    value={description}
                    name="description"
                    label="Description"
                    type="text"
                    id="description"
                    autoComplete="off"
                    onChange={(e) => setDescription(e.target.value)}
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
                    value={Number(price).toFixed(2)}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    onChange={(e) =>
                      setPrice(Number(e.target.value)).toFixed(2)
                    }
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
                    value={supply}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    onChange={(e) => setSupply(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography component="legend">Disabled</Typography>
                  <Rating name="disabled" value={rating} disabled />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, color: theme.palette.secondary.light }}
                onSubmit={(e) => {
                  e.preventDefault();
                }}
              >
                Save your edits
              </Button>
              <Grid container justifyContent="flex-start" mb="20px">
                <Button
                  sx={{
                    color: theme.palette.secondary[500],
                    marginTop: "15px",
                  }}
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
      ) : (
        <>Product not found...</>
      )}
    </Box>
  );
};

export default EditProduct;
