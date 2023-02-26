import type { ICreationProps } from "./creation.props";

const initStore: ICreationProps = {
  currentStep: 1,
  content: [],
  createContent: {
    articleTypeId: null,
    content: [],
    price: 0,
    languageId: null,
    categoryId: null,
    currencyId: null,
    title: "",
    description: "",
    descriptionItems: [],
    slug: "",
    createdAt: "",
  },
  currentIndex: 0,
};

export default initStore;
