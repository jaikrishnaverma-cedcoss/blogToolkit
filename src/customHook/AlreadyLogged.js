import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// custom hook to check authenticated or not if not then redirect to login
const AlreadyLogged = () => {
  const navigate = useNavigate();
  const session = useSelector((state) => state.users.session);
  useEffect(() => {
    if (Object.keys(session).length !== 0) navigate("/");
  }, [session]);
};
export default AlreadyLogged;
