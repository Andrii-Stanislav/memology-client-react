import { useState } from 'react';
import {
  Container,
  ImageList,
  ImageListItem,
  Backdrop,
  CircularProgress,
  Typography,
  Button,
  Box,
} from '@mui/material';
import { styled } from '@mui/material/styles';

import { Modal, GradientBox } from 'components/shared';
import { useAppSelector } from 'store';
import { getAllMemes, allMemesIsLoaded } from 'store/memes';
import type { Meme } from 'types/meme';

import { SuggestMemeForm } from './SuggestMemeForm';

export const Memes = () => {
  const [suggestDialog, setSuggestDialog] = useState(false);
  const [specificMeme, setSpecificMeme] = useState<Meme | null>(null);
  const handleClose = () => setSpecificMeme(null);

  const memesIsLoaded = useAppSelector(allMemesIsLoaded);
  const memes = useAppSelector(getAllMemes);

  const isLargeImage = (i: number) => i % 10 === 0 || (3 + i) % 10 === 0;

  const openSuggestDialog = () => setSuggestDialog(true);
  const closeSuggestDialog = () => setSuggestDialog(false);

  // TODO
  // const onSuggestMeme = () => {
  //
  // };

  if (!memesIsLoaded) {
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
          Запропонувати мемасік
        </Button>
      </Box>
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
            Заловок: {specificMeme?.title ? specificMeme?.title : '-'}
          </Typography>
          <img
            width="100%"
            src={specificMeme?.image}
            alt={specificMeme?.title}
            loading="lazy"
          />
          <Typography variant="body2" p={2}>
            Опис: {specificMeme?.description ? specificMeme?.description : '-'}
          </Typography>
        </GradientBox>
      </Modal>

      <Modal open={suggestDialog} onClose={closeSuggestDialog}>
        <SuggestMemeForm afterSubmit={closeSuggestDialog} />
      </Modal>
    </Container>
  );
};

const StyledImageListItem = styled(ImageListItem)`
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  background-color: #ffffff6d;
  border-radius: 8px;
  overflow: hidden;

  &:hover {
    transform: scale(1.05);
  }
`;
