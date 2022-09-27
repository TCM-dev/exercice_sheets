import { TextField } from "@mui/material";
import { useRouter } from "next/router";
import React, { FormEvent, useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import Button from "src/features/components/Button";
import Header from "src/features/components/Header";
import { push } from "src/features/store/sessionsSlice";

const AddPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { slug: exerciceSlug } = router.query;
  const [description, setdescription] = useState("");

  const redirectToHome = useCallback(() => router.back(), []);

  const addRecord = useCallback(
    // @ts-ignore
    () => dispatch(push({ description, exerciceSlug })),
    [description, exerciceSlug]
  );

  const handleSubmit = (formEvent: FormEvent) => {
    formEvent?.preventDefault();
    addRecord();
    redirectToHome();
  };

  return (
    <div className="container">
      <Header back>Ajouter une session</Header>

      <form className="form" onSubmit={handleSubmit}>
        <label htmlFor="description">Description de la session</label>
        <textarea
          id="description"
          name="description"
          className="form-input rounded bg-neutral-800"
          value={description}
          onChange={(e) => setdescription(e.target.value)}
        ></textarea>

        <Button>Ajouter</Button>
        <Button href="/">Annuler</Button>
      </form>
    </div>
  );
};

export default AddPage;
