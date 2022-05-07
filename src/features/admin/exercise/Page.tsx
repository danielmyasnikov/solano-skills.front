import { useGetCourseQuery, useGetCoursesQuery } from '@src/features/courses/courses.api';
import {
  Avatar,
  Box,
  Breadcrumbs,
  Button,
  Card,
  CardContent,
  Container,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  InputLabel,
  Link,
  MenuItem,
  Select,
  Stack,
  Switch,
  Tab,
  Tabs,
  TextField,
  Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetExerciseQuery } from '@src/features/exercises/store/exercises.api';
import { url_slug } from '@src/features/admin/course/slug-util';
import RadioButton from './RadioButton';
import AddIcon from '@mui/icons-material/Add';
import Editor, { useMonaco } from '@monaco-editor/react';

import styles from './styles.module.less';

const Wrapper = styled('div')`
  display: flex;
  flex-direction: column;

  padding-top: 64px;
  padding-bottom: 64px;
`;

const AdminInput = styled(TextField)`
  & > div {
    border-radius: 4px;
  }
`;

const QuizRadioButton = styled(RadioButton)`
  cursor: pointer;

  label {
    cursor: pointer;

    font-size: 16px;
    align-items: flex-start;
  }

  span {
    font-family: 'Nunito', sans-serif;
    font-size: 16px;
    line-height: normal;
    letter-spacing: normal;
  }
`;

function dec2hex(dec: any) {
  return dec.toString(16).padStart(2, '0');
}

function generateId() {
  const arr = new Uint8Array(40 / 2);
  window.crypto.getRandomValues(arr);
  return Array.from(arr, dec2hex).join('-');
}

