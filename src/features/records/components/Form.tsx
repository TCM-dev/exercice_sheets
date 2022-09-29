import { Box, TextField } from "@mui/material";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import Button from "src/features/components/Button";

interface FormProps {
  onSubmit(payload: Sheets.RecordFormDTO): void;
  record?: Sheets.Record;
}

const Form: React.FC<FormProps> = ({ onSubmit, record }) => {
  const { control, handleSubmit } = useForm<Sheets.RecordFormDTO>({
    defaultValues: {
      description: record?.description || "",
      amount: record?.amount || 0,
      weight: record?.weight || 0,
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
        name="amount"
        control={control}
        rules={{
          required: {
            value: true,
            message: "Champ requis",
          },
          min: {
            value: 1,
            message: "Doit être supérieur ou égal à 1",
          },
        }}
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            fullWidth
            label="Nombre de répétition"
            variant="filled"
            required
            error={Boolean(fieldState.error)}
            helperText={fieldState.error?.message}
          />
        )}
      />

      <Controller
        name="weight"
        control={control}
        rules={{
          required: {
            value: true,
            message: "Champ requis",
          },
          min: {
            value: 1,
            message: "Doit être supérieur ou égal à 1",
          },
        }}
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            fullWidth
            label="Poids"
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
