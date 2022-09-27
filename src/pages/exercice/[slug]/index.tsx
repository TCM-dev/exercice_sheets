import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Button from "src/features/components/Button";
import { selectExercice } from "src/features/store/exercisesSlice";
import { selectRecords } from "src/features/store/recordsSlice";
import type { Record } from "src/features/store/recordsSlice";
import Link from "next/link";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import Header from "src/features/components/Header";
import { selectSessions, Session } from "src/features/store/sessionsSlice";

const Record: React.FC<Record> = ({
  id,
  exerciceSlug: slug,
  createdAt,
  weight,
  amount,
}) => {
  const createdAtDate = new Date(createdAt);
  return (
    <Link href={`/exercice/${slug}/record/${id}`}>
      <a className="row">
        <div className="flex items-center justify-between gap-2 mb-2">
          <p className="description">{createdAtDate.toLocaleDateString()}</p>
        </div>
        <p className="text-gray-100">
          {weight}kg x {amount}
        </p>
        {/* <p className="description inline-block">{description}</p> */}
      </a>
    </Link>
  );
};

const Session: React.FC<Session> = ({
  id,
  exerciceSlug: slug,
  createdAt,
  description,
}) => {
  const createdAtDate = new Date(createdAt);
  return (
    <Link href={`/exercice/${slug}/session/${id}`}>
      <a className="row">
        <div className="flex items-center justify-between gap-2 mb-2">
          <p className="text-sm text-gray-300">
            Session du {createdAtDate.toLocaleDateString()}
          </p>
        </div>
      </a>
    </Link>
  );
};

const ExercicePage = () => {
  const router = useRouter();
  const { slug } = router.query;

  // @ts-ignore
  const exercice = useSelector(selectExercice(slug));
  const records = useSelector(selectRecords(exercice?.slug || ""));
  const sessions = useSelector(selectSessions(exercice?.slug || ""));

  useEffect(() => {
    console.log(exercice);
  }, [exercice]);

  if (!exercice) {
    return <></>;
  }

  return (
    <div className="container">
      <Header back>{exercice.name}</Header>

      <Button disabled>Supprimer</Button>

      <h2 className="mb-1">Description</h2>
      <p className="mb-2">{exercice.description}</p>

      <h2 className="mb-1">Records</h2>
      <div className="mb-4">
        {records.map((record) => (
          <Record key={record.createdAt} {...record} />
        ))}
      </div>

      <Button href={`/exercice/${exercice.slug}/record/add`}>
        Ajouter un record
      </Button>

      <h2 className="mb-1">Sessions</h2>
      <div className="mb-4">
        {sessions.map((session) => (
          <Session key={session.createdAt} {...session} />
        ))}
      </div>
      <Button href={`/exercice/${exercice.slug}/session/add`}>
        Ajouter une session
      </Button>

      {/* TODO flèche retour dans header plutôt */}
    </div>
  );
};

export default ExercicePage;
