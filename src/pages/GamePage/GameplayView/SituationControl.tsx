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

  if (isJudge && currentDeal?.status === DEAL_STATUS.NOT_STARTED) {
    return (
      <Backdrop open>
        <Stack alignItems="center" spacing={2}>
          <Typography variant="h5" color="white">
            В цьому раунді ти будеш суддею!
          </Typography>
          <Button variant="contained" onClick={showSituation}>
            Розпочати раунд
          </Button>
        </Stack>
      </Backdrop>
    );
  }

  if (currentDeal?.status === DEAL_STATUS.STARTED) {
    return (
      <SituatiosBox>
        <SituationCard
          text={currentSituations?.text!}
          colors={currentSituations?.colors!}
        />
      </SituatiosBox>
    );
  }

  return null;
};

const SituatiosBox = styled(Box)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 40vw;
  height: 40vh;
`;
