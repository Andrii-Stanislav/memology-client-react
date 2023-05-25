import { Container, Grid, Backdrop, CircularProgress } from '@mui/material';
import { styled } from '@mui/material/styles';

import { SituationCard } from 'components/shared';
import { useAppSelector } from 'store';
import { getAllSituations, allSituationsIsLoaded } from 'store/situations';

export const Situations = () => {
  const isLoaded = useAppSelector(allSituationsIsLoaded);
  const allSituations = useAppSelector(getAllSituations);

  if (!isLoaded) {
    return (
      <Backdrop open>
        <CircularProgress />
      </Backdrop>
    );
  }

  return (
    <Container component="main">
      <Grid container spacing={2} pt={2} pb={4}>
        {allSituations.map(situation => (
          <GridItem item key={situation.id} lg={3} md={4} sm={6} xs={12}>
            <SituationCard text={situation.text} colors={situation.colors} />
          </GridItem>
        ))}
      </Grid>
    </Container>
  );
};

const GridItem = styled(Grid)`
  min-height: 200px;
`;
