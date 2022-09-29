import { Container } from "@mui/material";
import { useRouter } from "next/router";
import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "src/features/components/Header";
import Form from "src/features/exercices/components/Form";
import {
  selectExercice,
  updateExercice,
} from "src/features/store/exercisesSlice";

const EditPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const slug = router.query.slug as string;

  const exercice = useSelector(selectExercice(slug));

  const handleSubmit = (payload: Sheets.ExerciceFormDTO) => {
    dispatch(updateExercice({ slug, form: payload }));
    router.back();
  };

  return (
    <div className="container">
      <Container maxWidth="sm">
        <Header back>Editer un exercice</Header>
        <Form onSubmit={handleSubmit} exercice={exercice} />
      </Container>
    </div>
  );
};

export default EditPage;
