import { Formik, Field, Form } from "formik";
import axios from "axios";

const LeadForm = () => {
  return (
    <Formik
      initialValues={{ name: "", email: "", phone: "", company: "" }}
      onSubmit={async (values) => {
        await axios.post("http://localhost:5001/api/leads", values);
      }}
    >
      <Form className="p-4 bg-gray-100">
        <Field name="name" placeholder="Name" />
        <Field name="email" type="email" placeholder="Email" />
        <button type="submit">Submit</button>
      </Form>
    </Formik>
  );
};

export default LeadForm;
