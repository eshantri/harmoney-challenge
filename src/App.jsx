import { Typography } from "@mui/material";
import MessageList from "./components/MessageList";
import InputBox from "./components/inputBox";
import useSWR, { mutate } from "swr";
import { apiUrl } from "./utils/apiEndpoints";

const fetcher = ([url, token]) =>
  fetch(url, { headers: { Authorization: token } }).then((res) => res.json());

function App() {
  const { data, error, isLoading, mutate } = useSWR(
    [apiUrl, import.meta.env.VITE_AUTHORIZATION],
    fetcher
  );
  return (
    <>
      <Typography variant="h5" style={{ fontWeight: 600 }}>
        Chatter
      </Typography>
      <Typography variant="p" style={{ fontWeight: 600, color: "grey" }}>
        Type Something in the box below then hit &quot;Post&quot;
      </Typography>
      <InputBox mutate={mutate} data={data}/>
      <MessageList isLoading={isLoading} data={data} error={error} mutate={mutate}/>
    </>
  );
}

export default App;
