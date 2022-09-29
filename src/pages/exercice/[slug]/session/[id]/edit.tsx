import { Container } from "@mui/material";
import { useRouter } from "next/router";
import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "src/features/components/Header";
import Form from "src/features/sessions/components/Form";
import {
  selectExercice,
  updateExercice,
} from "src/features/store/exercisesSlice";
import { selectSession, updateSession } from "src/features/store/sessionsSlice";

const EditPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const id = router.query.id as string;

  const session = useSelector(selectSession(id));

  const handleSubmit = (payload: Sheets.SessionFormDTO) => {
    dispatch(updateSession({ id, form: payload }));
    router.back();
  };

  return (
    <div className="container">
      <Container maxWidth="sm">
        <Header back>Editer une session</Header>
        <Form onSubmit={handleSubmit} session={session} />
      </Container>
    </div>
  );
};

export default EditPage;
