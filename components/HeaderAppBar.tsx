"use client";

import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Menu,
  List,
  ListItem,
  ListItemText,
  Box,
} from "@mui/material";

const surfboardCategories: Record<string, string[]> = {
  Chargers: ["Event Horizon", "Quasar", "Gamma Ray Burst", "Super Nova"],
  Performers: ["Eclipse", "Boson", "Dark Matter", "Singularity"],
  "Daily Drivers": ["Worm Hole", "Quark", "Electron", "Interstellar"],
  Longboards: [
    "Cosmic Microwave Background",
    "Spiral Galaxy",
    "Terraform",
    "Neutrino",
  ],
};

export default function HeaderAppBar() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleOpenMainMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  // close menu if mouse leaves AppBar area as well
  const handleMouseLeaveBar = () => {
    if (anchorEl) {
      handleCloseMenu();
    }
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <AppBar
      position="static"
      color="default"
      elevation={1}
      onMouseLeave={handleMouseLeaveBar}
    >
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Multiverse Surfboards
        </Typography>

        {/* Surfboards Menu */}
        <Button
          onMouseEnter={handleOpenMainMenu}
          color="inherit"
          aria-controls={open ? "surfboards-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
        >
          Surfboards
        </Button>
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleCloseMenu}
          anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
          transformOrigin={{ horizontal: "left", vertical: "top" }}
          MenuListProps={{ onMouseLeave: handleCloseMenu }}
          slotProps={{
            paper: {
              sx: {
                px: 2,
                py: 2,
                width: "100vw",
                maxWidth: "100vw",
                left: "0 !important",
                right: "0 !important",
                boxShadow: "none",
              },
            },
          }}
        >
          <Box sx={{ display: "flex", gap: 4 }}>
            {Object.entries(surfboardCategories).map(([category, boards]) => (
              <Box key={category} sx={{ minWidth: 180 }}>
                <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                  {category}
                </Typography>
                <List dense disablePadding>
                  {boards.map((board) => (
                    <ListItem
                      button
                      key={board}
                      onClick={handleCloseMenu}
                      sx={{ pl: 0 }}
                    >
                      <ListItemText primary={board} />
                    </ListItem>
                  ))}
                </List>
              </Box>
            ))}
          </Box>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}
