import { faker } from "@faker-js/faker";
// @mui
import { useTheme } from "@mui/material/styles";
import { Grid, Container, Typography } from "@mui/material";
// components
import Page from "../components/Page";
import Iconify from "../components/Iconify";
// sections
import {
	AppTasks,
	AppNewsUpdate,
	AppOrderTimeline,
	AppCurrentVisits,
	AppWebsiteVisits,
	AppTrafficBySite,
	AppWidgetSummary,
	AppCurrentSubject,
	AppConversionRates,
} from "../sections/@dashboard/app";

// ----------------------------------------------------------------------
import { useDispatch, useSelector } from "react-redux";
import { getDevices } from "../slices/device";
import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function DashboardApp() {
	const theme = useTheme();
	const dispatch = useDispatch();

	const device = useSelector((state) => state.device);
	useEffect(() => {
		dispatch(getDevices());
	}, []);
	return (
		<Page title='Dashboard'>
			<Container maxWidth='xl'>
				<Typography variant='h4' sx={{ mb: 5 }}>
					Hi, Welcome back
				</Typography>

				<Grid container spacing={3}>
					<Grid item xs={12} sm={6} md={3} onClick>
						<Link to={"device"}>
							<AppWidgetSummary
								title='Add new device'
								icon={"ant-design:plus-circle-outlined"}
								action='/device'
							/>
						</Link>
					</Grid>
					{device.devices.map((item, index) => (
						<Grid item xs={12} sm={6} md={3}>
							<Link to={`device/${item._id}`}>
								<AppWidgetSummary
									title={item.name}
									color='info'
									icon={"arcticons:device-connect"}
									action='/iot1'
								/>
							</Link>
						</Grid>
					))}
				</Grid>
			</Container>
		</Page>
	);
}
