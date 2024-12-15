import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import {UserRoutes} from "./UserRoutes.tsx";
import App from "../App.tsx";
import {URL_MAIN} from "../mock/pageUrls.ts";
import {Navbar} from "../components/navbar/Navbar.tsx";

export const AppRoutes = ()=> {
  return (
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route element={<App />}>
            <Route path="/*" element={<UserRoutes />} />
            <Route index element={<Navigate to={URL_MAIN} />} />
          </Route>
        </Routes>
      </BrowserRouter>
  )
}