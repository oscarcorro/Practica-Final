import { Formik, Form, Field, ErrorMessage } from "formik";

export default function FormularioBase({ initialValues, validationSchema, onSubmit, fields, title, onClose }) {
    return (
        <div className="flex flex-col bg-black text-gray-100 border border-red-500 rounded-lg p-6 shadow-lg">
            <h2 className="text-2xl font-bold text-red-500 mb-6">{title}</h2>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
            >
                {(formik) => (
                    <Form>
                        {fields.map((field) => (
                            <div key={field.name} className="mb-6">
                                <label className="block text-sm font-medium text-gray-100 mb-2">
                                    {field.label}
                                </label>
                                {/*es necesario añadir esta comprobación para poder utilizar un select en el formato de deliveryNotes, 
                                sino trataba todos los campos como texto*/}
                                {field.type === "select" ? (
                                    <Field
                                        as="select"
                                        name={field.name}
                                        className="block w-full border border-red-500 rounded-md p-2 bg-gray-800 text-gray-100 focus:ring-red-500 focus:border-red-500"
                                        onChange={(event) => {
                                            field.onChange(event, formik); //permite cambiar el valor
                                        }}
                                    >
                                        {field.options.map((option) => (
                                            <option key={option.value} value={option.value}>
                                                {option.label}
                                            </option>
                                        ))}
                                    </Field>
                                ) : (
                                    <Field
                                        type={field.type}
                                        name={field.name}
                                        placeholder={field.placeholder}
                                        className="block w-full border border-red-500 rounded-md p-2 bg-gray-800 text-gray-100 focus:ring-red-500 focus:border-red-500"
                                    />
                                )}
                                <ErrorMessage
                                    name={field.name}
                                    component="div"
                                    className="text-red-400 text-sm mt-2"
                                />
                            </div>
                        ))}
                        <div className="flex justify-end space-x-4 mt-6">
                            {onClose && (
                                <button
                                    type="button"
                                    className="px-4 py-2 bg-gray-600 text-gray-100 rounded-md hover:bg-gray-700"
                                    onClick={onClose}
                                >
                                    Descartar
                                </button>
                            )}
                            <button
                                type="submit"
                                className={`px-4 py-2 rounded-md text-white ${
                                    formik.isSubmitting ? "bg-red-300 cursor-not-allowed" : "bg-red-500 hover:bg-red-600"
                                }`}
                                disabled={formik.isSubmitting}
                            >
                                {formik.isSubmitting ? "Guardando..." : "Guardar"}
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
}