export default function ExercisePage() {
  const { courseId, exerciseId } = useParams<{ courseId: string; exerciseId: string }>();

  const [tab, setTab] = useState('video');

  const [translateTitle, setTranslateTitle] = useState(false);
  const [inDevelop, setInDevelop] = useState(true);

  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [tempSlug, setTempSlug] = useState('');

  const [description, setDescription] = useState('');
  const [instruction, setInstruction] = useState('');

  const [exerciseCourseId, setExerciseCourseId] = useState('');
  const [coursePart, setCoursePart] = useState(1);

  const [xp, setXp] = useState(0);
  const [hint, setHint] = useState('');

  const [preCode, setPreCode] = useState('');

  const [transcript, setTranscript] = useState('');

  const [instructorId, setInstructorId] = useState(1);

  const [quizAnswers, setQuizAnswers] = useState<
    {
      id: string;
      error: string;
      content: string;
      isCorrect: boolean;
    }[]
  >([]);

  const instructors: {
    id: number;
    first_name: string;
    last_name: string;
    avatar_url: string;
  }[] = [
    {
      id: 1,
      first_name: 'Виталий',
      last_name: 'Кулиев',
      avatar_url: 'https://storage.yandexcloud.net/solanoskills-avatars/vitaly-kuliev.jpg',
    },
  ];

  const {
    data: exercise,
    isLoading: isLoadingEx,
    error: exErr,
  } = useGetExerciseQuery({ courseId, exerciseId });
  const {
    data: course,
    isLoading: isLoadingCourse,
    error: courseErr,
  } = useGetCourseQuery(courseId);
  const { data: courses, isLoading: isLoadingCourses, error: coursesErr } = useGetCoursesQuery({});

  useEffect(() => {
    if (!exercise) {
      return;
    }

    setTitle(exercise.title);
    setSlug(exercise.slug);
    setTempSlug(url_slug(exercise.title));

    setPreCode(exercise.pre_code);

    setTab(exercise.type);
    setXp(exercise.xp);
    setTranscript(exercise.transcript);

    setDescription(exercise.description);
    setInstruction(exercise.instruction);
    setHint(exercise.hint);
  }, [exercise]);

  useEffect(() => {
    if (!course) {
      return;
    }

    setExerciseCourseId(course.slug);
  }, [course]);

  if (isLoadingEx || isLoadingCourse || isLoadingCourses) {
    return <>Loading...</>;
  }

  if (exErr || courseErr || coursesErr) {
    return <>Что-то пошло не так...</>;
  }

  return (
    <Container>
      <Wrapper>
        <Breadcrumbs sx={{ mb: '16px' }}>
          <Link underline="hover" color="inherit" href="/admin">
            Admin Panel
          </Link>
          <Link underline="hover" color="inherit" href="/admin/courses">
            Курсы
          </Link>
          <Link underline="hover" color="inherit" href={`/admin/courses/${course.slug}`}>
            {course.title}
          </Link>
          <Link
            underline="hover"
            color="inherit"
            href={`/admin/courses/${course.slug}?tab=exercises`}
          >
            Упражнения
          </Link>
          <Typography color="text.primary">{exercise.title}</Typography>
        </Breadcrumbs>
        <Card sx={{ borderRadius: '12px' }}>
          <CardContent>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={tab} onChange={(e, v) => setTab(v)}>
                <Tab label="Видео" value="video" />
                <Tab label="Обычное" value="normal_exercise" />
                <Tab label="Quiz" value="quiz" />
                <Tab label="Multi Ex" value="bullet_point_exercise" />
                <Tab label="Single DnD" value="single_bascket" />
                <Tab label="Multi DnD" value="multiple_bascket" />
              </Tabs>
            </Box>
            <Grid container sx={{ pt: '24px' }} spacing={4}>
              <>
                <Grid item xs={10} md={5}>
                  <AdminInput
                    label="Название"
                    value={title}
                    fullWidth
                    onChange={(e) => {
                      setTitle(e.target.value);
                      setTempSlug(url_slug(e.target.value));
                    }}
                  />
                </Grid>
                <Grid
                  item
                  xs={2}
                  md={1}
                  sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                  <FormControlLabel
                    sx={{ m: 0 }}
                    value={translateTitle}
                    control={
                      <Switch
                        checked={translateTitle}
                        onChange={() => {
                          setTranslateTitle(!translateTitle);
                        }}
                      />
                    }
                    label="авто"
                    labelPlacement="top"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <AdminInput
                    label="Url"
                    value={translateTitle ? tempSlug : slug}
                    fullWidth
                    onChange={(e) => {
                      if (translateTitle) {
                        setTempSlug(url_slug(e.target.value));
                      } else {
                        setSlug(url_slug(e.target.value));
                      }
                    }}
                  />
                </Grid>
                <Grid item xs={8} md={4}>
                  <FormControl fullWidth>
                    <InputLabel id="course-label">Курс</InputLabel>
                    <Select
                      labelId="course-label"
                      id="course-select"
                      value={exerciseCourseId}
                      label="Курс"
                      onChange={(e) => setExerciseCourseId(e.target.value)}
                      sx={{ borderRadius: '6px' }}
                    >
                      {courses.map((e: any) => (
                        <MenuItem key={e.slug} value={e.slug}>
                          {e.title}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={4} md={2}>
                  <FormControl fullWidth>
                    <InputLabel id="course-part-label">Часть Курса</InputLabel>
                    <Select
                      labelId="course-part-label"
                      id="course-part-select"
                      value={coursePart}
                      label="Часть Курса"
                      onChange={(e) => setCoursePart(Number(e.target.value))}
                      sx={{ borderRadius: '6px' }}
                    >
                      <MenuItem value={1}>1</MenuItem>
                      <MenuItem value={2}>2</MenuItem>
                      <MenuItem value={3}>3</MenuItem>
                      <MenuItem value={4}>4</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={4} md={2}>
                  <AdminInput
                    label="XP"
                    value={xp}
                    fullWidth
                    type="number"
                    inputProps={{
                      inputMode: 'numeric',
                      pattern: '[0-9]*',
                      min: 0,
                    }}
                    onChange={(e) => {
                      setXp(Number(e.target.value));
                    }}
                  />
                </Grid>
                {tab === 'video' && (
                  <Grid item xs={12} md={4}>
                    <FormControl fullWidth>
                      <InputLabel id="instructor-label">Инструктор</InputLabel>
                      <Select
                        labelId="instructor-label"
                        id="instructor-select"
                        value={instructorId}
                        label="Инструктор"
                        onChange={(e) => setInstructorId(Number(e.target.value))}
                        sx={{
                          borderRadius: '6px',
                          '& > div': {
                            display: 'flex',
                            alignItems: 'center',
                            gap: '16px',
                          },
                        }}
                      >
                        {instructors.map((e) => (
                          <MenuItem
                            key={e.id}
                            value={e.id}
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '16px',
                            }}
                          >
                            <Avatar
                              src={e.avatar_url}
                              sx={{
                                width: '24px',
                                height: '24px',
                              }}
                            />
                            <Typography>
                              {e.first_name} {e.last_name}
                            </Typography>
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                )}
                {tab === 'video' && (
                  <Grid item xs={12}>
                    <AdminInput
                      label="Расшифровка"
                      value={transcript}
                      fullWidth
                      multiline
                      onChange={(e) => {
                        setTranscript(e.target.value);
                      }}
                    />
                  </Grid>
                )}
                {tab !== 'video' && tab !== 'bullet_point_exercise' && (
                  <>
                    <Grid item xs={12}>
                      <AdminInput
                        label="Описание"
                        value={description}
                        fullWidth
                        multiline
                        onChange={(e) => {
                          setDescription(e.target.value);
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <AdminInput
                        label="Инструкции"
                        value={instruction}
                        fullWidth
                        multiline
                        onChange={(e) => {
                          setInstruction(e.target.value);
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <AdminInput
                        label="Подсказка"
                        value={hint}
                        fullWidth
                        multiline
                        onChange={(e) => {
                          setHint(e.target.value);
                        }}
                      />
                    </Grid>
                    {tab !== 'single_bascket' && tab !== 'multiple_bascket' && (
                      <Grid item xs={12}>
                        <Typography sx={{ mb: '24px' }}>Pre Exercise Code</Typography>
                        <Box className={styles.terminal}>
                          <Editor
                            language="python"
                            theme="light"
                            className="editor"
                            width="100%"
                            value={preCode}
                            options={{
                              fontSize: 16,
                              wordWrap: 'on',
                              snippetSuggestions: 'bottom',
                              tabSize: 4,
                              quickSuggestions: true,
                            }}
                            onChange={(e) => setPreCode(e || '')}
                          />
                        </Box>
                      </Grid>
                    )}
                    {tab === 'quiz' && (
                      <Grid item xs={12}>
                        <Typography sx={{ mb: quizAnswers.length > 0 ? '24px' : '12px' }}>
                          Варианты ответов
                        </Typography>
                        {quizAnswers.length > 0 && (
                          <Stack sx={{ mb: '24px' }} spacing={2}>
                            {quizAnswers.map((e) => (
                              <QuizRadioButton
                                key={e.id}
                                isCorrect={e.isCorrect}
                                onIsCorrectChange={() => {
                                  setQuizAnswers(
                                    quizAnswers.map((u) => ({
                                      ...u,
                                      isCorrect: u.id === e.id,
                                    })),
                                  );
                                }}
                                content={e.content}
                                onContentChange={(ev: any) => {
                                  setQuizAnswers(
                                    quizAnswers.map((u) => {
                                      if (u.id === e.id) {
                                        return {
                                          ...u,
                                          content: ev.target.value,
                                        };
                                      }
                                      return u;
                                    }),
                                  );
                                }}
                                error={e.error}
                                onErrorChange={(ev: any) => {
                                  setQuizAnswers(
                                    quizAnswers.map((u) => {
                                      if (u.id === e.id) {
                                        return {
                                          ...u,
                                          error: ev.target.value,
                                        };
                                      }
                                      return u;
                                    }),
                                  );
                                }}
                              />
                            ))}
                          </Stack>
                        )}
                        <IconButton
                          onClick={() => {
                            setQuizAnswers([
                              ...quizAnswers,
                              {
                                id: generateId(),
                                error: '',
                                content: '',
                                isCorrect: quizAnswers.length === 0,
                              },
                            ]);
                          }}
                          color="primary"
                          aria-label="add quiz answer"
                          component="span"
                        >
                          <AddIcon />
                        </IconButton>
                      </Grid>
                    )}
                  </>
                )}
              </>
              <Grid item xs={12} sx={{ display: 'flex', alignItems: 'flex-end', gap: '12px' }}>
                {/* @ts-ignore */}
                <Button variant="containedRed" sx={{ ml: 'auto' }}>
                  Удалить
                </Button>
                {/* @ts-ignore */}
                <Button variant="containedGreen">Сохранить</Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Wrapper>
    </Container>
  );
}
