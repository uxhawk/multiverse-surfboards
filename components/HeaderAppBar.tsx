"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Popper,
  Paper,
  List,
  ListItemButton,
  ListItemText,
  Box,
  ClickAwayListener,
} from "@mui/material";
import { KeyboardArrowDown } from "@mui/icons-material";
import { menuData, toSlug } from "../lib/data";

type MenuId = "surfboards" | "hardware" | null;

interface MenuDataType {
  id: MenuId;
  label: string;
  categories: Record<string, string[]>;
}

// Transform menuData into the format needed for the header
const menus: MenuDataType[] = [
  {
    id: "surfboards",
    label: menuData.surfboards.label,
    categories: menuData.surfboards.categories as unknown as Record<
      string,
      string[]
    >,
  },
  {
    id: "hardware",
    label: menuData.hardware.label,
    categories: menuData.hardware.categories as unknown as Record<
      string,
      string[]
    >,
  },
];

export default function HeaderAppBar() {
  const [activeMenu, setActiveMenu] = useState<MenuId>(null);
  const navRef = useRef<HTMLDivElement>(null);

  const handleOpenMenu = (menuId: MenuId) => {
    setActiveMenu(menuId);
  };

  const handleCloseMenu = () => {
    setActiveMenu(null);
  };

  const activeMenuData = menus.find((m) => m.id === activeMenu);

  return (
    <AppBar position="static" color="default" elevation={1}>
      <Toolbar>
        <Link
          href="/"
          style={{ textDecoration: "none", color: "inherit", flexGrow: 1 }}
        >
          <Typography variant="h6">Multiverse Surfboards</Typography>
        </Link>

        <ClickAwayListener onClickAway={handleCloseMenu}>
          <Box
            ref={navRef}
            onMouseLeave={handleCloseMenu}
            sx={{ display: "flex" }}
          >
            {menus.map((menu) => (
              <Button
                key={menu.id}
                onMouseEnter={() => handleOpenMenu(menu.id)}
                color="inherit"
                aria-controls={
                  activeMenu === menu.id ? `${menu.id}-menu` : undefined
                }
                aria-haspopup="true"
                aria-expanded={activeMenu === menu.id ? "true" : undefined}
                endIcon={<KeyboardArrowDown />}
              >
                {menu.label}
              </Button>
            ))}

            <Popper
              open={Boolean(activeMenu)}
              anchorEl={navRef.current}
              placement="bottom-start"
              disablePortal
              sx={{
                width: "100vw",
                left: "0 !important",
                right: "0 !important",
                // zIndex: 1300,
              }}
            >
              <Paper
                elevation={0}
                sx={{
                  px: 2,
                  py: 2,
                  width: "100vw",
                  borderRadius: 0,
                }}
                onMouseLeave={handleCloseMenu}
              >
                {activeMenuData && (
                  <Box
                    sx={{ display: "flex", gap: 4, justifyContent: "center" }}
                  >
                    {Object.entries(activeMenuData.categories).map(
                      ([category, items]) => {
                        const categorySlug = toSlug(category);
                        return (
                          <Box key={category} sx={{ minWidth: 180 }}>
                            <Link
                              href={`/${categorySlug}`}
                              onClick={handleCloseMenu}
                              style={{
                                textDecoration: "none",
                                color: "inherit",
                              }}
                            >
                              <Typography
                                variant="subtitle1"
                                fontWeight="bold"
                                gutterBottom
                                sx={{
                                  "&:hover": {
                                    color: "primary.main",
                                  },
                                }}
                              >
                                {category}
                              </Typography>
                            </Link>
                            <List dense disablePadding>
                              {items.map((item) => {
                                const productSlug = toSlug(item);
                                return (
                                  <ListItemButton
                                    key={item}
                                    component={Link}
                                    href={`/${categorySlug}/${productSlug}`}
                                    onClick={handleCloseMenu}
                                    sx={{ pl: 0 }}
                                  >
                                    <ListItemText primary={item} />
                                  </ListItemButton>
                                );
                              })}
                            </List>
                          </Box>
                        );
                      }
                    )}
                  </Box>
                )}
              </Paper>
            </Popper>
          </Box>
        </ClickAwayListener>
      </Toolbar>
    </AppBar>
  );
}
