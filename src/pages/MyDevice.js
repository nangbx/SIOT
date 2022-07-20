import * as React from "react";
import { Grid, Container, Typography } from "@mui/material";
// components
import Page from "../components/Page";
import Iconify from "../components/Iconify";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
// sections

// ----------------------------------------------------------------------
function TabPanel(props) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role='tabpanel'
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}
		>
			{value === index && (
				<Box sx={{ p: 3 }}>
					<Typography>{children}</Typography>
				</Box>
			)}
		</div>
	);
}

TabPanel.propTypes = {
	children: PropTypes.node,
	index: PropTypes.number.isRequired,
	value: PropTypes.number.isRequired,
};

function a11yProps(index) {
	return {
		id: `simple-tab-${index}`,
		"aria-controls": `simple-tabpanel-${index}`,
	};
}
export default function MyDevice() {
	const [value, setValue] = React.useState(0);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};
	return (
		<Page title='Dashboard'>
			<Container maxWidth='xl'>
				<Typography variant='h4' sx={{ mb: 5 }}>
					Hi, Welcome back
				</Typography>
				<Box sx={{ width: "100%" }}>
					<Box sx={{ borderBottom: 1, borderColor: "divider" }}>
						<Tabs
							value={value}
							onChange={handleChange}
							aria-label='basic tabs example'
						>
							<Tab label='General' {...a11yProps(0)} />
							<Tab label='Attributes' {...a11yProps(1)} />
						</Tabs>
					</Box>
					<TabPanel value={value} index={0}>
						General
					</TabPanel>
					<TabPanel value={value} index={1}>
						Attributes
					</TabPanel>
				</Box>
			</Container>
		</Page>
	);
}
