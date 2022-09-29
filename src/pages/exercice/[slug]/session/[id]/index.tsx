import { Edit } from "@mui/icons-material";
import { Container, Fab } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";
import { useSelector } from "react-redux";
import Header from "src/features/components/Header";
import { NextLinkComposed } from "src/features/components/NextLinkComposed";
import { selectSession } from "src/features/store/sessionsSlice";

const SessionPage = () => {
  const router = useRouter();
  const id = router.query.id as string;

  const session = useSelector(selectSession(id));

  if (!session) {
    return <></>;
  }

  const createdAtDate = new Date(session.createdAt);

  return (
    <div className="container">
      <Container>
        <Header back>Session du {createdAtDate.toLocaleDateString()}</Header>

        <pre>{session.content}</pre>

        <Fab
          color="secondary"
          component={NextLinkComposed}
          to={`/exercice/${session.exerciceSlug}/session/${id}/edit`}
          sx={{ position: "absolute", bottom: 16, right: 16 }}
        >
          <Edit />
        </Fab>
      </Container>
    </div>
  );
};

export default SessionPage;
