export type Record = {
  id: string;
  exerciceSlug: string;
  description?: string;
  amount: number;
  weight: number;
  createdAt: number;
};

export type RecordFormDTO = {
  description?: string;
  amount: number;
  weight: number;
};
