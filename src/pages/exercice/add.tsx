import { Container } from "@mui/system";
import { useRouter } from "next/router";
import React, { FormEvent, useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import Button from "src/features/components/Button";
import Header from "src/features/components/Header";
import Form from "src/features/exercices/components/Form";
import { pushExercice } from "src/features/store/exercisesSlice";

const AddPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleSubmit = (payload: Sheets.ExerciceFormDTO) => {
    dispatch(pushExercice(payload));
    router.back();
  };

  return (
    <div className="container">
      <Container maxWidth="sm">
        <Header back>Ajouter un exercice</Header>
        <Form onSubmit={handleSubmit} />
      </Container>
    </div>
  );
};

export default AddPage;
