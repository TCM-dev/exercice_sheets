import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Button from "src/features/components/Button";
import { selectExercice } from "src/features/store/exercisesSlice";
import { selectRecord, selectRecords } from "src/features/store/recordsSlice";
import type { Record } from "src/features/store/recordsSlice";
import Link from "next/link";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import Header from "src/features/components/Header";
import { selectSessions, Session } from "src/features/store/sessionsSlice";

const recordPage = () => {
  const router = useRouter();
  const { id } = router.query;

  // @ts-ignore
  const record = useSelector(selectRecord(id));

  if (!record) {
    return <></>;
  }

  return (
    <div className="container">
      <Header back>{/*  */}</Header>

      <h2 className="mb-1">Record</h2>
      <p className="mb-2">
        {record.weight}kg x {record.amount}
      </p>

      <h2 className="mb-1">Description</h2>
      {record.description ? (
        <p className="mb-2">{record.description}</p>
      ) : (
        <p className="mb-2 text-gray-500">Pas de description</p>
      )}

      {/* TODO flèche retour dans header plutôt */}
    </div>
  );
};

export default recordPage;
