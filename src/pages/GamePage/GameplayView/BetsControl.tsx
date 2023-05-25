import { ReactElement, forwardRef, useState, useEffect } from 'react';
import {
  Dialog,
  Box,
  Slide,
  Button,
  Typography,
  Stack,
  Backdrop,
} from '@mui/material';
import { styled } from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper';

import { Modal, GradientBox } from 'components/shared';
import { useAppSelector } from 'store';
import { getAllMemes } from 'store/memes';
import { getCurrentDealVinner } from 'store/game';
import { Bet, Deal, DEAL_STATUS } from 'types/game';
import type { Meme } from 'types/meme';

interface TProps extends TransitionProps {
  children: ReactElement;
}

const Transition = forwardRef((props: TProps, ref: React.Ref<unknown>) => (
  <Slide direction="down" ref={ref} {...props} />
));

type Props = {
  isJudge: boolean;
  currentDeal: Deal | null;
  onSelectViner: (dealId: number, userId: number) => void;
  goToNextDeal: (vinerId: number) => void;
};

type ModalType = {
  bet: Bet | null;
  meme: Meme | null;
};

const INIT_MODAL = {
  bet: null,
  meme: null,
};

export const BetsControl = ({
  isJudge,
  currentDeal,
  onSelectViner,
  goToNextDeal,
}: Props) => {
  const allMemes = useAppSelector(getAllMemes);
  const dealViner = useAppSelector(getCurrentDealVinner);

  const [openDialog, setOpenDialog] = useState(false);
  const [modal, setModal] = useState<ModalType>(INIT_MODAL);

  const openFullScreanModal = (bet: Bet, meme: Meme) => {
    setModal({ bet, meme });
  };

  const handlerSelectViner = () => {
    onSelectViner(modal.bet?.dealId!, modal.bet?.userId!);
    setModal(INIT_MODAL);
  };

  useEffect(() => {
    if ((currentDeal?.bets ?? []).length > 0) {
      setOpenDialog(true);
    }
  }, [currentDeal?.bets]);

  if (currentDeal?.status === DEAL_STATUS.NOT_STARTED) {
    return null;
  }

  if (currentDeal?.status === DEAL_STATUS.FINISHED) {
    return (
      <Backdrop open>
        <Stack spacing={2} alignItems="center">
          <Typography variant="h5" color="white">
            Vinner : {dealViner?.name}
          </Typography>
          {isJudge && (
            <Button
              variant="contained"
              onClick={goToNextDeal.bind(null, dealViner?.userId!)}
            >
              Go to next deal
            </Button>
          )}
        </Stack>
      </Backdrop>
    );
  }

  return (
    <>
      {!openDialog && (
        <ShowButton variant="outlined" onClick={setOpenDialog.bind(null, true)}>
          Show cards
        </ShowButton>
      )}

      <StyledDialog
        fullWidth
        open={openDialog}
        TransitionComponent={Transition}
      >
        <>
          <Button
            fullWidth
            size="small"
            onClick={setOpenDialog.bind(null, false)}
          >
            Hide cards
          </Button>

          <StyledSwiper
            slidesPerView={3}
            spaceBetween={30}
            pagination={{
              clickable: true,
            }}
            modules={[Pagination, Navigation]}
          >
            {(currentDeal?.bets ?? []).map(bet => {
              const meme = allMemes.find(({ id }) => id === bet.cardId);
              if (!meme) return null;

              return (
                <StyledSwiperSlide key={meme.id}>
                  <ImageBox onClick={openFullScreanModal.bind(null, bet, meme)}>
                    <Image src={meme.image} alt={meme.title} />
                  </ImageBox>
                </StyledSwiperSlide>
              );
            })}
          </StyledSwiper>

          <Modal open={!!modal.bet} onClose={setModal.bind(null, INIT_MODAL)}>
            <GradientBox>
              <Image
                src={modal.meme?.image}
                alt={modal.meme?.title}
                loading="lazy"
              />
              {isJudge && (
                <Box p={2} display="flex" justifyContent="center">
                  <Button
                    size="large"
                    variant="contained"
                    onClick={handlerSelectViner}
                  >
                    Select as deal viner
                  </Button>
                </Box>
              )}
            </GradientBox>
          </Modal>
        </>
      </StyledDialog>
    </>
  );
};

const ShowButton = styled(Button)`
  position: absolute;
  top: 40px;
  left: 10%;
  width: 80%;
`;

const StyledDialog = styled(Dialog)`
  pointer-events: none;

  .MuiBackdrop-root {
    background-color: transparent;
    pointer-events: none;
  }
  .MuiDialog-container {
    align-items: flex-start;
    pointer-events: none;
  }
  .MuiDialog-paper {
    margin: 0;
    width: 100vw;
    max-width: 100vw;
    background-color: #ffffffa8;
    pointer-events: all;
  }
`;

const StyledSwiper = styled(Swiper)`
  width: 100%;
`;

const StyledSwiperSlide = styled(SwiperSlide)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 30vw;
  min-height: 30vw;
  display: flex;
  align-items: center;
`;

const ImageBox = styled(Box)`
  object-fit: cover;
  cursor: pointer;
  max-height: 100%;
  width: 100%;
  border-radius: 8px;
  overflow: hidden;
  transition: all 0.2s ease-in-out;

  &:hover {
    transform: scale(0.95);
  }
`;

const Image = styled('img')`
  width: 100%;
  vertical-align: bottom;
`;
