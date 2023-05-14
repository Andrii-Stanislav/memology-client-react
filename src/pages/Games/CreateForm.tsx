import { Button, Box, Grid, TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useForm } from "react-hook-form";

type FormData = {
  title: string;
  playersCount: number;
  totalCardsPerUser: number;
  cardsOnHands: number;
};

const FormProps = {
  defaultValues: {
    title: "",
    playersCount: 4,
    totalCardsPerUser: 20,
    cardsOnHands: 5,
  },
};

export const CreateForm = () => {
  const { register, handleSubmit, formState } = useForm<FormData>(FormProps);
  const { isSubmitting } = formState;

  const onSubmit = handleSubmit((values) => {
    console.log("CreateForm: ", values);
  });

  return (
    <ModalBox>
      <Box p={2} width="300px" component="form" onSubmit={onSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Game name"
              {...register("title")}
              fullWidth
              variant="outlined"
              disabled={isSubmitting}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Players"
              {...register("playersCount")}
              fullWidth
              type="number"
              variant="outlined"
              disabled
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Cards per user"
              {...register("totalCardsPerUser")}
              fullWidth
              type="number"
              variant="outlined"
              disabled
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Cards on hands"
              {...register("cardsOnHands")}
              fullWidth
              type="number"
              variant="outlined"
              disabled
            />
          </Grid>
        </Grid>

        <Box pt={2}>
          <Button
            type="submit"
            fullWidth
            variant="outlined"
            disabled={isSubmitting}>
            Create
          </Button>
        </Box>
      </Box>
    </ModalBox>
  );
};

const ModalBox = styled(Box)`
  background-color: lightblue;
`;

export default CreateForm;
