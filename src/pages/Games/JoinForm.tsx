import { forwardRef } from "react";
import { PatternFormat, PatternFormatProps } from "react-number-format";
import { Button, Box, TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useForm } from "react-hook-form";

type CustomProps = {
  value: string;
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
};

const NumericFormatCustom = forwardRef<PatternFormatProps, CustomProps>(
  function NumericFormatCustom(props, ref) {
    return (
      <PatternFormat getInputRef={ref} format="#  #  #  #  #  #" {...props} />
    );
  }
);

type FormData = {
  joinCode: string;
};

const JoinForm = () => {
  const { register, handleSubmit, formState } = useForm<FormData>();
  const { isSubmitting } = formState;

  const onSubmit = handleSubmit((values) => {
    console.log("JoinForm: ", values.joinCode.replaceAll(" ", "").trim());
  });

  return (
    <ModalBox>
      <Box p={2} width="300px" component="form" onSubmit={onSubmit}>
        <StyledTextField
          label="Game code"
          {...register("joinCode")}
          InputProps={{
            inputComponent: NumericFormatCustom as any,
          }}
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
            Join
          </Button>
        </Box>
      </Box>
    </ModalBox>
  );
};

const ModalBox = styled(Box)`
  background-color: pink;
`;

const StyledTextField = styled(TextField)`
  input {
    text-align: center;
  }
`;

export default JoinForm;
