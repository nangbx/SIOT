import * as Yup from "yup";
import { useState } from "react";
import { useFormik, Form, FormikProvider } from "formik";
import { useNavigate } from "react-router-dom";
// material
import { Stack, TextField, IconButton, InputAdornment } from "@mui/material";
import { LoadingButton } from "@mui/lab";
// component
import Iconify from "../../../components/Iconify";
import { useDispatch } from "react-redux";
import { register } from "../../../slices/auth";

// ----------------------------------------------------------------------

export default function RegisterForm() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [showPassword, setShowPassword] = useState(false);
	const [loading, setLoading] = useState(false);
	const RegisterSchema = Yup.object().shape({
		firstname: Yup.string()
			.min(2, "Too Short!")
			.max(50, "Too Long!")
			.required("First name required"),
		lastname: Yup.string()
			.min(2, "Too Short!")
			.max(50, "Too Long!")
			.required("Last name required"),
		email: Yup.string()
			.email("Email must be a valid email address")
			.required("Email is required"),
		password: Yup.string().required("Password is required"),
	});

	const formik = useFormik({
		initialValues: {
			firstname: "",
			lastname: "",
			email: "",
			password: "",
		},
		validationSchema: RegisterSchema,
		onSubmit: () => {
			const { firstname, lastname, email, password } = formik.values;
			setLoading(true);
			dispatch(register({ firstname, lastname, email, password }))
				.unwrap()
				.then(() => {
					navigate("/dashboard", { replace: true });
				})
				.catch(() => {
					setLoading(false);
				});
		},
	});

	const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

	return (
		<FormikProvider value={formik}>
			<Form autoComplete='off' noValidate onSubmit={handleSubmit}>
				<Stack spacing={3}>
					<Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
						<TextField
							fullWidth
							label='First name'
							{...getFieldProps("firstname")}
							error={Boolean(touched.firstname && errors.firstname)}
							helperText={touched.firstname && errors.firstname}
						/>

						<TextField
							fullWidth
							label='Last name'
							{...getFieldProps("lastname")}
							error={Boolean(touched.lastname && errors.lastname)}
							helperText={touched.lastname && errors.lastname}
						/>
					</Stack>

					<TextField
						fullWidth
						autoComplete='username'
						type='email'
						label='Email address'
						{...getFieldProps("email")}
						error={Boolean(touched.email && errors.email)}
						helperText={touched.email && errors.email}
					/>

					<TextField
						fullWidth
						autoComplete='current-password'
						type={showPassword ? "text" : "password"}
						label='Password'
						{...getFieldProps("password")}
						InputProps={{
							endAdornment: (
								<InputAdornment position='end'>
									<IconButton
										edge='end'
										onClick={() => setShowPassword((prev) => !prev)}
									>
										<Iconify
											icon={showPassword ? "eva:eye-fill" : "eva:eye-off-fill"}
										/>
									</IconButton>
								</InputAdornment>
							),
						}}
						error={Boolean(touched.password && errors.password)}
						helperText={touched.password && errors.password}
					/>

					<LoadingButton
						fullWidth
						size='large'
						type='submit'
						variant='contained'
						loading={loading}
					>
						Register
					</LoadingButton>
				</Stack>
			</Form>
		</FormikProvider>
	);
}
