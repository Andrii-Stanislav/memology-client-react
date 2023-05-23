import { useState } from 'react';
import {
  Container,
  ImageList,
  ImageListItem,
  Backdrop,
  CircularProgress,
  Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';

import { useAppSelector } from '../../store';
import { getAllMemes, allMemesIsLoaded } from '../../store/memes';
import { Modal, GradientBox } from '../../components/shared';
import type { Meme } from '../../types/meme';

export const Home = () => {
  const [specificMeme, setSpecificMeme] = useState<Meme | null>(null);
  const handleClose = () => setSpecificMeme(null);

  const memesIsLoaded = useAppSelector(allMemesIsLoaded);
  const memes = useAppSelector(getAllMemes);

  const isLargeImage = (i: number) => i % 10 === 0 || (3 + i) % 10 === 0;

  if (!memesIsLoaded) {
    return (
      <Backdrop open>
        <CircularProgress />
      </Backdrop>
    );
  }

  return (
    <Container component="main">
      <ImageList variant="quilted" cols={4} gap={16}>
        {memes.map((meme, index) => (
          <StyledImageListItem
            key={meme.id}
            cols={isLargeImage(index) ? 2 : 1}
            rows={isLargeImage(index) ? 2 : 1}
            onClick={setSpecificMeme.bind(null, meme)}
          >
            <img src={meme.image} alt={meme.title} loading="lazy" />
          </StyledImageListItem>
        ))}
      </ImageList>

      <Modal open={!!specificMeme} onClose={handleClose}>
        <GradientBox>
          <Typography variant="h5" p={2}>
            Title: {specificMeme?.title ? specificMeme?.title : '-'}
          </Typography>
          <img
            width="100%"
            src={specificMeme?.image}
            alt={specificMeme?.title}
            loading="lazy"
          />
          <Typography variant="body2" p={2}>
            Description:{' '}
            {specificMeme?.description ? specificMeme?.description : '-'}
          </Typography>
        </GradientBox>
      </Modal>
    </Container>
  );
};

const StyledImageListItem = styled(ImageListItem)`
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    transform: scale(1.05);
  }
`;
