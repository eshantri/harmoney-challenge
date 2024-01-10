import { Button } from "@mui/material";
import { apiUrl } from "../utils/apiEndpoints";
import Message from "./Message";
import { useState } from "react";

function MessageList({ data = [], error, isLoading, mutate }) {
  console.log(data, error, isLoading);
  const [sort, setSort] = useState("ASC");
  if (isLoading || (!Array.isArray(data) && typeof data === "string"))
    return "Loading....";
  const filteredData = sort==='DESC'? data.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)) :data.sort((a, b) =>new Date(a.timestamp) - new Date(b.timestamp));

  const handleSort = () => {
    setSort(sort === "ASC" ? "DESC" : "ASC");
  };
  return (
    <div>
      <Button onClick={handleSort}>Sort By {sort}</Button>
      {filteredData.map((text, index) => (
        <Message
          key={text?.id}
          id={text?.id}
          userName={text.source}
          content={text.text}
          timestamp={text.timestamp}
          mutate={mutate}
        />
      ))}
    </div>
  );
}

export default MessageList;
