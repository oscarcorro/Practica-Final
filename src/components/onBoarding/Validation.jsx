"use client";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

export default function Validation({ onNext }) {
  const initialValues = { code: "" };

  const validationSchema = Yup.object({
    code: Yup.string().required("El código es obligatorio"),
  });

  const handleValidate = async (values, { setSubmitting }) => {
    const token = localStorage.getItem("jwt");

    try {
      const res = await fetch("https://bildy-rpmaya.koyeb.app/api/user/validation", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(values),
      });

      if (res.ok) {
        alert("Correo validado con éxito!");
        onNext();//login
      } else {
        alert("Validation: Código incorrecto");
      }
    } catch (error) {
      console.error("Error:", error);
    }
    setSubmitting(false);
  };

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleValidate}>
      {({ isSubmitting }) => (
        <Form className="space-y-2">
          <p className="text-center text-black text-sm font-medium mb-2">
            Hemos enviado un correo con el código de verificación.
          </p>

          <h2 className="text-3xl font-bold text-red-600 text-center mb-2">Código de Verificación</h2>
          <div>
            <Field
              type="text"
              name="code"
              placeholder="Código"
              className="w-full p-3 border rounded-md focus:ring-red-500"
            />
            <ErrorMessage name="code" component="div" className="text-red-500 text-sm mt-1" />
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-500 transition duration-300"
          >
            {isSubmitting ? "Verificando..." : "Verificar"}
          </button>
        </Form>
      )}
    </Formik>
  );
}
