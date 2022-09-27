import { useRouter } from "next/router";
import React from "react";
import { useSelector } from "react-redux";
import Header from "src/features/components/Header";
import { selectSession } from "src/features/store/sessionsSlice";

const sessionPage = () => {
  const router = useRouter();
  const { id } = router.query;

  // @ts-ignore
  const session = useSelector(selectSession(id));

  if (!session) {
    return <></>;
  }

  const createdAtDate = new Date(session.createdAt);

  return (
    <div className="container">
      <Header back>Session du {createdAtDate.toLocaleDateString()}</Header>

      <h2 className="mb-1">Description</h2>
      <p className="mb-2">{session.description}</p>

      {/* TODO flèche retour dans header plutôt */}
    </div>
  );
};

export default sessionPage;
