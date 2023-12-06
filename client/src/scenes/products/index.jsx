import React, { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Collapse,
  Button,
  Typography,
  Rating,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useGetProductsQuery } from "state/api";
import Header from "components/Header";
import FlexBetween from "components/FlexBetween";
import "./index.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Product = ({
  _id,
  name,
  description,
  price,
  rating,
  category,
  supply,
  stat,
  onDelete,
  onEdit,
}) => {
  const theme = useTheme();
  const [isExpanded, setIsExpanded] = useState(false);

  const deleteProduct = () => {
    onDelete(_id);
  };

  const handleClickEdit = () => {
    onEdit(_id);
  };

  return (
    <Card
      sx={{
        backgroundImage: "none",
        backgroundColor: theme.palette.background.alt,
        borderRadius: "0.55rem",
      }}
    >
      <CardContent>
        <Typography
          sx={{ fontSize: 14 }}
          color={theme.palette.secondary[700]}
          gutterBottom
        >
          {category}
        </Typography>
        <Typography variant="h5" component="div">
          {name}
        </Typography>
        <Typography sx={{ mb: "1.5rem" }} color={theme.palette.secondary[400]}>
          ${Number(price).toFixed(2)}
        </Typography>
        <Rating value={rating} readOnly />
        <Typography variant="body2">{description}</Typography>
      </CardContent>
      <CardActions>
        <Button
          variant="primary"
          size="small"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          See more
        </Button>
      </CardActions>
      <Collapse
        in={isExpanded}
        timeout="auto"
        unmountOnExit
        sx={{ color: theme.palette.neutral[300] }}
      >
        <CardContent className="card-content-container">
          <Box>
            <Typography>id: {_id}</Typography>
            <Typography>Supply Left: {supply}</Typography>
            <Button
              sx={{ color: theme.palette.secondary[500], marginTop: "15px" }}
              variant="outlined"
              startIcon={<DeleteIcon />}
              onClick={deleteProduct}
            >
              Delete
            </Button>
            <Button
              sx={{
                color: theme.palette.secondary[100],
                marginTop: "15px",
                marginLeft: "15px",
              }}
              variant="outlined"
              startIcon={<EditIcon />}
              onClick={(data) => handleClickEdit(data.id)}
            >
              Edit
            </Button>
          </Box>
          <Box className="product-image">
            <img
              src="https://unsplash.com/photos/g5f0BJq-FRs/download?ixid=M3wxMjA3fDB8MXxhbGx8fHx8fHx8fHwxNjg3ODIxNDM5fA&force=true&w=640"
              alt="product-preview"
              width="100px"
            />
          </Box>
        </CardContent>
      </Collapse>
    </Card>
  );
};

const Products = () => {
  const { data, isLoading } = useGetProductsQuery();
  const isNonMobile = useMediaQuery("(min-width: 1000px)");
  const theme = useTheme();
  const [products, setNewProducts] = useState([]);
  const [isDeleting, setIsDeleting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (data) {
      const sortedProducts = data.slice().sort((a, b) => {
        if (a.category < b.category) return -1;
        if (a.category > b.category) return 1;
        return 0;
      });
      setNewProducts(sortedProducts);
    }
  }, [data]);

  const handleDelete = async (id) => {
    try {
      setIsDeleting(true);
      const response = await axios.delete(
        `https://mern-admin-server.onrender.com/client/products/${id}`
      );
      if (response.status === 200) {
        const newProducts = products.filter((elem) => elem._id !== id);
        setNewProducts(newProducts);
      } else {
        console.log("Could not delete the product");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleClickAdd = () => {
    navigate("/addProduct");
  };

  const handleEdit = (id) => {
    navigate(`/editProduct/${id}`);
  };

  return (
    <Box m="1.5rem 2.5rem">
      <FlexBetween>
        <Header title="PRODUCTS" subtitle="See your list of products" />
        <Button
          sx={{
            backgroundColor: theme.palette.secondary.light,
            color: theme.palette.background.alt,
            fontSize: "14px",
            fontWeight: "bold",
            padding: "10px 20px",
          }}
          onClick={handleClickAdd}
          startIcon={<AddCircleIcon />}
        >
          Add a new product
        </Button>
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
          {products.map(
            ({
              _id,
              name,
              description,
              price,
              rating,
              category,
              supply,
              stat,
            }) => (
              <Product
                key={_id}
                _id={_id}
                name={name}
                description={description}
                price={price}
                rating={rating}
                category={category}
                supply={supply}
                stat={stat}
                onDelete={handleDelete}
                onEdit={handleEdit}
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

export default Products;
