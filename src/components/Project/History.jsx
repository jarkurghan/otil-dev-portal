import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
// import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
// import ImageIcon from "@mui/icons-material/Image";
import Divider from "@mui/material/Divider";
import axios from "axios";
import Spinner from "react-spinner-material";

export default function InsetDividers({ id }) {
  const [data, setData] = React.useState();
  const [loading, setLoading] = React.useState(true);
  const getData = async () => {
    await axios
      .get(`${process.env.REACT_APP_URL}/api/idp/v2/project/${id}/history`, {
        headers: {
          Authorization: sessionStorage.getItem("token"),
        },
      })
      .then((res) => {
        setLoading(false);
        setData(res.data.data);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err.message);
      });
  };

  //
  function stringToColor(string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
  }

  function stringAvatar(name, email) {
    return {
      sx: {
        bgcolor: stringToColor(email),
      },
      children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
    };
  }
  //
  React.useEffect(() => {
    getData();
    // eslint-disable-next-line
  }, []);
  return (
    <div className="history">
      {loading ? (
        <div
          style={{
            marginTop: "100px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Spinner radius={150} color={"#1976d2"} stroke={16} visible={true} />
        </div>
      ) : (
        <List
          sx={{
            maxWidth: "100%",
            minWidth: 280,
            bgcolor: "background.paper",
          }}
        >
          {data.map((value, index) => {
            return (
              <ListItem className="history_list" key={index}>
                <div>
                  <div className="avatar_name_wrapper">
                    <ListItemAvatar>
                      <Avatar
                        {...stringAvatar(value.user_name, value.user_email)}
                      />
                    </ListItemAvatar>
                    <div>{value.user_name}</div>
                    &nbsp; &nbsp; &nbsp;
                    <div>{`${value.date.slice(0, 10)} ${value.date.slice(11, 16)}`}</div>
                  </div>
                  <Divider variant="inset" component="li" />
                  <span>{value.text}</span>
                </div>
              </ListItem>
            );
          })}
        </List>
      )}
    </div>
  );
}
