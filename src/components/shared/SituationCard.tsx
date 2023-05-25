import { Typography, TypographyProps, Paper } from '@mui/material';
import { styled } from '@mui/material';

type Props = {
  text: string[];
  colors: string[];
};

export const SituationCard = ({ text, colors }: Props) => {
  const onTestSpeech = () => {
    // * SpeechSynthesisUtterance suсks
    // TODO - try somthing else
    // let msg = new SpeechSynthesisUtterance();
    // msg.lang = 'uk';
    // msg.text = text.reduce((acc, t) => `${acc} ${t}`, '');
    // window?.speechSynthesis.speak(msg);
  };

  return (
    <Situatios>
      {text?.map((textItem, index) => (
        <TextItem key={textItem} color={colors[index % 2]}>
          {textItem}
        </TextItem>
      ))}
    </Situatios>
  );
};

const Situatios = styled(Paper)`
  width: 100%;
  height: 100%;
  background-color: #ffffff8a;
  padding: 10px;
  cursor: pointer;
`;

interface TextItemProps extends TypographyProps {
  color: string;
}

const TextItem = styled(({ color, ...props }: TextItemProps) => (
  <Typography {...props} />
))`
  font-weight: 600;
  background-color: ${({ color }) => color};
  padding: 5px;
  border-radius: 4px;

  &:not(:last-child) {
    margin-bottom: 15px;
  }
`;
