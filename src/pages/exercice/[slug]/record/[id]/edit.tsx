import { Container } from "@mui/material";
import { useRouter } from "next/router";
import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "src/features/components/Header";
import Form from "src/features/records/components/Form";
import {
  selectExercice,
  updateExercice,
} from "src/features/store/exercisesSlice";
import { selectRecord, updateRecord } from "src/features/store/recordsSlice";
import { selectSession, updateSession } from "src/features/store/sessionsSlice";

const EditPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const id = router.query.id as string;

  const record = useSelector(selectRecord(id));

  const handleSubmit = (payload: Sheets.RecordFormDTO) => {
    dispatch(updateRecord({ id, form: payload }));
    router.back();
  };

  return (
    <div className="container">
      <Container maxWidth="sm">
        <Header back>Editer un record</Header>
        <Form onSubmit={handleSubmit} record={record} />
      </Container>
    </div>
  );
};

export default EditPage;
