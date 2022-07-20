import {
	Grid,
	Container,
	Box,
	Button,
	TextField,
	Stepper,
	Step,
	StepLabel,
	Typography,
	Card,
	CardMedia,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	IconButton,
} from "@mui/material";

import { styled } from "@mui/material/styles";
import * as React from "react";
// components
import Page from "../components/Page";
import Iconify from "../components/Iconify";
// sections

import { useState } from "react";
import slug from "../services/slug";
import { errorMessage } from "../slices/message";

import deviceService from "../services/device.service";
// ----------------------------------------------------------------------
const steps = ["Name device", "Add attribute"];
const Input = styled("input")({
	display: "none",
});

export default function FormAddDevice() {
	const [valueName, setValueName] = useState("");
	const [valueSlug, setValueSlug] = useState("");
	const [attributes, setAttributes] = useState(new Array());
	const handleChange = async (event, key, label) => {
		if (label === "name") {
			const value = event.target.value;
			const res = await slug(value);
			if (res.status === 200) {
				setAttributes((prev) => {
					prev[key][label] = value;
					prev[key]["slug"] = res.data.slug;
					return [...prev];
				});
			} else {
				errorMessage(res.data.message);
			}
		} else {
			setAttributes((prev) => {
				prev[key][label] = event.target.value;
				return [...prev];
			});
		}
	};
	const [activeStep, setActiveStep] = React.useState(0);
	const [skipped, setSkipped] = React.useState(new Set());

	const isStepOptional = (step) => {
		return step === 1;
	};

	const isStepSkipped = (step) => {
		return skipped.has(step);
	};

	const handleNext = async (final) => {
		let newSkipped = skipped;
		if (isStepSkipped(activeStep)) {
			newSkipped = new Set(newSkipped.values());
			newSkipped.delete(activeStep);
		}

		setActiveStep((prevActiveStep) => prevActiveStep + 1);
		setSkipped(newSkipped);
		if (final) {
			const res = await deviceService.addNewDevice(
				valueName,
				valueSlug,
				"https://cdn.dribbble.com/userupload/2764178/file/original-e8c98d9b980743fe1270de0253b8e22a.png?filters:format(webp)?filters%3Aformat%28webp%29=&compress=1&resize=1600x1200",
				attributes
			);
			console.log(res);
		}
	};

	const handleBack = () => {
		setActiveStep((prevActiveStep) => prevActiveStep - 1);
	};

	const handleReset = () => {
		setActiveStep(0);
	};
	const handleChangeNameDevice = async (event) => {
		const value = event.target.value;
		setValueName(value);
		const res = await slug(value);
		if (res.status === 200) {
			setValueSlug(res.data.slug);
		} else {
			errorMessage(res.data.message);
		}
	};
	const handelDeleteAttr = (event, index) => {
		setAttributes((prev) => {
			prev.splice(index, 1);
			return [...prev];
		});
	};
	return (
		<Page title='Dashboard'>
			<Container maxWidth='xl'>
				<Iconify icon={"eva:arrow-back-fill"} width={24} height={24} />
				<Typography variant='h4' sx={{ mb: 5 }}>
					Add new device
				</Typography>

				<Box sx={{ width: "100%" }} marginBottom={"1ch"}>
					<Stepper activeStep={activeStep}>
						{steps.map((label, index) => {
							const stepProps = {};
							const labelProps = {};

							if (isStepSkipped(index)) {
								stepProps.completed = false;
							}
							return (
								<Step key={label} {...stepProps}>
									<StepLabel {...labelProps}>{label}</StepLabel>
								</Step>
							);
						})}
					</Stepper>
					{activeStep === 0 && (
						<React.Fragment>
							<Grid container spacing={3}>
								<Grid item xs={8}>
									<Box
										component='form'
										sx={{
											"& .MuiTextField-root": { m: 1, width: "50ch" },
										}}
										noValidate
										autoComplete='off'
										marginBottom={"1ch"}
									>
										<TextField
											id='outlined-multiline-flexible'
											label='Device name'
											multiline
											maxRows={4}
											value={valueName}
											onChange={handleChangeNameDevice}
										/>
										<TextField
											id='outlined-multiline-flexible'
											label='Slug device name'
											multiline
											disabled
											maxRows={4}
											value={valueSlug}
											onChange={handleChange}
										/>
									</Box>
									<label htmlFor='contained-button-file'>
										<Input
											accept='image/*'
											id='contained-button-file'
											multiple
											type='file'
										/>
										<Button variant='contained' component='span'>
											Upload
										</Button>
									</label>
								</Grid>
								<Grid item xs={4}>
									<Card>
										<CardMedia component='' height='140' />
									</Card>
								</Grid>
							</Grid>
							<Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
								<Button
									color='inherit'
									disabled={activeStep === 0}
									onClick={handleBack}
									sx={{ mr: 1 }}
								>
									Back
								</Button>
								<Box sx={{ flex: "1 1 auto" }} />

								<Button
									onClick={() => handleNext(activeStep === steps.length - 1)}
								>
									{activeStep === steps.length - 1 ? "Finish" : "Next"}
								</Button>
							</Box>
						</React.Fragment>
					)}
					{activeStep === 1 && (
						<React.Fragment>
							{attributes.map((item, index) => (
								<Box
									component='form'
									sx={{
										"& .MuiTextField-root": { m: 1, width: "30ch" },
									}}
									noValidate
									autoComplete='off'
									marginBottom={"20px"}
									key={index}
								>
									<TextField
										id='outlined-multiline-flexible'
										label='Name attribute'
										multiline
										maxRows={4}
										value={item.name}
										onChange={(event) => handleChange(event, index, "name")}
									/>
									<TextField
										id='outlined-multiline-flexible'
										label='Slug name'
										multiline
										disabled
										maxRows={4}
										value={item.slug}
										onChange={(event) => handleChange(event, index, "slug")}
									/>
									<FormControl sx={{ m: 1, minWidth: 120 }}>
										<InputLabel id='demo-simple-select-label'>Type</InputLabel>
										<Select
											labelId='demo-simple-select-label'
											id='demo-simple-select'
											value={item.type}
											label='Type'
											onChange={(event) =>
												handleChange(event, index, "data_type")
											}
										>
											<MenuItem value={"FLOAT"}>FLOAT</MenuItem>
											<MenuItem value={"STRING"}>STRING</MenuItem>
											<MenuItem value={"BIT"}>BIT</MenuItem>
											<MenuItem value={"INT"}>INTEGER</MenuItem>
										</Select>
									</FormControl>

									<TextField
										sx={{ maxWidth: "140px" }}
										id='outlined-multiline-flexible'
										label='Data label'
										value={item.label}
										onChange={(event) =>
											handleChange(event, index, "data_label")
										}
									/>
									<IconButton
										aria-label='delete'
										size='large'
										sx={{ marginTop: "10px" }}
										onClick={(event) => handelDeleteAttr(event, index)}
									>
										<Iconify
											icon={"ant-design:delete-outlined"}
											width={24}
											height={24}
										/>
									</IconButton>
								</Box>
							))}
							<Button
								sx={{ minWidth: "30ch", marginTop: "20px" }}
								variant='contained'
								onClick={(event) => {
									setAttributes((prev) => {
										return [
											...prev,
											{
												name: "",
												slug: "",
												data_type: "",
												data_label: "",
											},
										];
									});
								}}
							>
								+ Add attribute
							</Button>
							<Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
								<Button
									color='inherit'
									disabled={activeStep === 0}
									onClick={handleBack}
									sx={{ mr: 1 }}
								>
									Back
								</Button>
								<Box sx={{ flex: "1 1 auto" }} />

								<Button
									onClick={() => handleNext(activeStep === steps.length - 1)}
								>
									{activeStep === steps.length - 1 ? "Finish" : "Next"}
								</Button>
							</Box>
						</React.Fragment>
					)}
					{activeStep === steps.length && (
						<React.Fragment>
							<Typography sx={{ mt: 2, mb: 1 }}>
								All steps completed - you&apos;re finished
							</Typography>
							<Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
								<Box sx={{ flex: "1 1 auto" }} />
								<Button onClick={handleReset}>Reset</Button>
							</Box>
						</React.Fragment>
					)}
				</Box>
			</Container>
		</Page>
	);
}
