export interface IContentNoPay {
  content: ITextNoPay[] | IFileNoPay[] | IListNoPay[];
}

export interface ITextNoPay {
  type?: string;
  title?: string;
  content_length?: number;
}
export interface IFileNoPay {
  type?: string;
  url?: string;
}
export interface IListNoPay {
  type: string;
  items_length?: number[];
}
