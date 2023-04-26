import { Form, Formik } from "formik";
import React from "react";
import Button from "../../components/button";
import { TextInput } from "../../components/inputs";
import * as Yup from "yup";
import axiosConfig from "../../axiosConfig";
import { useDispatch } from "react-redux";
import { login } from "../../features/userSlice";
import { toast } from "react-toastify";

const initialValues = { email: "", password: "" };

const validationSchema = Yup.object().shape({
	email: Yup.string()
		.min(2, "Too Short!")
		.required("Required")
		// eslint-disable-next-line
		.matches(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Invalid email"),
	password: Yup.string().min(4, "Too Short!").max(20, "Too Long!").required("Required"),
});

const Login = ({ setAction }) => {
	const dispatch = useDispatch();
	const handleSubmit = async formData => {
		try {
			const { data } = await axiosConfig.post("/auth/login", formData);
			dispatch(login(data));
			// toas; 
		} catch (error) {
			toast.error(error?.response?.data?.msg || "Something went wrong", { toastId: "login-error" });
		}
	};
	return (
		<Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema}>
			{({ values }) => {
				return (
					<Form className="loginForm form">
						<h1 className="title">Welcome back</h1>
						<p className="subtitle">Please enter your details</p>
						<TextInput label="Email" placeholder="Enter your email" name="email" />
						<TextInput
							label="Password"
							placeholder="Enter your password"
							type="password"
							name="password"
						/>
						<Button label="Sign In" />
						<p className="loginForm__footer" style={{ gridColumn: "span 12" }}>
							Don't have an account?{" "}
							<button onClick={() => setAction("register")} type="button">
								Sign up
							</button>
						</p>
					</Form>
				);
			}}
		</Formik>
	);
};

export default Login;
