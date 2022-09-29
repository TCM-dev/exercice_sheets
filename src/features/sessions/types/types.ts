export type Session = {
  id: string;
  exerciceSlug: string;
  content: string;
  createdAt: number;
};

export type SessionFormDTO = {
  content: string;
};
