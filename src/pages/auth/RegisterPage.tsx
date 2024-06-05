import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { PessoaRegisterDTO } from "../../api/ApiProvider";
import { register } from "../../store/pessoa.store";

const RegisterPage = () => {
  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Email inválido").required("Email obrigatório"),
    nome: Yup.string().required("Nome obrigatório"),
    senha: Yup.string()
      .min(6, "Senha deve ter pelo menos 6 caracteres")
      .required("Senha obrigatória"),
  });

  const navigate = useNavigate();
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

  return (
    <div className="flex flex-col items-center h-screen justify-center bg-white ">
      <div className="bg-white p-8 rounded-lg shadow-lg xl:w-120">
        <div className="flex flex-row">
          <div className="flex flex-col">
            <img
              src="/firma-logo.png"
              alt="Logo da Empresa"
              className="h-12 w-22 mx-auto mb-4"
            />
            <p className="text-center text-gray-600 mb-4">
              Registrar uma conta
            </p>

            <Formik
              initialValues={{
                email: "",
                nome: "",
                senha: "",
              }}
              validationSchema={validationSchema}
              onSubmit={(values, { setSubmitting }) => {
                dispatch(register(values.email, values.senha, values.nome));
                setSubmitting(false);
                navigate("/dashboard");
              }}
            >
              {({ isSubmitting }) => (
                <Form className="flex flex-col">
                  <Field
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="rounded-lg border-2 border-gray-300 px-4 py-2 mb-3"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500"
                  />

                  <Field
                    type="text"
                    name="nome"
                    placeholder="Nome"
                    className="rounded-lg border-2 border-gray-300 px-4 py-2 mb-3"
                  />
                  <ErrorMessage
                    name="nome"
                    component="div"
                    className="text-red-500"
                  />

                  <Field
                    type="password"
                    name="senha"
                    placeholder="Senha"
                    className="rounded-lg border-2 border-gray-300 px-4 py-2 mb-3"
                  />
                  <ErrorMessage
                    name="senha"
                    component="div"
                    className="text-red-500"
                  />
                  <ErrorMessage
                    name="telefone"
                    component="div"
                    className="text-red-500"
                  />

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-red-700 hover:bg-red-800 text-white font-bold py-2 px-4 rounded-lg w-full"
                  >
                    Registrar
                  </button>
                </Form>
              )}
            </Formik>

            <p className="text-center text-gray-600 my-4">ou</p>
            <Link to="/logar">
              <button
                type="button"
                className="bg-white hover:bg-gray-100 text-blue-500 font-bold py-2 px-4 rounded-lg shadow w-full"
              >
                Fazer Login
              </button>
            </Link>
            <hr className="my-4" />
            <img
              src="/firmagrey-logo.png"
              alt="Logo"
              className="mx-auto h-12 w-32"
            />
          </div>
          <div className="flex items-center justify-center">
            <img
              src="/iot-image.png"
              alt="Imagem lateral"
              className="w-100 h-auto max-h-96 ml-12"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
