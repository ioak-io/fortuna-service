export const BASE_SCHEMA: any = {
  displayName: "Fortuna",
  description:
    "Comprehensive financial management tool enabling users to track expenses, plan budgets, and categorize spending",
  logo: {
    dark: "https://fortuna-app.ioak.io/c0610cd1bb7f9629624e7541669fd872.svg",
    light: "https://fortuna-app.ioak.io/c0610cd1bb7f9629624e7541669fd872.svg",
  },
  modules: {
    method: "GET",
    url: "/portal/schema/module",
    queryParam: [],
    pathParam: [],
  },
  baseUrl: "https://api.ioak.io:8100/api",
  user: {
    user_id: null,
    given_name: null,
    family_name: null,
    name: null,
    nickname: null,
    email: null,
  },
  space: null,
  authorization: null,
};

export const MODULE_SCHEMA: any[] = [
  {
    name: "expense",
    displayName: "Expense",
    description: "Expenditure record",
    icon: {
      dark: "https://fortuna-app.ioak.io/c0610cd1bb7f9629624e7541669fd872.svg",
      light: "https://fortuna-app.ioak.io/c0610cd1bb7f9629624e7541669fd872.svg",
    },
    url: "/portal/schema/module/expense",
  },
];
