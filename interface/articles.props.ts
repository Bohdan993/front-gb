import { IFile, IList, ITextContent } from "../store/creation/creation.props";
import { IUser } from "./user.props";

export interface IArticles {
  id: number;
  type_avatar: string;
  type: string;
  title: string;
  price: string;
  menu_list: string[];
  finance_report?: IFinanceReport[];
}

export interface IFinanceReport {
  id: number;
  img: string;
  title: string;
  current: string;
}

export interface IOptionsSelect {
  id: number;
  title: string;
  createdAt: string;
  updatedAt: string;
  shortName: string;
  symbol: string;
}
export interface IUArticles {
  isPublished?: boolean;
  isOpenByAdmin?: boolean;
  boughtCount?: number;
  boughtAmount?: number;
  author?: IUser;
  articleType: { id: number; title: string };
  articleTypeId: number;
  authorId: number;
  category: {
    id: number;
    title: string;
    createdAt: string;
    updatedAt: string;
    icon: string;
  };
  categoryId: number;
  createdAt: string;
  currency: {
    id: number;
    title: string;
    createdAt: string;
    updatedAt: string;
    symbol: string;
  };
  currencyId: number;
  description: string;
  id: number;
  language: { id: number; title: string; createdAt: string; updatedAt: string };
  languageId: number;
  price: number;
  slug: string;
  title: string;
  updatedAt: string;
  descriptionItems: { id: number; title: string }[];
  content: [ITextContent | IFile | IList];
}
