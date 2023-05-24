import { Button, Backdrop, Typography, Stack, Box } from '@mui/material';
import { styled } from '@mui/material';

import { SituationCard } from 'components/shared';
import { useAppSelector } from 'store';
import { getAllSituations } from 'store/situations';
import { Deal, DEAL_STATUS } from 'types/game';

type Props = {
  currentDeal: Deal | null;
  isJudge: boolean;
  showSituation: () => void;
};

export const SituationControl = ({
  currentDeal,
  isJudge,
  showSituation,
}: Props) => {
  const allSituations = useAppSelector(getAllSituations);

  const currentSituations = allSituations.find(
    situation => situation.id === currentDeal?.situationId,
  );

  return (
    <>
      {isJudge && currentDeal?.status === DEAL_STATUS.NOT_STARTED && (
        <Backdrop open>
          <Stack alignItems="center" spacing={2}>
            <Typography variant="h5" color="white">
              In this round you will be judge!
            </Typography>
            <Button variant="contained" onClick={showSituation}>
              Start deal
            </Button>
          </Stack>
        </Backdrop>
      )}

      {currentDeal?.status === DEAL_STATUS.STARTED && (
        <SituatiosBox>
          <SituationCard
            text={currentSituations?.text!}
            colors={currentSituations?.colors!}
          />
        </SituatiosBox>
      )}
    </>
  );
};

const SituatiosBox = styled(Box)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 40vw;
  height: 40vh;
`;
