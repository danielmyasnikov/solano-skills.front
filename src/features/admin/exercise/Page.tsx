import { useGetCourseQuery, useGetCoursesQuery } from '@src/features/courses/courses.api';
import {
  Button,
  Card,
  CardContent,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Stacks, Types } from './constants';

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

interface Exercise {
  exercise_id: string;
  id: number;
  status: string;
  title: string;
  type: string;
  xp: number;
}

export default function ExercisePage() {
  const { courseId } = useParams<{ courseId: string }>();
  const { exerciseId } = useParams<{ exerciseId: string }>();

  const [slug, setSlug] = useState('');
  const [position, setPosition] = useState('');
  const [courseName, setCourseName] = useState('');
  const [part, setPart] = useState('');
  const [exerciseTitle, setExerciseTitle] = useState('');
  const [type, setType] = useState('');
  const [stack, setStack] = useState('');

  const { data: course, isLoading, error } = useGetCourseQuery(courseId);
  const { data: courses } = useGetCoursesQuery({});

  useEffect(() => {
    if (!course) {
      return;
    }
    course.exercises.forEach((item: any) => {
      if (item.exercise_id === exerciseId) {
        setExerciseTitle(item.title);
        setType(item.type);
      }
    });
    setPosition(course.exercises.findIndex((item: any) => item.exercise_id === exerciseId) + 1);
    setStack(course.lang);
    setSlug(exerciseId);
    setCourseName(course.title);
  }, [course]);

  if (isLoading) {
    return <>Loading...</>;
  }

  if (error) {
    return <>Что-то пошло не так...</>;
  }

  console.log(course);
  console.log(courses);
  console.log(exerciseTitle);

  return (
    <Container>
      <Wrapper>
        <Card sx={{ borderRadius: '12px' }}>
          <CardContent>
            <Grid container sx={{ pt: '24px' }} spacing={4}>
              <>
                <Grid item xs={10} md={5}>
                  <AdminInput
                    label="Slug"
                    value={slug}
                    fullWidth
                    onChange={(e) => {
                      setSlug(e.target.value);
                    }}
                  />
                </Grid>
                <Grid item xs={10} md={2}>
                  <AdminInput
                    label="Position"
                    value={position}
                    fullWidth
                    onChange={(e) => {
                      setPosition(e.target.value);
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={5}>
                  <FormControl fullWidth>
                    <InputLabel id="course-label">Course</InputLabel>
                    <Select
                      labelId="course-label"
                      id="course-select"
                      value={courseName}
                      label="Course"
                      onChange={(e) => setCourseName(e.target.value)}
                      sx={{ borderRadius: '6px' }}
                    >
                      {courses.map((e: any) => (
                        <MenuItem key={e.id} value={e.title}>
                          {e.title}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={4}>
                  <FormControl fullWidth>
                    <InputLabel id="path-label">CoursePart</InputLabel>
                    <Select
                      labelId="part-label"
                      id="part-select"
                      value={part}
                      label="Part"
                      onChange={(e) => setPart(e.target.value)}
                      sx={{ borderRadius: '6px' }}
                    >
                      {course.parts.map((e: any) => (
                        <MenuItem key={e.name} value={e.name}>
                          {e.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={4}>
                  <FormControl fullWidth>
                    <InputLabel id="exercise-label">Exercise</InputLabel>
                    <Select
                      labelId="exercise-label"
                      id="exercise-select"
                      value={exerciseTitle}
                      label="Exercise"
                      onChange={(e) => setPart(e.target.value)}
                      sx={{ borderRadius: '6px' }}
                    >
                      {course.exercises.map((e: any) => (
                        <MenuItem key={e.title} value={e.title}>
                          {e.title}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={4}>
                  <FormControl fullWidth>
                    <InputLabel id="type-label">Type</InputLabel>
                    <Select
                      labelId="type-label"
                      id="type-select"
                      value={type}
                      label="Type"
                      onChange={(e) => setType(e.target.value)}
                      sx={{ borderRadius: '6px' }}
                    >
                      {Types.map((e: any) => (
                        <MenuItem key={e.id} value={e.name}>
                          {e.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={4}>
                  <FormControl fullWidth>
                    <InputLabel id="exercise-label">Stack</InputLabel>
                    <Select
                      labelId="stack-label"
                      id="stack-select"
                      value={stack}
                      label="Stack"
                      onChange={(e) => setStack(e.target.value)}
                      sx={{ borderRadius: '6px' }}
                    >
                      {Stacks.map((e: any) => (
                        <MenuItem key={e.id} value={e.name}>
                          {e.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
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
