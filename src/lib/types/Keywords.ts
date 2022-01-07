export interface Keyword {
  id: number;
  keywords?: (KeywordsEntity)[] | null;
}
export interface KeywordsEntity {
  id: number;
  name: string;
}
