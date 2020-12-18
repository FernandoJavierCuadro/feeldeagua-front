import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { getUser } from "../../../redux/actions";
import globalUrl from "../../../utils/url";

const Login = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [nameErr, setNameErr] = useState("");
  const [passwordErr, setPasswordErr] = useState("");

  const formValidation = () => {
    const passwordErr = {};
    const nameErr = {};
    let isValid = true;

    if (password === "") {
      passwordErr.passwordEmpty = "este es un campo requerido";
      isValid = false;
    }

    if (password.trim().length < 4) {
      passwordErr.passwordShort =
        "el password debería de contenter al menos 4 caracteres";
      isValid = false;
    }

    if (password.trim().length > 10) {
      passwordErr.passwordLong =
        "el password debería de contenter un máximo de 10 caracteres";
      isValid = false;
    }

    if (name === "") {
      nameErr.nameEmpty = "este es un campo requerido";
      isValid = false;
    }

    setPasswordErr(passwordErr);
    setNameErr(nameErr);
    return isValid;
  };

  const dispatch = useDispatch();
  const history = useHistory();

  const handleLogin = (e) => {
    e.preventDefault();
    const isValid = formValidation();
    isValid &&
      axios({
        method: "POST",
        headers: { "Content-Type": "application/json" },
        url: `${globalUrl}/api/v1/admin/users/login`,
        data: {
          name: name,
          password: password,
        },
      })
        .then((res) => {
          dispatch(getUser(res.data));
          history.push("/admin/artists");
        })
        .catch((err) => {
          console.log(err);
        });
  };

  return (
    <div className="h-screen overflow-hidden flex items-center justify-center">
      <div className="grid min-h-screen place-items-center">
        <form id="form-logIn" className="mt-3" onSubmit={handleLogin}>
          <div className="mt-3">
            <img
              className="object-contain h-40 w-full"
              src="/images/feeldeaguanegro.gif"
              alt="feel-logo"
            />
          </div>
          <label
            htmlFor="name"
            className="block mt-2 text-xs font-semibold text-gray-600 uppercase"
          >
            Username
          </label>
          <input
            onChange={(e) => setName(e.target.value)}
            name="name"
            className="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner"
            id="name"
            type="text"
          />
          {Object.keys(nameErr).map((key) => {
            return <div className="alert-danger">{nameErr[key]}</div>;
          })}
          <label
            htmlFor="password"
            className="block mt-2 text-xs font-semibold text-gray-600 uppercase"
          >
            Password
          </label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            name="password"
            className="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner"
            id="password"
            type="password"
          />
          {Object.keys(passwordErr).map((key) => {
            return <div className="alert-danger">{passwordErr[key]}</div>;
          })}
          <button
            className="w-full py-3 mt-6 font-medium tracking-widest text-white uppercase bg-black shadow-lg focus:outline-none hover:bg-gray-900 hover:shadow-none"
            type="submit"
          >
            Ingresar
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
