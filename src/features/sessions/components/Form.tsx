import { Box, TextField } from "@mui/material";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import Button from "src/features/components/Button";

interface FormProps {
  onSubmit(payload: Sheets.SessionFormDTO): void;
  session?: Sheets.Session;
}

const Form: React.FC<FormProps> = ({ onSubmit, session }) => {
  const { control, handleSubmit } = useForm<Sheets.SessionFormDTO>({
    defaultValues: {
      content: session?.content || "",
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
        name="content"
        control={control}
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            fullWidth
            label="Contenu de la session"
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
