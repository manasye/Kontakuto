import { createBrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import ListPage from "./pages/ListPage";
import DetailPage from "./pages/DetailPage";

function Root() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<ListPage />} />
        <Route path="/detail/:id" element={<DetailPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}

const router = createBrowserRouter([
  {
    path: "*",
    Component: Root,
  },
]);

export default router;
