import { useState } from "react";
import { Container, Stack, Button } from "@mui/material";

import { Modal } from "../../components/shared";

import CreateForm from "./CreateForm";
import JoinForm from "./JoinForm";

const Game = () => {
  const [openCreate, setOpenCreate] = useState(false);
  const [openJoin, setOpenJoin] = useState(false);

  const onCreateOpen = () => setOpenCreate(true);
  const onCreateClose = () => setOpenCreate(false);

  const onJoinOpen = () => setOpenJoin(true);
  const onCloseJoin = () => setOpenJoin(false);

  return (
    <>
      <Container component="main">
        <Stack
          direction="column"
          alignItems="center"
          pt={8}
          spacing={4}
          maxWidth="400px"
          mr="auto"
          ml="auto"
        >
          <Button
            variant="outlined"
            fullWidth
            size="large"
            onClick={onCreateOpen}
          >
            Creacte new game
          </Button>
          <Button
            variant="outlined"
            fullWidth
            size="large"
            onClick={onJoinOpen}
          >
            Join game
          </Button>
        </Stack>
      </Container>

      <Modal open={openCreate} onClose={onCreateClose}>
        <CreateForm />
      </Modal>
      <Modal open={openJoin} onClose={onCloseJoin}>
        <JoinForm />
      </Modal>
    </>
  );
};

export default Game;
