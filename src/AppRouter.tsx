import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CreateCompany from "./pages/CreateCompany";
import CreateSupplier from "./pages/CreateSupplier";
import ListCompanies from "./pages/ListCompanies";
import ListSuppliers from "./pages/ListSuppliers";
import NotFoundPage from "./components/NotFound";

function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/company-form" element={<CreateCompany />} />
        <Route path="/supplier-form" element={<CreateSupplier />} />
        <Route path="/companies-list" element={<ListCompanies />} />
        <Route path="/suppliers-list" element={<ListSuppliers />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default AppRouter;
