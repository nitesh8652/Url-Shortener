
import Form from '../Components/Form.jsx'
import UrlHistory from '../Components/UrlHistory.jsx'

import { useSelector } from "react-redux";
import { useNavigate } from "@tanstack/react-router";

const DashboardPage = () => {
  const auth = useSelector((state) => state.auth);
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!auth.user) {
      navigate({ to: "/loginpage" });
    }
  }, [auth.user, navigate]);

  return (
    <>
      <Form />
      <UrlHistory />
    </>
  );
};

export default DashboardPage