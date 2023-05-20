import { ReactNode } from 'react';
import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

import useAuth from '../../api/hooks/useAuth';
import { GradientBox } from '../shared';
import { PageHeader } from './PageHeader';
import { BackgroundAudio } from './BackgroundAudio';

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
      <BackgroundAudio />
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

type BackgroundProps = {
  isAuth: boolean;
};

const Background = styled(({ isAuth, ...props }: BackgroundProps) => (
  <GradientBox {...props} />
))`
  opacity: ${({ isAuth }) => (isAuth ? 0.6 : 1)};
  background-size: 400% 400%;
  height: calc(100vh + 200px);
  width: calc(100vw + 200px);
  padding: 100px;
  position: fixed;
  top: -100px;
  left: -100px;
`;
