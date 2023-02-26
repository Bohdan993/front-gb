export interface IExpertProps {
  expertData: {
    [key: string]: string;
  };
  loginData: {
    [key: string]: string;
  };
  currentActive: boolean;
  buyArticleID: undefined | number;
}
