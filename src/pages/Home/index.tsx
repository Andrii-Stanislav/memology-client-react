import { memo, Fragment } from 'react';
import { Container, Stack, Typography, Box } from '@mui/material';
import { styled } from '@mui/material';

import {
  RunningLineLeft,
  RunningLineRight,
  GameTypography,
} from 'components/shared';

const BackgroundRunningLines = memo(() => (
  <>
    {Array(8)
      .fill(null)
      .map((_, index) => (
        <Fragment key={index}>
          <RunningLineLeft height="6vw">
            <MemologyTypography>Мемологія</MemologyTypography>
            <MemologyTypography>Мемологія</MemologyTypography>
          </RunningLineLeft>
          <RunningLineRight height="6vw">
            <MemologyTypography>Мемологія</MemologyTypography>
            <MemologyTypography>Мемологія</MemologyTypography>
          </RunningLineRight>
        </Fragment>
      ))}
  </>
));

export const Home = () => {
  return (
    <Container component="main">
      <Background>
        <BackgroundRunningLines />
      </Background>
      <ContentBox>
        <Typography variant="h3" textAlign="center" pb={2}>
          Гра "Мемологія"
        </Typography>
        <ScrollStack>
          <Typography variant="h5" pb={2}>
            Базові правила
          </Typography>
          <Typography>
            Перший гравець повинен створити гру та поділитися посиланням на неї.
            Окрім посилання на гру, також потрібно скинути друзям супер-пупер
            секретний код, без якого в них погратися не вийде((
          </Typography>
          <Typography>
            Знайдіть 2 або більше друзів та прєднайтеся до гри. Якщо у вас немає
            друзів, то ця гра не для вас. Але вона може допомогти вам знайти їх
            :)
          </Typography>
          <Typography>
            А якщо ви не розібралися як як приєднатися до гри, то я взагали не
            розумію як ви виживаєте в цей технологичний час. Передплачуєте
            газетки, користуєтеся факсом та пейджером?)
          </Typography>
          <Typography>
            На початку гри кожен гравець отримає певну килькість карток з мемам.
          </Typography>
          <Typography>
            Гравець який це все затіяв, стає суддею і починає гру.
          </Typography>
          <Typography>
            Суддя починає раунд після чого на екрані з'явится текстова картка.
            Текстові картки — це картки, на яких є текст (дякую, Кеп!) Всі інші
            гравці мають кілька хвилин, щоб вирішити, яка з їхніх карток з
            мемами найсмішніше зіставляється з даною текстовою карткою, та
            кидають її на стіл.
          </Typography>

          <Typography>
            Як тільки всі гравці виклали по одному мему, суддя обирає
            найсмішнішу картку (HА ЙОГО ВЛАСНУ ДУМКУ), а гравець, який її
            поставив, виграє цей раунд. Переможець дзвонить мамі, щоб
            розповісти, який молодець і таке інше:)
          </Typography>
          <Typography>
            Далі, суддя завершує поточний раунд, а переможець стає новим суддею
            на наступний раунд.
          </Typography>
          <Typography>
            Гра триває до того моменту, поки всі не втомляться сміятися або коли
            доставка вашої їжі нарешті приїде. Гравець з найбільшою кількістю
            фотокарток в кінці гри стає Королем Мемів.
          </Typography>

          {/* 
          // TODO
          */}
          {/* <Typography variant="h5" py={2}>
            Додаткові правила
          </Typography> */}
          {/* <Typography>
            Якщо вам випала картка «Придумай сам (а)», ви повинні самостійно
            придумати смішний текст і сказати його вголос, коли суддя її
            побачить. Якщо ви недостатньо хоробрі, можете написати його на
            клаптику паперу. Кожен гравець має право раз за гру змінити свої
            картки (від однієї до всіх семи).
          </Typography> */}
          {/* <Typography>
            Рекомендуємо додавати ваші власні фотокартки в гру. Ви навіть не
            можете уявити, наскільки смішно грати з фотокартками людей, яких ви
            знаєте в реальному житті!
          </Typography> */}
        </ScrollStack>
      </ContentBox>
    </Container>
  );
};

const Background = styled(Box)`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  pointer-events: none;
  z-index: -1;
`;

const MemologyTypography = styled(GameTypography)`
  font-size: 4vw;
  text-transform: uppercase;
`;

const ContentBox = styled(Box)`
  position: relative;
  padding: 16px;
  background-color: #ffffff5c;
  border-radius: 16px;
  max-height: 90vh;
  overflow: hidden;
`;

const ScrollStack = styled(Stack)`
  max-height: 90vh;
  overflow-y: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;
