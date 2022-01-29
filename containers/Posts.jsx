import { useEffect } from "react";
import { inject, observer } from "mobx-react";
import { Box, Skeleton } from "@mui/material";
import useSWR from "swr";
import { usePersistentStore } from "../store";

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

export default observer(function Posts(props) {
  const store = usePersistentStore();
  const fetcher = async (url) =>
    await fetch(url)
      .then(async (res) => {
        await delay(5000);
        return res.json();
      })
      .then((data) => store.postData(data));

  const { data, error, mutate } = useSWR(
    "https://jsonplaceholder.typicode.com/posts",
    fetcher
  );
  useEffect(() => {
    console.log("useEffect", error, data);

    return () => {
      console.log("unmount", error, data);
    };
  }, [error, data]);

  if (!data)
    return (
      <Box sx={{ textAlign: "center", mt: 2 }}>
        <Skeleton variant="text" animation="wave" width={210} />
        <Skeleton variant="text" animation="wave" width={210} />
        <Skeleton variant="text" animation="wave" width={210} />
      </Box>
    );
  if (error) return <p>Error!</p>;
  if (data && data.length) {
    data[0].log();
  } else {
    mutate();
  }
  return (
    <Box>
      {data.map((item) => (
        <p key={item.id}>{item.title}</p>
      ))}
    </Box>
  );
});
