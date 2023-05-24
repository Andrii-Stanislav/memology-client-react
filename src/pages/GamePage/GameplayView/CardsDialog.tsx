import { ReactElement, useState, forwardRef } from 'react';
import { Dialog, Tooltip, Box, BoxProps, Slide, Button } from '@mui/material';
import { styled } from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper';

import { Modal, GradientBox } from 'components/shared';
import { useAppSelector } from 'store';
import { getCanSelectCard } from 'store/game';
import { Meme } from 'types/meme';

interface TProps extends TransitionProps {
  children: ReactElement;
}

const Transition = forwardRef((props: TProps, ref: React.Ref<unknown>) => (
  <Slide direction="up" ref={ref} {...props} />
));

type Props = {
  children: ReactElement;
  cards: Meme[];
  onChooseCard: (card: Meme) => void;
};

export const CardsDialog = ({ children, cards, onChooseCard }: Props) => {
  const canSelectCard = useAppSelector(getCanSelectCard);

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedMeme, setSelectedMeme] = useState<Meme | null>(null);

  const handleClickOpen = () => setOpenDialog(true);
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
        <Wrapper>{children}</Wrapper>
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
              <Box p={2} display="flex" justifyContent="center">
                <Button
                  size="large"
                  variant="contained"
                  onClick={putCardOnTable.bind(null, selectedMeme!)}
                >
                  Select
                </Button>
              </Box>
            </GradientBox>
          </Modal>
        </>
      </StyledDialog>
    </>
  );
};

const StyledTooltip = styled(Tooltip)`
  width: 100%;
  height: 100%;
`;

const Wrapper = styled(Box)`
  cursor: pointer;
  width: fit-content;
  display: flex;
  align-items: center;
  justify-content: center;
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

interface ImageBoxProps extends BoxProps {
  disabled: boolean;
}

const ImageBox = styled(({ disabled, ...props }: ImageBoxProps) => (
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
