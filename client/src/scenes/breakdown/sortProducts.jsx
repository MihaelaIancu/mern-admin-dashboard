import React, { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Rating,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { useGetProductsQuery } from "state/api";
import Header from "components/Header";
import FlexBetween from "components/FlexBetween";
import { useParams } from "react-router-dom";

const Product = ({
  _id,
  name,
  description,
  price,
  rating,
  category,
  supply,
}) => {
  const theme = useTheme();
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card
      sx={{
        backgroundImage: "none",
        backgroundColor: theme.palette.background.alt,
        borderRadius: "0.55rem",
      }}
    >
      <CardContent>
        <Typography variant="h5" component="div">
          {name}
        </Typography>
        <Typography sx={{ mb: "1.5rem" }} color={theme.palette.secondary[400]}>
          ${Number(price).toFixed(2)}
        </Typography>
        <Rating value={rating} readOnly />
        <Typography variant="body2">{description}</Typography>
        <Typography>Supply Left: {supply}</Typography>
      </CardContent>
    </Card>
  );
};

const SortedProducts = () => {
  const { data, isLoading } = useGetProductsQuery();
  const isNonMobile = useMediaQuery("(min-width: 1000px)");
  const theme = useTheme();
  const [products, setProducts] = useState([]);
  const params = useParams();
  const productsCategory = data?.find(
    (elem) => elem.category === params.category
  );

  useEffect(() => {
    const filteredProducts = data.filter(
      (product) => product.category === params.category
    );

    const sortedProducts = filteredProducts.sort((a, b) => b.rating - a.rating);
    setProducts(sortedProducts);
  }, [data, params.category]);

  return (
    <Box m="1.5rem 2.5rem">
      <FlexBetween>
        <Header
          title={`Best 5 products from ${productsCategory.category}`}
          subtitle="See your list of products sorted by rating"
        />
      </FlexBetween>
      {data || !isLoading ? (
        <Box
          mt="20px"
          display="grid"
          gridTemplateColumns="repeat(4, minmax(0, 1fr))"
          justifyContent="space-between"
          rowGap="20px"
          columnGap="1.33%"
          sx={{
            "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
          }}
        >
          {products
            .slice(0, 5)
            .map(
              ({ _id, name, description, price, rating, category, supply }) => (
                <Product
                  key={_id}
                  _id={_id}
                  name={name}
                  description={description}
                  price={price}
                  rating={rating}
                  category={category}
                  supply={supply}
                />
              )
            )}
        </Box>
      ) : (
        <>Loading...</>
      )}
    </Box>
  );
};

export default SortedProducts;
