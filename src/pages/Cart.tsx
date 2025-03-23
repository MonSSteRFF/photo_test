import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React from "react";

import { useCartStore } from "../lib/CartContext/CartStore.ts";

const Cart = () => {
  const cartStore = useCartStore();

  const removeFromCart = (itemId: number) => {
    cartStore.removeFromCart(itemId);
    cartStore.calculateAllPrice();
  };

  return (
    <Box>
      <Typography variant={"h5"}>all price: {cartStore.allPrice} $</Typography>

      <Table sx={{ width: "100%", mb: 2 }}>
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Count</TableCell>
            <TableCell>Remove</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {Object.keys(cartStore.cart).map((itemId, index) => {
            const item = cartStore.cart[Number(itemId)]!;

            return (
              <TableRow key={index}>
                <TableCell>{item.title}</TableCell>

                <TableCell>{item.price} $</TableCell>
                <TableCell>{item.count}</TableCell>

                <TableCell>
                  <Button
                    onClick={() => {
                      removeFromCart(item.id);
                    }}
                    variant={"outlined"}
                  >
                    remove
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Box>
  );
};

export default Cart;
