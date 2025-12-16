"use client";

import React, { useState, useRef } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Popper,
  Paper,
  List,
  ListItem,
  ListItemText,
  Box,
  ClickAwayListener,
} from "@mui/material";
import { KeyboardArrowDown } from "@mui/icons-material";

type MenuId = "surfboards" | "hardware" | null;

interface MenuData {
  id: MenuId;
  label: string;
  categories: Record<string, string[]>;
}

const menus: MenuData[] = [
  {
    id: "surfboards",
    label: "Surfboards",
    categories: {
      Chargers: ["Event Horizon", "Quasar", "Gamma Ray Burst", "Super Nova"],
      Performers: ["Eclipse", "Boson", "Dark Matter", "Singularity"],
      "Daily Drivers": ["Worm Hole", "Quark", "Electron", "Interstellar"],
      Longboards: [
        "Cosmic Microwave Background",
        "Spiral Galaxy",
        "Terraform",
        "Neutrino",
      ],
    },
  },
  {
    id: "hardware",
    label: "Hardware",
    categories: {
      Grips: ["Graviton", "Nebula", "Asteroid", "Meteor", "Crator", "Flux"],
      Fins: [
        "Atoms",
        "Nucleus",
        "Ionosphere",
        "Plasma",
        "Flare",
        "Corona",
        "Aurora",
        "Zenith",
        "Apex",
        "Vector",
        "Comet",
        "Photon",
      ],
      Leashes: ["Equinox", "Satellite", "Constellation", "Orbit"],
    },
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
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Multiverse Surfboards
        </Typography>

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
                      ([category, items]) => (
                        <Box key={category} sx={{ minWidth: 180 }}>
                          <Typography
                            variant="subtitle1"
                            fontWeight="bold"
                            gutterBottom
                          >
                            {category}
                          </Typography>
                          <List dense disablePadding>
                            {items.map((item) => (
                              <ListItem
                                button
                                key={item}
                                onClick={handleCloseMenu}
                                sx={{ pl: 0 }}
                              >
                                <ListItemText primary={item} />
                              </ListItem>
                            ))}
                          </List>
                        </Box>
                      )
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
