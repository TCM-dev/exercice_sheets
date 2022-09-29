import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectExercice } from "src/features/store/exercisesSlice";
import { selectRecords } from "src/features/store/recordsSlice";
import Link from "next/link";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import Header from "src/features/components/Header";
import { selectSessions } from "src/features/store/sessionsSlice";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Fab,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  SwipeableDrawer,
} from "@mui/material";
import { NextLinkComposed } from "src/features/components/NextLinkComposed";
import { Add, Edit } from "@mui/icons-material";
import { Container } from "@mui/system";
import Record from "src/features/records/components/Record";
import Session from "src/features/sessions/components/Session";

// const Record: React.FC<Record> = ({
//   id,
//   exerciceSlug: slug,
//   createdAt,
//   weight,
//   amount,
// }) => {
//   const createdAtDate = new Date(createdAt);
//   return (
//     <Link href={`/exercice/${slug}/record/${id}`}>
//       <a className="row">
//         <div className="flex items-center justify-between gap-2 mb-2">
//           <p className="description">{createdAtDate.toLocaleDateString()}</p>
//         </div>
//         <p className="text-gray-100">
//           {weight}kg x {amount}
//         </p>
//         {/* <p className="description inline-block">{description}</p> */}
//       </a>
//     </Link>
//   );
// };

// const Session: React.FC<Session> = ({
//   id,
//   exerciceSlug: slug,
//   createdAt,
//   description,
// }) => {
//   const createdAtDate = new Date(createdAt);
//   return (
//     <Link href={`/exercice/${slug}/session/${id}`}>
//       <a className="row">
//         <div className="flex items-center justify-between gap-2 mb-2">
//           <p className="text-sm text-gray-300">
//             Session du {createdAtDate.toLocaleDateString()}
//           </p>
//         </div>
//       </a>
//     </Link>
//   );
// };

const ExercicePage = () => {
  const router = useRouter();
  const slug = router.query.slug as string;

  // @ts-ignore
  const exercice = useSelector(selectExercice(slug));
  const records = useSelector(selectRecords(slug));
  const sessions = useSelector(selectSessions(slug));

  useEffect(() => {
    console.log(exercice);
  }, [exercice]);

  if (!exercice) {
    return <></>;
  }

  return (
    <div className="container">
      <Container>
        <Header back>{exercice.name}</Header>

        <h1>{exercice.name}</h1>
        <p>{exercice.description}</p>

        {/* Records */}
        <List component="nav">
          <ListSubheader disableGutters>Records</ListSubheader>
          {records.map((record, index) => (
            <Record
              key={record.id}
              {...record}
              divider={index !== records.length - 1}
            />
          ))}
          <ListItem disablePadding>
            <ListItemButton
              component={NextLinkComposed}
              to={`/exercice/${slug}/record/add`}
            >
              <ListItemIcon>
                <Add />
              </ListItemIcon>
              <ListItemText primary="Ajouter un record" />
            </ListItemButton>
          </ListItem>
        </List>

        {/* Sessions */}
        <List component="nav">
          <ListSubheader disableGutters>Sessions</ListSubheader>
          {sessions.map((session, index) => (
            <Session
              key={session.id}
              {...session}
              divider={index !== sessions.length - 1}
            />
          ))}
          <ListItem disablePadding>
            <ListItemButton
              component={NextLinkComposed}
              to={`/exercice/${slug}/session/add`}
            >
              <ListItemIcon>
                <Add />
              </ListItemIcon>
              <ListItemText primary="Ajouter une session" />
            </ListItemButton>
          </ListItem>
        </List>
      </Container>

      <Fab
        color="secondary"
        component={NextLinkComposed}
        to={`/exercice/${slug}/edit`}
        sx={{ position: "absolute", bottom: 16, right: 16 }}
      >
        <Edit />
      </Fab>
    </div>
  );
};

export default ExercicePage;
