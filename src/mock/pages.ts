import {MainPage} from "../pages/MainPage.tsx";
import {URL_ARCHIVED_TRANSACTIONS, URL_ERROR, URL_MAIN, URL_TRANSACTIONS} from "./pageUrls.ts";
import {TransactionsPage} from "../pages/TransactionsPage.tsx";
import {ErrorPage} from "../pages/ErrorPage.tsx";
import {ArchivedTransactionsPage} from "../pages/ArchivedTransactionsPage.tsx";

export const userPages = [
  {
    component: MainPage,
    path: URL_MAIN
  },
  {
    component: TransactionsPage,
    path: URL_TRANSACTIONS
  },
  {
    component: ArchivedTransactionsPage,
    path:URL_ARCHIVED_TRANSACTIONS
  },
  {
    component: ErrorPage,
    path: URL_ERROR
  }
]