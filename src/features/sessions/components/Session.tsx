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
import { removeSession } from "src/features/store/sessionsSlice";
// import { removeSession } from "src/features/store/exercisesSlice";
import { useLongPress } from "use-long-press";

interface SessionProps extends Sheets.Session {
  divider?: boolean;
}
const Session: React.FC<SessionProps> = ({
  content,
  exerciceSlug,
  id,
  createdAt,
  divider,
}) => {
  const dispatch = useDispatch();
  const [opendrawer, setopendrawer] = useState(false);
  const [opendialog, setopendialog] = useState(false);

  const openDrawer = () => setopendrawer(true);
  const closeDrawer = () => setopendrawer(false);

  const openDialog = () => setopendialog(true);
  const closeDialog = () => setopendialog(false);

  const createdAtDate = new Date(createdAt);

  const bind = useLongPress(() => {
    console.log("Long pressed!");
    openDrawer();
  });

  const remove = () => {
    console.log("remove");

    dispatch(removeSession(id));

    closeDialog();
    closeDrawer();
  };

  return (
    <>
      <ListItemButton
        {...bind()}
        divider={divider}
        component={NextLinkComposed}
        to={`/exercice/${exerciceSlug}/session/${id}`}
        disableGutters
      >
        <ListItemText
          primary={`Session du ${createdAtDate.toLocaleDateString()}`}
        />
      </ListItemButton>

      {/* Alert dialog */}
      <Dialog open={opendialog} onClose={closeDialog}>
        <DialogTitle>Supprimer cette session ?</DialogTitle>
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
        onClose={closeDrawer}
        onOpen={openDrawer}
      >
        <Box role="presentation">
          <List>
            <ListItem disablePadding>
              <ListItemButton
                component={NextLinkComposed}
                to={`/exercice/${exerciceSlug}/session/${id}/edit`}
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

export default Session;
