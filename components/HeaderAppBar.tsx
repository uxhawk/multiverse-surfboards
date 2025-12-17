"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  Popper,
  Paper,
  List,
  ListItemButton,
  ListItemText,
  Box,
  ClickAwayListener,
  Dialog,
  DialogContent,
  Slide,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import {
  FavoriteBorder,
  KeyboardArrowDown,
  ShoppingCartOutlined,
  Menu as MenuIcon,
  Close,
} from "@mui/icons-material";
import { menuData, toSlug } from "../lib/data";

type MenuId = "surfboards" | "hardware" | null;

interface MenuDataType {
  id: MenuId;
  label: string;
  categories: Record<string, string[]>;
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children: React.ReactElement },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

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
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSiteMenuOpen, setIsSiteMenuOpen] = useState(false);
  const [expandedAccordion, setExpandedAccordion] = useState<string | false>(
    false
  );
  const navRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const handleOpenMenu = (menuId: MenuId) => {
    setActiveMenu(menuId);
  };

  const handleCloseMenu = () => {
    setActiveMenu(null);
  };

  const handleWishlistClick = () => {
    setActiveMenu(null);
    router.push("/wish-list");
  };

  const handleCartClick = () => {
    setActiveMenu(null);
    setIsCartOpen(true);
  };

  const handleCloseCartDrawer = () => {
    setIsCartOpen(false);
  };

  const handleViewCart = () => {
    setIsCartOpen(false);
    router.push("/cart");
  };

  const handleOpenSiteMenu = () => {
    setIsSiteMenuOpen(true);
    setExpandedAccordion(false);
  };

  const handleCloseSiteMenu = () => {
    setIsSiteMenuOpen(false);
    setExpandedAccordion(false);
  };

  const activeMenuData = menus.find((m) => m.id === activeMenu);

  return (
    <>
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
              sx={{
                display: { xs: "none", lg: "flex" },
                alignItems: "center",
                gap: 2,
              }}
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

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <IconButton
              aria-label="wish list"
              color="inherit"
              onClick={handleWishlistClick}
            >
              <FavoriteBorder />
            </IconButton>
            <IconButton
              aria-label="shopping cart"
              color="inherit"
              onClick={handleCartClick}
            >
              <ShoppingCartOutlined />
            </IconButton>
            <IconButton
              aria-label="site menu"
              color="inherit"
              onClick={handleOpenSiteMenu}
              sx={{ display: { lg: "none" } }}
            >
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      <Dialog
        fullScreen
        open={isSiteMenuOpen}
        onClose={handleCloseSiteMenu}
        TransitionComponent={Transition}
      >
        <AppBar position="relative" color="default" elevation={0}>
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              Site Menu
            </Typography>
            <IconButton
              edge="end"
              color="inherit"
              onClick={handleCloseSiteMenu}
              aria-label="close site menu"
            >
              <Close />
            </IconButton>
          </Toolbar>
        </AppBar>
        <DialogContent
          sx={{
            py: 4,
            px: { xs: 2, sm: 4 },
            maxWidth: 960,
            mx: "auto",
            width: "100%",
          }}
        >
          {menus.map((menu) => (
            <Box key={menu.id} sx={{ mb: 4 }}>
              <Typography variant="h5" gutterBottom>
                {menu.label}
              </Typography>
              {Object.entries(menu.categories).map(([category, items]) => {
                const categorySlug = toSlug(category);
                const panelId = `${menu.id}-${categorySlug}`;
                return (
                  <Accordion
                    key={category}
                    disableGutters
                    expanded={expandedAccordion === panelId}
                    onChange={(_, isExpanded) =>
                      setExpandedAccordion(isExpanded ? panelId : false)
                    }
                  >
                    <AccordionSummary expandIcon={<KeyboardArrowDown />}>
                      <Typography fontWeight="bold">{category}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <List dense>
                        <ListItemButton
                          component={Link}
                          href={`/${categorySlug}`}
                          onClick={handleCloseSiteMenu}
                          sx={{ pl: 0 }}
                        >
                          <ListItemText primary="View all" />
                        </ListItemButton>
                        {items.map((item) => {
                          const productSlug = toSlug(item);
                          return (
                            <ListItemButton
                              key={item}
                              component={Link}
                              href={`/${categorySlug}/${productSlug}`}
                              onClick={handleCloseSiteMenu}
                              sx={{ pl: 0 }}
                            >
                              <ListItemText primary={item} />
                            </ListItemButton>
                          );
                        })}
                      </List>
                    </AccordionDetails>
                  </Accordion>
                );
              })}
            </Box>
          ))}
        </DialogContent>
      </Dialog>

      <Drawer
        anchor="right"
        open={isCartOpen}
        onClose={handleCloseCartDrawer}
        PaperProps={{ sx: { width: 360 } }}
      >
        <Box
          sx={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            gap: 2,
            px: 2,
            py: 3,
          }}
        >
          <Typography variant="h6">Your cart</Typography>
          <Box sx={{ flexGrow: 1 }}>
            <Typography color="text.secondary">
              Cart preview coming soon.
            </Typography>
          </Box>
          <Button variant="contained" onClick={handleViewCart}>
            View cart
          </Button>
        </Box>
      </Drawer>
    </>
  );
}
