import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import React, { useEffect, useState } from "react";

import { ICartItem } from "../lib/CartContext/Cart.types.ts";
import { useCartStore } from "../lib/CartContext/CartStore.ts";

const Home = () => {
  const cartStore = useCartStore();
  const [search, setSearch] = useState<string>("");
  const [products, setProducts] = useState<ICartItem[]>([]);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((response) => response.json())
      .then((data: ICartItem[]) => {
        setProducts(data);
      });
  }, []);

  const filters = [
    (item: ICartItem) =>
      search.length > 0
        ? item.title.toLowerCase().includes(search.toLowerCase())
        : true,
  ];
  const [filteredProducts, setFilteredProducts] = useState<ICartItem[]>([]);

  const applyFilters = (
    items: ICartItem[],
    filt: ((item: ICartItem) => boolean)[],
  ): ICartItem[] => {
    return items.filter((i) => {
      let include = true;

      filt.forEach((filter) => {
        if (!filter(i) && include) {
          include = false;
        }
      });

      return include;
    });
  };

  const addToCart = (item: ICartItem) => {
    cartStore.addToCart(item);
    cartStore.calculateAllPrice();
  };

  useEffect(() => {
    setFilteredProducts(applyFilters(products, filters));
  }, [products, search]);

  return (
    <>
      <Box sx={{ pb: 2 }}>
        <TextField
          label={"search"}
          onChange={(v) => setSearch(v.target.value)}
          value={search}
          variant="outlined"
        />
      </Box>

      <Grid container spacing={4}>
        {filteredProducts.map((item) => (
          <Grid size={{ xs: 6, md: 3 }} key={item.id}>
            <Card
              variant="outlined"
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <CardContent>
                <Box sx={{ width: "100%", pb: 2 }}>
                  <img
                    src={item.image}
                    alt={item.title}
                    width={"100%"}
                    style={{
                      maxHeight: 200,
                      minHeight: 200,
                      objectFit: "contain",
                    }}
                    loading="lazy"
                  />
                </Box>
                <Typography variant={"subtitle1"}>{item.title}</Typography>
                <Typography variant="h6" component="div">
                  price: {item.price}$
                </Typography>
              </CardContent>

              <CardActions
                sx={{ flexDirection: "column", alignItems: "flex-start" }}
              >
                <Button
                  sx={{ ml: 0 }}
                  variant={"outlined"}
                  onClick={() => {
                    addToCart(item);
                  }}
                >
                  add to cart{" "}
                  {cartStore.cart[item.id] !== undefined &&
                    cartStore.cart[item.id].count}
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default Home;
