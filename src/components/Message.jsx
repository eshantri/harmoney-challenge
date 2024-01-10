import CloudQueueIcon from "@mui/icons-material/CloudQueue";
import { Button, Typography } from "@mui/material";
import { apiUrl } from "../utils/apiEndpoints";

const convertTimestamp = (timestamp) => {
  var date = new Date(timestamp);

  // Hours part from the timestamp
  var hours = date.getHours();

  // Minutes part from the timestamp
  var minutes = "0" + date.getMinutes();

  // Seconds part from the timestamp
  var seconds = "0" + date.getSeconds();

  // Will display time in 10:30:23 format
  var formattedTime =
    (hours > 12 ? hours - 12 : hours) +
    ":" +
    minutes.substr(-2) +
    ":" +
    seconds.substr(-2) +
    " " +
    (hours > 12 ? "PM" : "AM");

  return formattedTime;
};

function Message({ userName = "anonymous", timestamp, content, id,mutate }) {
  const handleDelete = async (id) => {
    const delUrl = apiUrl + `${id}/`;
    const res = await fetch(delUrl, {
      method: "DELETE",
      headers: {
        Authorization: import.meta.env.VITE_AUTHORIZATION,
      },
    });
    console.log(res);
    mutate();
  };
  return (
    <div style={{borderTop:'2px solid grey',padding:'16px'}}>
      <div
        style={{
          display: "flex",
          // justifyContent: "center",
          alignItems: "center",
          gap: 8,
        }}
      >
        <CloudQueueIcon />
        <Typography variant="h6" style={{ fontWeight: 600, fontSize: "16px" }}>
          ~{userName}
        </Typography>
        <Typography style={{fontSize: "12px",color:'grey'}}>~ {convertTimestamp(timestamp)}</Typography>
        <Button
          variant="text"
          style={{
            textTransform: "none !important",
            textDecoration: "underline",
          }}
          size="small"
          onClick={async() => await handleDelete(id)}
        >
          Delete
        </Button>
      </div>
      <div>{content}</div>
    </div>
  );
}

export default Message;
