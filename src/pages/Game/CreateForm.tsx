import { Button, Box, TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useForm } from "react-hook-form";

type FormData = {
  gameName: string;
};

const CreateForm = () => {
  const { register, handleSubmit, formState } = useForm<FormData>();
  const { isSubmitting } = formState;

  const onSubmit = handleSubmit((values) => {
    console.log("CreateForm: ", values.gameName);
  });

  return (
    <ModalBox>
      <Box p={2} width="300px" component="form" onSubmit={onSubmit}>
        <StyledTextField
          label="Game name"
          {...register("gameName")}
          fullWidth
          variant="outlined"
          disabled={isSubmitting}
        />
        <Box pt={2}>
          <Button
            type="submit"
            fullWidth
            variant="outlined"
            disabled={isSubmitting}
          >
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

const StyledTextField = styled(TextField)`
  input {
    text-align: center;
  }
`;

export default CreateForm;
