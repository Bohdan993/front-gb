import { IUArticles } from "./articles.props";
import { ICurrency } from "./currency";

export interface IUserDataProps {
  user: IUserProps;
  success: string;
}

export interface IUserProps {
  [key: string]: string;
  // createdAt: string;
  // description: string;
  // id: number;
  // name: string;
  // phone: string;
  // smsCode: string;
  // specialization: string;
  // token: string;
  // updatedAt: string;
}

export interface IUser {
  avatar_id: string;
  description: string;
  id: number;
  name: string;
  specialization: string;
}
export interface IUserArticles {
  author: IUser;
  articles: IUArticles[];
  success: boolean;
  currentPage: number;
  totalPages: number;
  totalAmount?: number;
  totalBuyNumber?: number;
  totalCount?: number;
  paidOut?: number;
  balance?: number;
  isDeleted?: boolean;
  currency?: ICurrency;
  withdrawalBalance: number;
}
export interface IAuthorArticles {
  article: IUArticles;
  success: boolean;
  author: IUser;
  access: boolean;
  articles: IUArticles[];
}
