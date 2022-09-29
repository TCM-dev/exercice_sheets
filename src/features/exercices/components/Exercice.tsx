import { Delete, Edit } from "@mui/icons-material";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  SwipeableDrawer,
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { NextLinkComposed } from "src/features/components/NextLinkComposed";
import { removeExercice } from "src/features/store/exercisesSlice";
import { useLongPress } from "use-long-press";

const Exercice: React.FC<Sheets.Exercice> = ({ name, slug, description }) => {
  const dispatch = useDispatch();
  const [opendrawer, setopendrawer] = useState(false);
  const [opendialog, setopendialog] = useState(false);

  const openDrawer = () => setopendrawer(true);
  const closeDrawer = () => setopendrawer(false);

  const openDialog = () => setopendialog(true);
  const closeDialog = () => setopendialog(false);

  const bind = useLongPress(() => {
    console.log("Long pressed!");
    openDrawer();
  });

  const remove = () => {
    console.log("remove");

    dispatch(removeExercice(slug));

    closeDialog();
    closeDrawer();
  };

  return (
    <>
      <ListItemButton
        {...bind()}
        component={NextLinkComposed}
        to={`/exercice/${slug}`}
        disableGutters
      >
        <ListItemText primary={name} secondary={description} />
      </ListItemButton>

      {/* Alert dialog */}
      <Dialog open={opendialog} onClose={closeDialog}>
        <DialogTitle>Supprimer cet exercice ?</DialogTitle>
        <DialogActions>
          <Button onClick={remove} color="error">
            Supprimer
          </Button>
          <Button onClick={closeDialog} autoFocus>
            Annuler
          </Button>
        </DialogActions>
      </Dialog>

      {/* Drawer */}
      <SwipeableDrawer
        anchor="bottom"
        open={opendrawer}
        onClose={() => setopendrawer(false)}
        onOpen={() => setopendrawer(true)}
      >
        <Box role="presentation">
          <List>
            <ListItem disablePadding>
              <ListItemButton
                component={NextLinkComposed}
                to={`/exercice/${slug}/edit`}
              >
                <ListItemIcon>
                  <Edit />
                </ListItemIcon>
                <ListItemText primary="Editer" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={openDialog}>
                <ListItemIcon>
                  <Delete />
                </ListItemIcon>
                <ListItemText primary="Supprimer" />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </SwipeableDrawer>
    </>
  );
};

export default Exercice;
