import { Container, TextField } from "@mui/material";
import { useRouter } from "next/router";
import React, { FormEvent, useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import Button from "src/features/components/Button";
import Header from "src/features/components/Header";
import Form from "src/features/records/components/Form";
import { pushRecord } from "src/features/store/recordsSlice";

const AddPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const slug = router.query.slug as string;

  const handleSubmit = (payload: Sheets.RecordFormDTO) => {
    console.log(payload);
    dispatch(pushRecord({ ...payload, exerciceSlug: slug }));
    router.back();
  };

  return (
    <div className="container">
      <Container maxWidth="sm">
        <Header back>Ajouter un record</Header>
        <Form onSubmit={handleSubmit} />
      </Container>
    </div>
  );
};

export default AddPage;
