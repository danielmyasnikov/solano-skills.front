import { Accordion, AccordionDetails, AccordionSummary, Grid, Typography } from '@mui/material';
import { ExpandMore } from '@mui/icons-material';
import { styled } from '@mui/material/styles';

const data = [
  {
    title: 'В чем разница между бесплатной учетной записью и планами подписки?',
    desc: 'Все наши курсы, упражнения по кодированию и проекты можно выполнять, не выходя из браузера, поэтому вам не нужно будет устанавливать какое-либо новое программное или аппаратное обеспечение. Для наилучшего взаимодействия с пользователем мы рекомендуем использовать Chrome, Safari или Firefox. Мы поддерживаем IE11 или выше.',
  },
  {
    title: 'Нужно ли мне что-то знать о науке о данных, чтобы начать обучение?',
    desc: 'Все наши курсы, упражнения по кодированию и проекты можно выполнять, не выходя из браузера, поэтому вам не нужно будет устанавливать какое-либо новое программное или аппаратное обеспечение. Для наилучшего взаимодействия с пользователем мы рекомендуем использовать Chrome, Safari или Firefox. Мы поддерживаем IE11 или выше.',
  },
  {
    title: 'Нужно ли мне что-то знать о науке о данных, чтобы начать обучение?',
    desc: 'Все наши курсы, упражнения по кодированию и проекты можно выполнять, не выходя из браузера, поэтому вам не нужно будет устанавливать какое-либо новое программное или аппаратное обеспечение. Для наилучшего взаимодействия с пользователем мы рекомендуем использовать Chrome, Safari или Firefox. Мы поддерживаем IE11 или выше.',
  },
  {
    title: 'Нужно ли мне что-то знать о науке о данных, чтобы начать обучение?',
    desc: 'Все наши курсы, упражнения по кодированию и проекты можно выполнять, не выходя из браузера, поэтому вам не нужно будет устанавливать какое-либо новое программное или аппаратное обеспечение. Для наилучшего взаимодействия с пользователем мы рекомендуем использовать Chrome, Safari или Firefox. Мы поддерживаем IE11 или выше.',
  },
  {
    title: 'В чем разница между бесплатной учетной записью и планами подписки?',
    desc: 'Все наши курсы, упражнения по кодированию и проекты можно выполнять, не выходя из браузера, поэтому вам не нужно будет устанавливать какое-либо новое программное или аппаратное обеспечение. Для наилучшего взаимодействия с пользователем мы рекомендуем использовать Chrome, Safari или Firefox. Мы поддерживаем IE11 или выше.',
  },
  {
    title: 'Нужно ли мне что-то знать о науке о данных, чтобы начать обучение?',
    desc: 'Все наши курсы, упражнения по кодированию и проекты можно выполнять, не выходя из браузера, поэтому вам не нужно будет устанавливать какое-либо новое программное или аппаратное обеспечение. Для наилучшего взаимодействия с пользователем мы рекомендуем использовать Chrome, Safari или Firefox. Мы поддерживаем IE11 или выше.',
  },
  {
    title: 'В чем разница между бесплатной учетной записью и планами подписки?',
    desc: 'Все наши курсы, упражнения по кодированию и проекты можно выполнять, не выходя из браузера, поэтому вам не нужно будет устанавливать какое-либо новое программное или аппаратное обеспечение. Для наилучшего взаимодействия с пользователем мы рекомендуем использовать Chrome, Safari или Firefox. Мы поддерживаем IE11 или выше.',
  },
];

const Root = styled('section')`
  position: relative;
  padding: 70px 80px 90px;

  background: #f4ebf7;
  border-radius: 32px;

  h2 {
    font-family: 'Jost';
    font-style: normal;
    font-weight: 600;
    font-size: 48px;
    line-height: 56px;

    text-align: center;
    letter-spacing: 0.005em;

    margin-bottom: 50px;

    span {
      color: #7469ef;
    }
  }

  @media (max-width: 764px) {
    padding: 70px 40px 90px;
  }

  .bg {
    position: absolute;
    right: 0;
    top: 0;
    height: 100%;
    width: 100%;
    left: 0;
    bottom: 0;
  }
`;

const Faq = styled(Accordion)`
  border-radius: 10px !important;
  background: rgba(255, 255, 255, 0.42);
  box-shadow: none !important;
  border: 1px solid #e1e1e1;

  &.Mui-expanded {
    background-color: #7469ef;
    color: white;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    svg {
      fill: white;
    }
  }
`;

const FaqButton = styled(AccordionSummary)`
  border-radius: 10px;
  padding-left: 25px;
`;

const Details = styled(AccordionSummary)`
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  padding-left: 25px;
  background-color: transparent;
`;

export const FaqSection = () => (
  <Root>
    <h2>
      <span>Ответы</span> на на популярные вопросы
    </h2>

    <Grid spacing={4} container>
      {data.map((e) => (
        <Grid item xs={12} md={6}>
          <Faq>
            <FaqButton
              expandIcon={<ExpandMore />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>{e.title}</Typography>
            </FaqButton>
            <Details>
              <Typography>{e.desc}</Typography>
            </Details>
          </Faq>
        </Grid>
      ))}
    </Grid>
  </Root>
);
