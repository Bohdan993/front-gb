export interface ICreationProps {
  currentStep: number;
  content: [ITextContent | IFile | IList] | [];
  createContent: IArticle;
  currentIndex: number;
}

export interface IContent {
  content: ITextContent | IFile | IList;
}

export interface ITextContent {
  type: string;
  title?: string;
  content?: string;
  [key: string]: any;
}
export interface IFile {
  type: string;
  url?: string;
  fileName?: string;
  title?: string;
  [key: string]: any;
}
export interface IList {
  type: string;
  items?: string[];
  title?: string;
  [key: string]: any;
}

export interface IArticle {
  articleTypeId: number | null;
  content: [ITextContent | IFile | IList] | [];
  price: number;
  categoryId: number | null;
  languageId: number | null;
  currencyId: number | null;
  title: string;
  description: string;
  descriptionItems: { id?: number; title: string }[] | [];
  slug: string;
  createdAt: string;
  isPublished?: boolean;
}
