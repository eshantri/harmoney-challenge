import { TextField } from "@mui/material";
import { useState } from "react";
import { apiUrl } from "../utils/apiEndpoints";

function InputBox({ mutate, data = [] }) {
  const [value, setValue] = useState("");
  const handlePost = async () => {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: import.meta.env.VITE_AUTHORIZATION,
      },
      body: JSON.stringify({
        text: value,
      }),
    });
    const json = await response.json();
    console.log(json);
    await mutate();
  };
  const handleDeleteAll = async () => {
    const allDeletionPromises = data.map((message) => {
      const delUrl = apiUrl + `${message.id}/`;
      return fetch(delUrl, {
        method: "DELETE",
        headers: {
          Authorization: import.meta.env.VITE_AUTHORIZATION,
        },
      });
    });
    const allResolved = await Promise.all(allDeletionPromises);
    mutate();
  };
  return (
    <div style={{ display: "flex", gap: 8, marginTop: 16, marginBottom: 16 }}>
      <TextField
        value={value}
        onChange={(e) => setValue(e.target.value)}
        id="outlined-basic"
        label="Message"
        variant="outlined"
        size="small"
      />
      <button onClick={handlePost}>Post!</button>
      <button onClick={handleDeleteAll} style={{ color: "red" }}>
        Delete All
      </button>
    </div>
  );
}

export default InputBox;
