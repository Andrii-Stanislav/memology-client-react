export interface Meme {
  id: number;
  title: string;
  description: string;
  image: string;
}

export type SuggestMemeFormType = {
  title: string;
};
