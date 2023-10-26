import React, { useState, useEffect } from "react";
import { Formik, Field, ErrorMessage, Form, FormikHelpers } from "formik";
import * as Yup from "yup";
import { UserFormDataInterface } from "../../types/userFormData";
import { registerUser } from "../../features/axios/api/userAuthentication";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { notify } from "../common/toast";
import { useNavigate } from "react-router-dom";

//validation schema for form validation
const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required("Name is required")
    .matches(/^[A-Za-z]+$/, "Name should only contain letters"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
});

const Login: React.FC = () => {
  const [isLogin, setIsLogin] = useState<boolean | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const isLoginCheck = async () => {
      const token = window.localStorage.getItem("userToken");
      setIsLogin(true);
      if (token) {
        setIsLogin(true);
        navigate("/upload");
      }
    };
    isLoginCheck();
  }, []);

  const initialValues: UserFormDataInterface = {
    name: "",
    email: "",
  };

  const handleSubmit = (
    values: UserFormDataInterface,
    actions: FormikHelpers<UserFormDataInterface>
  ) => {
    // Handle form submission
    //API call
    registerUser(values)
      .then((response) => {
        notify("success", "user logged successfully");
        localStorage.setItem("userToken", response.userToken);
        setTimeout(() => {
          navigate("/upload");
        }, 2000);
      })
      .catch((err) => {
        notify("err", err.message);
      });
    actions.setSubmitting(false);
  };
  return !isLogin ? (
    <div className=" w-full flex justify-center  h-full ">
      <div className="py-52">Loading....</div>
    </div>
  ) : (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="mx-auto h-10 w-auto"
          src="https://res.cloudinary.com/dk4darniv/image/upload/v1697793048/pdf%20logos/_-xSnrXjfDZJcIr_I25vYF8GkZI0uW6p_gm7pmb.webp"
          alt="Your Company"
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-6">
              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Name
                  </label>
                </div>
                <div className="mt-2">
                  <Field
                    id="name"
                    name="name"
                    type="text"
                    className="block w-full pl-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="text-red-600"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Email address
                </label>
                <div className="mt-2">
                  <Field
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    className="block w-full pl-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-600"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-gray-800 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  disabled={isSubmitting}
                >
                  Sign in / register
                </button>
              </div>
            </Form>
          )}
        </Formik>
        <ToastContainer />
      </div>
    </div>
  );
};

export default Login;
