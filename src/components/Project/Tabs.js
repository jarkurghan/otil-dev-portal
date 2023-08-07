import React, { useEffect } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useParams } from "react-router-dom";
import History from "./History";
import UrlTable from "./UrlTable";
import Apis from "./Apis.jsx";
import Applications from "./Applications.jsx";
import Settings from "./Settings.jsx";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
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

export default function BasicTabs() {
  const [admin, setAdmin] = React.useState(false);
  const [value, setValue] = React.useState(0);
  const [project, setProject] = React.useState("");
  const params = useParams();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const navigate = useNavigate();
  const onBack = () => {
    navigate("/");
  };
  const getName = async () => {
    await axios
      .get(`${process.env.REACT_APP_URL}/api/idp/v2/project/${params.id}`, {
        headers: {
          Authorization: sessionStorage.getItem("token"),
        },
      })
      .then((res) => {
        console.log(res.data.data.isAdmin);
        setAdmin(res.data.data.isAdmin);
        setProject(res.data.data.short_name);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  useEffect(() => {
    getName();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="tabs_box">
      <div className="tabs_box_item" onClick={onBack}>
        <ArrowBackIcon />
        <Button
          size="small"
          className="ArrowBackIcon_btn"
          variant="outlined"
          color="error"
        >
          go back
        </Button>
      </div>
      {project}
      <Box sx={{ width: "80%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
            orientation={isSmallScreen ? "vertical" : "horizontal"}
          >
            <Tab label="history" {...a11yProps(0)} />
            <Tab label="urls" {...a11yProps(1)} />
            <Tab label="APIs" {...a11yProps(2)} />
            <Tab label="applications" {...a11yProps(3)} />
            {admin === "1" && <Tab label="settings" {...a11yProps(4)} />}
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <History id={params.id} />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <UrlTable id={params.id} />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <Apis id={params.id} />
        </TabPanel>
        <TabPanel value={value} index={3}>
          <Applications id={params.id} />
        </TabPanel>
        {admin === "1" && (
          <TabPanel value={value} index={4}>
            <Settings id={params.id} />
          </TabPanel>
        )}
      </Box>
    </div>
  );
}
