import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

const ProfileSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  photo: Yup.string().url("Invalid URL"),
});

export default function Profile() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Edit Profile</h1>
      <Formik
        initialValues={{ name: "", photo: "" }}
        validationSchema={ProfileSchema}
        onSubmit={(values) => console.log(values)}
      >
        {({ errors, touched }) => (
          <Form className="space-y-4">
            <div>
              <Field name="name" className="border p-2 w-full" placeholder="Name" />
              {errors.name && touched.name && <p className="text-red-500">{errors.name}</p>}
            </div>
            <div>
              <Field name="photo" className="border p-2 w-full" placeholder="Photo URL" />
              {errors.photo && touched.photo && <p className="text-red-500">{errors.photo}</p>}
            </div>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
              Save
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
