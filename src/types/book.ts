export type Book = {
  title: string;
  author: string;
  coverImageUrl: string;
  id: string;
  pageCount: number;
  publisher: string;
  synopsis: string;
};

export type BooksResponse = {
  books: Book[];
};
