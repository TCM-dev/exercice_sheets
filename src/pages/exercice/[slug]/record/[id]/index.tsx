import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Button from "src/features/components/Button";
import { selectExercice } from "src/features/store/exercisesSlice";
import { selectRecord, selectRecords } from "src/features/store/recordsSlice";
import Link from "next/link";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import Header from "src/features/components/Header";
import { NextLinkComposed } from "src/features/components/NextLinkComposed";
import { Edit } from "@mui/icons-material";
import { Fab } from "@mui/material";
import session from "redux-persist/es/storage/session";
import { Container } from "@mui/system";

const RecordPage = () => {
  const router = useRouter();
  const id = router.query.id as string;

  const record = useSelector(selectRecord(id));

  if (!record) {
    return <></>;
  }

  return (
    <div className="container">
      <Container>
        <Header back>Record</Header>

        <h1>
          {record.amount} * {record.weight}kg
        </h1>
        <p>{record.description}</p>

        <Fab
          color="secondary"
          component={NextLinkComposed}
          to={`/exercice/${record.exerciceSlug}/record/${id}/edit`}
          sx={{ position: "absolute", bottom: 16, right: 16 }}
        >
          <Edit />
        </Fab>
      </Container>
    </div>
  );
};

export default RecordPage;
