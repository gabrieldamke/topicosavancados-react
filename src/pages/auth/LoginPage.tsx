import React, { useState } from "react";
import { Formik, Form, Field, FormikHelpers } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { login } from "../../store/pessoa.store";

interface FormValues {
  email: string;
  password: string;
}

export default function LoginPage() {
  const [isEmailSubmitted, setIsEmailSubmitted] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center h-screen justify-center bg-white">
      <div className="bg-white p-8 rounded-lg shadow-lg w-80">
        <img
          src="/firma-logo.png"
          alt="Logo da Empresa"
          className="h-24 mx-auto mb-4"
        />

        <Formik
          initialValues={{ email: "", password: "" }}
          validate={(values: FormValues) => {
            const errors: Partial<FormValues> = {};
            if (!values.email) {
              errors.email = "O email é necessário";
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
              errors.email = "Endereço de email inválido";
            }
            if (isEmailSubmitted && !values.password) {
              errors.password = "Informe uma senha!";
            }
            return errors;
          }}
          onSubmit={(
            values: FormValues,
            { setSubmitting }: FormikHelpers<FormValues>
          ) => {
            if (!isEmailSubmitted) {
              setEmail(values.email);
              setIsEmailSubmitted(true);
            } else {
              console.log(values);
              try {
                dispatch(login(values.email, values.password));
                navigate(`/dashboard`);
              } catch {}
            }
            setSubmitting(false);
          }}
        >
          {({ isSubmitting, errors, touched, setFieldValue, values }) => (
            <Form>
              <Field
                type="text"
                name="email"
                placeholder="Email"
                disabled={isEmailSubmitted}
                className={`rounded-lg border-2 px-4 py-2 mb-4 w-full ${
                  errors.email && touched.email
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
              />
              {errors.email && touched.email && (
                <div className="text-red-500 mb-2">{errors.email}</div>
              )}

              {isEmailSubmitted && (
                <>
                  <Field
                    type="password"
                    name="password"
                    placeholder="Senha"
                    className={`rounded-lg border-2 px-4 py-2 mb-4 w-full ${
                      errors.password && touched.password
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  />
                  {errors.password && touched.password && (
                    <div className="text-red-500 mb-2">{errors.password}</div>
                  )}
                  <span
                    onClick={() => {
                      setIsEmailSubmitted(false);
                      setFieldValue("password", "", false);
                    }}
                    className="text-gray-500 font-bold cursor-pointer my-4"
                  >
                    Alterar o email
                  </span>
                </>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-blue-800 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded-lg w-full"
              >
                {isEmailSubmitted ? "Logar" : "Continuar"}
              </button>
            </Form>
          )}
        </Formik>

        <p className="text-center text-gray-600 my-4">ou</p>
        <Link to="/registrar">
          <button
            type="submit"
            className="bg-white hover:bg-gray-100 text-blue-500 font-bold py-2 px-4 rounded-lg shadow w-full"
          >
            Criar uma conta
          </button>
        </Link>
        <hr className="my-4" />
        <img src="/firmagrey-logo.png" alt="Logo" className="mx-auto h-16" />
      </div>
    </div>
  );
}
