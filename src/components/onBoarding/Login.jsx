"use client";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

export default function Login({ onLoginSuccess }) {
  const initialValues = { email: "", password: "" };

  const validationSchema = Yup.object({
    email: Yup.string().email("Email inválido").required("El email es obligatorio"),
    password: Yup.string().required("La contraseña es obligatoria"),
  });

  const handleLogin = async (values, { setSubmitting }) => {
    try {
      const res = await fetch("https://bildy-rpmaya.koyeb.app/api/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (res.ok) {
        const data = await res.json();
        localStorage.setItem("jwt", data.token);
        onLoginSuccess();
      } else {
        alert("Login: Credenciales incorrectas");
      }
    } catch (error) {
      console.error("Error:", error);
    }
    setSubmitting(false);
  };

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleLogin}>
      {({ isSubmitting }) => (
        <Form className="space-y-4">
          <h2 className="text-3xl font-bold text-red-500 text-center mb-6">Login</h2>
          <div>
            <Field
              type="email"
              name="email"
              placeholder="Email"
              className="w-full p-3 border rounded-md focus:ring-red-500"
            />
            <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
          </div>
          <div>
            <Field
              type="password"
              name="password"
              placeholder="Contraseña"
              className="w-full p-3 border rounded-md focus:ring-red-500"
            />
            <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-500 transition duration-300"
          >
            {isSubmitting ? "Iniciando..." : "Inciar sesión"}
          </button>
        </Form>
      )}
    </Formik>
  );
}
