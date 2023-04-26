import React from "react";
import Button from "../../components/button";
import { SelectInput, TextInput } from "../../components/inputs";
import districts from "../../data/districts.json";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import axiosConfig from "../../axiosConfig";
import { toast } from "react-toastify";
const initialValues = {
	name: "",
	address: "",
	"pin code": "",
	gender: "select",
	district: "select",
	email: "",
	password: "",
	confirm: "",
	category: "select",
	phone: "",
};

const validationSchema = Yup.object().shape({
	email: Yup.string()
		.required("Required")
		// eslint-disable-next-line
		.matches(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Invalid email"),
	password: Yup.string().min(4, "Too Short!").max(20, "Too Long!").required("Required"),
	confirm: Yup.string()
		.oneOf([Yup.ref("password"), null], "Password doesn't match")
		.required("Required"),
	name: Yup.string().min(2, "Too Short!").max(20, "Too Long!").required("Required"),
	address: Yup.string().min(3, "Too Short!").max(20, "Too Long!").required("Required"),
	"pin code": Yup.number()
		.min(600000, "Invalid pin code")
		.max(699999, "Invalid pin code")
		.required("Required"),
	district: Yup.string().not(["select"], "Required"),
	phone: Yup.number(),
	gender: Yup.string().not(["select"], "Required"),
	category: Yup.string().not(["select"], "Required"),
});

const Register = ({ setAction }) => {
	const handleSubmit = async formData => {
		try {
			await axiosConfig.post("/auth/register", formData);
			setAction("login");
			toast.success("User registered successfully", { toastId: "register-success" });
		} catch (error) {
			toast.error(error?.response?.data?.msg || "Something went wrong", { toastId: "register-error" });
		}
	};
	return (
		<Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema}>
			{({ values }) => {
				return (
					<Form className="loginForm form">
						<TextInput label="Name *" placeholder="Enter name" name="name" />
						<TextInput label="Address *" placeholder="Enter address" name="address" />
						<TextInput
							label="Pin code *"
							placeholder="Enter pin code"
							type="number"
							name="pin code"
							size={6}
						/>
						<SelectInput
							label="Category *"
							options={["Farmer", "Consumer"]}
							placeholder="Select category"
							size={6}
							name="category"
						/>
						<SelectInput
							label="District *"
							options={districts}
							placeholder="Select district"
							size={6}
							name="district"
						/>
						<SelectInput
							label="Gender *"
							options={["Male", "Female", "Others"]}
							placeholder="Select gender"
							size={6}
							name="gender"
						/>
						<TextInput label="Email *" placeholder="Enter email" type="email" name="email" />
						<TextInput
							label="Phone number *"
							placeholder="Enter Phone number"
							type="number"
							name="phone"
						/>
						<TextInput label="Password *" placeholder="Enter password" size={6} name="password" />
						<TextInput
							label="Confirm Password *"
							placeholder="Confirm password"
							type="password"
							size={6}
							name="confirm"
						/>

						<Button label="Sign Up" />
						<p className="loginForm__footer" style={{ gridColumn: `span 12` }}>
							Already have an account?{" "}
							<button onClick={() => setAction("login")} type="button">
								Sign In
							</button>
						</p>
					</Form>
				);
			}}
		</Formik>
	);
};

export default Register;
