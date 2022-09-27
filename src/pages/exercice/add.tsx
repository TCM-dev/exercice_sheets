import { useRouter } from "next/router";
import React, { FormEvent, useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import Button from "src/features/components/Button";
import Header from "src/features/components/Header";
import { push } from "src/features/store/exercisesSlice";

const AddPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [name, setname] = useState("");
  const [description, setdescription] = useState("");

  const redirectToHome = useCallback(() => router.push("/"), []);

  const addExercice = useCallback(
    () => dispatch(push({ name, description })),
    [name, description]
  );

  const handleSubmit = (formEvent: FormEvent) => {
    formEvent?.preventDefault();
    addExercice();
    redirectToHome();
  };

  return (
    <div className="container">
      {/* <h1>Ajouter un exercice</h1> */}
      <Header back>Ajouter un exercice</Header>

      <form className="form" onSubmit={handleSubmit}>
        <label htmlFor="name">Nom*</label>
        <input
          className="form-input rounded bg-neutral-800"
          type="text"
          name="name"
          id="name"
          value={name}
          onChange={(e) => setname(e.target.value)}
          required
        />

        <label htmlFor="description">Description</label>
        {/* <input type="text"  /> */}
        <textarea
          className="form-input rounded bg-neutral-800"
          name="description"
          id="description"
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
