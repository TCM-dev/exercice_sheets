import { Box, TextField } from "@mui/material";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import Button from "src/features/components/Button";

interface FormProps {
  onSubmit(payload: Sheets.ExerciceFormDTO): void;
  exercice?: Sheets.Exercice;
}

const Form: React.FC<FormProps> = ({ onSubmit, exercice }) => {
  const { control, handleSubmit } = useForm<Sheets.ExerciceFormDTO>({
    defaultValues: {
      name: exercice?.name || "",
      description: exercice?.description || "",
    },
  });

  return (
    <Box
      onSubmit={handleSubmit(onSubmit)}
      component="form"
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <Controller
        name="name"
        control={control}
        rules={{
          required: {
            value: true,
            message: "Champ requis",
          },
        }}
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            fullWidth
            label="Nom"
            variant="filled"
            required
            error={Boolean(fieldState.error)}
            helperText={fieldState.error?.message}
          />
        )}
      />

      <Controller
        name="description"
        control={control}
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            fullWidth
            label="Description"
            variant="filled"
            multiline
            error={Boolean(fieldState.error)}
            helperText={fieldState.error?.message}
          />
        )}
      />
      <Button type="submit">Soumettre</Button>
    </Box>
  );
};

export default Form;
