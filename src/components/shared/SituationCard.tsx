import { Typography, Paper } from '@mui/material';
import { styled } from '@mui/material';

type Props = {
  text: string[];
};

export const SituationCard = ({ text }: Props) => {
  return (
    <Situatios>
      {text.map((textItem, index) => (
        <div key={textItem}>
          {index % 2 === 0 ? (
            <FirstTextItem>{textItem}</FirstTextItem>
          ) : (
            <SecondTextItem>{textItem}</SecondTextItem>
          )}
        </div>
      ))}
    </Situatios>
  );
};

const Situatios = styled(Paper)`
  width: 100%;
  height: 100%;
  background-color: #ffffff8a;
  padding: 10px;
`;

const getRandomColor = () => {
  const COLORS = {
    1: '#fb8383',
    2: '#ffe485',
    3: '#e6adad',
    4: '#f9c59d',
    5: '#e1fb83',
    6: '#83fbc7',
    7: '#83bdfb',
    8: '#a983fb',
    9: '#fb83ef',
  } as { [key: number]: string };

  return COLORS?.[Math.floor(Math.random() * 10)];
};

const FirstTextItem = styled(Typography)`
  font-weight: 600;
  background-color: ${getRandomColor()};
`;

const SecondTextItem = styled(Typography)`
  font-weight: 600;
  background-color: ${getRandomColor()};
  margin-top: 20px;
`;
