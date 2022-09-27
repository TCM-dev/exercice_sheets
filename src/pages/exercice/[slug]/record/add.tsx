import { TextField } from "@mui/material";
import { useRouter } from "next/router";
import React, { FormEvent, useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import Button from "src/features/components/Button";
import Header from "src/features/components/Header";
import { push } from "src/features/store/recordsSlice";

const AddPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { slug: exerciceSlug } = router.query;
  const [name, setname] = useState("");
  const [weight, setweight] = useState(0);
  const [amount, setamount] = useState(0);
  const [description, setdescription] = useState("");

  const redirectToHome = useCallback(() => router.back(), []);

  const addRecord = useCallback(
    // @ts-ignore
    () => dispatch(push({ name, weight, amount, description, exerciceSlug })),
    [name, weight, amount, description, exerciceSlug]
  );

  const handleSubmit = (formEvent: FormEvent) => {
    formEvent?.preventDefault();
    addRecord();
    redirectToHome();
  };

  return (
    <div className="container">
      <Header back>Ajouter un record</Header>

      <form className="form" onSubmit={handleSubmit}>
        <label htmlFor="amount">Nombre de répétition*</label>
        <input
          id="amount"
          type="number"
          className="form-input rounded bg-neutral-800"
          value={amount}
          onChange={(e) => setamount(parseInt(e.target.value))}
          required
        />

        <label htmlFor="weight">Poids*</label>
        <input
          id="weight"
          type="number"
          className="form-input rounded bg-neutral-800"
          value={weight}
          onChange={(e) => setweight(parseInt(e.target.value))}
          required
        />

        <label htmlFor="description">Description</label>
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
