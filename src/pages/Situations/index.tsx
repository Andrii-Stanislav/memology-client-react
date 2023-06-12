import { useState } from 'react';
import {
  Container,
  Grid,
  Backdrop,
  CircularProgress,
  Box,
  Button,
} from '@mui/material';
import { styled } from '@mui/material/styles';

import { SituationCard, Modal } from 'components/shared';
import { useAppSelector } from 'store';
import { getAllSituations, allSituationsIsLoaded } from 'store/situations';

import { SuggestSituationForm } from './SuggestSituationForm';

export const Situations = () => {
  const [suggestDialog, setSuggestDialog] = useState(false);

  const openSuggestDialog = () => setSuggestDialog(true);
  const closeSuggestDialog = () => setSuggestDialog(false);

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
      <Box pt={2} display="flex" justifyContent="center">
        <Button variant="outlined" onClick={openSuggestDialog}>
          Запропонувати ситуацію
        </Button>
      </Box>

      <Grid container spacing={2} pt={2} pb={4}>
        {allSituations.map(situation => (
          <GridItem item key={situation.id} lg={3} md={4} sm={6} xs={12}>
            <SituationCard text={situation.text} colors={situation.colors} />
          </GridItem>
        ))}
      </Grid>

      <Modal open={suggestDialog} onClose={closeSuggestDialog}>
        <SuggestSituationForm afterSubmit={closeSuggestDialog} />
      </Modal>
    </Container>
  );
};

const GridItem = styled(Grid)`
  min-height: 200px;
`;
