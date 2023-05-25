import { ReactElement, useState, forwardRef } from 'react';
import { Dialog, Tooltip, Box, BoxProps, Slide, Button } from '@mui/material';
import { styled } from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper';

import { Modal, GradientBox } from 'components/shared';
import { useAppSelector } from 'store';
import { getUser } from 'store/user';
import { getCurrentDeal, getCanSelectCard } from 'store/game';
import { Meme } from 'types/meme';

interface TProps extends TransitionProps {
  children: ReactElement;
}

const Transition = forwardRef((props: TProps, ref: React.Ref<unknown>) => (
  <Slide direction="up" ref={ref} {...props} />
));

type Props = {
  children: ReactElement;
  isJudge: boolean;
  cards: Meme[];
  onChooseCard: (card: Meme) => void;
};

export const CardsDialog = ({
  children,
  isJudge,
  cards,
  onChooseCard,
}: Props) => {
  const user = useAppSelector(getUser);
  const currentDeal = useAppSelector(getCurrentDeal);
  const canSelectCard = useAppSelector(getCanSelectCard);

  const userMadeBet = !!currentDeal?.bets?.some(bet => bet.userId === user?.id);

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedMeme, setSelectedMeme] = useState<Meme | null>(null);

  // const disabledOpenDialog = userMadeBet || isJudge;

  const handleClickOpen = () => {
    if (isJudge) return;
    setOpenDialog(true);
  };
  const handleClose = () => setOpenDialog(false);

  const openFullScreanModal = (meme: Meme) => {
    if (canSelectCard) setSelectedMeme(meme);
  };

  const putCardOnTable = (card: Meme) => {
    onChooseCard(card);
    setSelectedMeme(null);
    handleClose();
  };

  return (
    <>
      <StyledTooltip title="Open meme cards" onClick={handleClickOpen}>
        <Wrapper disabled={isJudge}>{children}</Wrapper>
      </StyledTooltip>

      <StyledDialog
        fullWidth
        open={openDialog}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <>
          <StyledSwiper
            slidesPerView={3}
            spaceBetween={30}
            pagination={{
              clickable: true,
            }}
            modules={[Pagination, Navigation]}
          >
            {cards.map(card => (
              <StyledSwiperSlide key={card.id}>
                <ImageBox
                  onClick={openFullScreanModal.bind(null, card)}
                  disabled={!canSelectCard}
                >
                  <Image src={card.image} alt={card.title} />
                </ImageBox>
              </StyledSwiperSlide>
            ))}
          </StyledSwiper>

          <Modal
            open={!!selectedMeme}
            onClose={setSelectedMeme.bind(null, null)}
          >
            <GradientBox>
              <Image
                src={selectedMeme?.image}
                alt={selectedMeme?.title}
                loading="lazy"
              />

              {!userMadeBet && (
                <Box p={2} display="flex" justifyContent="center">
                  <Button
                    size="large"
                    variant="contained"
                    onClick={putCardOnTable.bind(null, selectedMeme!)}
                  >
                    Select
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

interface DisabledBoxProps extends BoxProps {
  disabled: boolean;
}

const StyledTooltip = styled(Tooltip)`
  width: 100%;
  height: 100%;
`;

const Wrapper = styled(
  forwardRef(({ disabled, ...props }: DisabledBoxProps, ref) => (
    <Box ref={ref} {...props} />
  )),
)`
  width: fit-content;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
`;

const StyledDialog = styled(Dialog)`
  .MuiDialog-container {
    align-items: flex-end;
  }
  .MuiDialog-paper {
    margin: 0;
    width: 100vw;
    max-width: 100vw;
    background-color: unset;
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

const ImageBox = styled(({ disabled, ...props }: DisabledBoxProps) => (
  <Box {...props} />
))`
  object-fit: cover;
  cursor: pointer;
  max-height: 100%;
  width: 100%;
  border-radius: 8px;
  overflow: hidden;
  transition: all 0.2s ease-in-out;

  &:hover {
    transform: ${({ disabled }) => !disabled && 'scale(0.95)'};
  }
`;

const Image = styled('img')`
  width: 100%;
  vertical-align: bottom;
`;
