import { useGetCoursesQuery } from '@src/features/courses/courses.api';
import { Breadcrumbs, Container, Grid, Link, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { CourseCard } from './CourseCard';

const Wrapper = styled('div')`
  display: flex;
  flex-direction: column;

  padding-top: 64px;
  padding-bottom: 64px;
`;

export default function CoursesPage() {
  const { data: courses, isLoading, error } = useGetCoursesQuery({});

  if (isLoading) {
    return <>Loading...</>;
  }

  if (error) {
    return <>Что-то пошло не так...</>;
  }

  return (
    <Container>
      <Wrapper>
        <Breadcrumbs sx={{ mb: '16px' }}>
          <Link underline="hover" color="inherit" href="/admin">
            Admin Panel
          </Link>
          <Typography color="text.primary">Курсы</Typography>
        </Breadcrumbs>
        <Grid spacing={3} container>
          {courses?.map((item: any) => (
            <Grid item xs={12} md={6} lg={4} xl={3} key={item.id}>
              <CourseCard info={item} />
            </Grid>
          ))}
        </Grid>
      </Wrapper>
    </Container>
  );
}
