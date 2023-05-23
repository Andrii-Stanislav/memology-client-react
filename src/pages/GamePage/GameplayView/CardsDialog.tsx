import { ReactElement, useState, forwardRef } from 'react';
import { Dialog, Tooltip, Box, Slide } from '@mui/material';
import { styled } from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper';

import { Meme } from '../../../types/meme';

interface TProps extends TransitionProps {
  children: ReactElement;
}

const Transition = forwardRef((props: TProps, ref: React.Ref<unknown>) => (
  <Slide direction="up" ref={ref} {...props} />
));

type Props = {
  children: ReactElement;
  cards: Meme[];
};

export const CardsDialog = ({ children, cards }: Props) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  return (
    <>
      <StyledTooltip title="Open meme cards" onClick={handleClickOpen}>
        <Wrapper>{children}</Wrapper>
      </StyledTooltip>

      <StyledDialog
        fullWidth
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
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
              <ImageBox>
                <Image src={card.image} alt={card.title} />
              </ImageBox>
            </StyledSwiperSlide>
          ))}
        </StyledSwiper>
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
  min-height: 30vw;
  height: 30vw;
`;

const ImageBox = styled(Box)`
  object-fit: cover;
  cursor: pointer;
`;

const Image = styled('img')`
  width: 100%;
  height: 100%;
`;
