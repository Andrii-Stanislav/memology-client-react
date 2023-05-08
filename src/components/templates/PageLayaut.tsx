import { ReactNode } from "react";
import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";

import useAuth from "../../api/hooks/useAuth";
import { GradientBox } from "../shared";
import { PageHeader } from "./PageHeader";

type Props = {
  children: ReactNode;
};

export const PageLayaut = ({ children }: Props) => {
  const { isAuth } = useAuth();

  return (
    <Wrapper>
      <Background isAuth={isAuth} />
      <InnerWrapper>
        {isAuth && <PageHeader />}

        {children}
      </InnerWrapper>
    </Wrapper>
  );
};

const Wrapper = styled(Box)`
  position: relative;
  height: 100vh;
  width: 100vw;
`;

const InnerWrapper = styled(Box)`
  position: relative;
  height: 100%;
  width: 100%;
`;

const Background = styled(GradientBox)<{ isAuth: boolean }>`
  opacity: ${({ isAuth }) => (isAuth ? 0.6 : 1)};
  background-size: 400% 400%;
  height: calc(100vh + 200px);
  width: calc(100vw + 200px);
  padding: 100px;
  position: fixed;
  top: -100px;
  left: -100px;
`;
