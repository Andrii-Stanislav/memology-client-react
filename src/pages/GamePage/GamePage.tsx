import { useParams } from "react-router-dom";
import {
  Container,
  Backdrop,
  CircularProgress,
  Typography,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";

import { getGameById } from "../../api/games";

const GamePage = () => {
  const { gameId } = useParams<{ gameId: string }>();

  const { data, isFetched } = useQuery({
    queryKey: ["getGameById", gameId!],
    queryFn: ({ queryKey }) => getGameById(queryKey[1]),
  });

  console.log("data: ", data?.data);

  if (!isFetched) {
    return (
      <Backdrop open>
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  }

  if (!data?.data) {
    return (
      <Container component="main">
        <Typography>Game not found </Typography>
      </Container>
    );
  }

  return (
    <Container component="main">
      <div>GamePage {gameId} </div>
    </Container>
  );
};

export default GamePage;
