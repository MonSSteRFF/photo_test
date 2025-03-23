import { Button, Container, Stack } from "@mui/material";
import React from "react";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const pages = [
    { href: "/", title: "Home" },
    { href: "/cart", title: "Cart" },
  ];

  const pathname = useLocation().pathname;

  return (
    <Container component={"header"} sx={{ p: 2 }}>
      <Stack direction={"row"} spacing={4}>
        {pages.map((item, index) => (
          <Link key={index} to={item.href}>
            <Button variant={item.href === pathname ? "contained" : "outlined"}>
              {item.title}
            </Button>
          </Link>
        ))}
      </Stack>
    </Container>
  );
};

export default Header;
