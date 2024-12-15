import {Navigate, Route, Routes} from "react-router-dom";
import {userPages} from "../mock/pages.ts";
import {URL_TRANSACTIONS} from "../mock/pageUrls.ts";
import {ErrorPage} from "../pages/ErrorPage.tsx";

export const UserRoutes = () => {
  return (
      <Routes>
        <Route index element={<Navigate to={URL_TRANSACTIONS}/>}/>
        {
          userPages.map((page, index) => (
              <Route key={index} path={page.path} element={<page.component/>}/>
          ))
        }
        <Route path="*" element={<ErrorPage/>}/>
      </Routes>
  )
}
