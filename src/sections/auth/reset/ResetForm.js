import * as Yup from "yup";
import { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useFormik, Form, FormikProvider } from "formik";
// material
import { Stack, TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";
// component

import { useDispatch, useSelector } from "react-redux";
import { login } from "../../../slices/auth";

// ----------------------------------------------------------------------

export default function ResetForm() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [loading, setLoading] = useState(false);
	const LoginSchema = Yup.object().shape({
		email: Yup.string()
			.email("Email must be a valid email address")
			.required("Email is required"),
		password: Yup.string().required("Password is required"),
	});
	const formik = useFormik({
		initialValues: {
			email: "",
			password: "",
			remember: true,
		},
		validationSchema: LoginSchema,
		onSubmit: () => {
			const { email } = formik.values;
			setLoading(true);
		},
	});

	const { errors, touched, values, handleSubmit, getFieldProps } = formik;

	return (
		<FormikProvider value={formik}>
			<Form autoComplete='off' noValidate onSubmit={handleSubmit}>
				<Stack spacing={3}>
					<TextField
						fullWidth
						autoComplete='username'
						type='email'
						label='Email address'
						{...getFieldProps("email")}
						error={Boolean(touched.email && errors.email)}
						helperText={touched.email && errors.email}
					/>
					<LoadingButton
						fullWidth
						size='large'
						type='submit'
						variant='contained'
						loading={loading}
					>
						Forgot Password
					</LoadingButton>
				</Stack>
			</Form>
		</FormikProvider>
	);
}
