import { useParams } from 'react-router';
import { useGetCourseQuery, useGetCoursesQuery } from '@src/features/courses/courses.api';
import {
  Autocomplete,
  Avatar,
  Box,
  Breadcrumbs,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  Link,
  MenuItem,
  OutlinedInput,
  Paper,
  Select,
  SelectChangeEvent,
  Switch,
  Tab,
  Tabs,
  TextField,
  Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import { url_slug } from './slug-util';
import EnhancedTable, { HeadCell } from '@src/features/admin/components/Table';
import { useLocation } from 'react-router-dom';

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

export default function CoursePage() {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const tabQuery = query.get('tab');
  const [tab, setTab] = useState(0);

  const [searchTerm, setSearchTerm] = useState('');

  const { courseId } = useParams<{ courseId: string }>();

  const [translateTitle, setTranslateTitle] = useState(false);
  const [inDevelop, setInDevelop] = useState(true);

  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [tempSlug, setTempSlug] = useState('');

  const [preview, setPreview] = useState('');
  const [description, setDescription] = useState('');

  const [time, setTime] = useState(0);
  const [lang, setLang] = useState('python');
  const [difficulty, setDifficulty] = useState('easy');

  const [track, setTrack] = useState('data-analyst');

  const [instructorId, setInstructorId] = useState(1);

  const [parentCourses, setParentCourses] = useState<string[]>([]);

  const { data: course, isLoading, error } = useGetCourseQuery(courseId);
  const { data: courses } = useGetCoursesQuery({});

  const instructors: {
    id: number;
    first_name: string;
    last_name: string;
    avatar_url: string;
  }[] = [
    {
      id: 1,
      first_name: '??????????????',
      last_name: '????????????',
      avatar_url: 'https://storage.yandexcloud.net/solanoskills-avatars/vitaly-kuliev.jpg',
    },
  ];

  useEffect(() => {
    if (!course) {
      return;
    }

    setTitle(course.title);
    setSlug(course.slug);
    setTempSlug(url_slug(course.title));

    setPreview(course.description);
    setDescription(course.long_description);

    setTime(course.time);
    setLang(course.lang);
    setDifficulty(course.difficulty);
  }, [course]);

  useEffect(() => {
    if (tabQuery === 'content') {
      setTab(0);
    }
    if (tabQuery === 'blocks') {
      setTab(1);
    }
    if (tabQuery === 'exercises') {
      setTab(2);
    }
  }, [tabQuery]);

  if (isLoading) {
    return <>Loading...</>;
  }

  if (error) {
    return <>??????-???? ?????????? ???? ??????...</>;
  }

  const handleParentCourseChange = (event: SelectChangeEvent<typeof parentCourses>) => {
    const {
      target: { value },
    } = event;
    setParentCourses(typeof value === 'string' ? value.split(',') : value);
  };

  return (
    <Container>
      <Wrapper>
        <Breadcrumbs sx={{ mb: '16px' }}>
          <Link underline="hover" color="inherit" href="/admin">
            Admin Panel
          </Link>
          <Link underline="hover" color="inherit" href="/admin/courses">
            ??????????
          </Link>
          <Typography color="text.primary">{course.title}</Typography>
        </Breadcrumbs>
        <Card sx={{ borderRadius: '12px' }}>
          <CardContent>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={tab} onChange={(e, v) => setTab(v)}>
                <Tab label="??????????????" />
                <Tab label="??????????" />
                <Tab label="????????????????????" />
              </Tabs>
            </Box>
            <Grid container sx={{ pt: '24px' }} spacing={4}>
              {tab === 0 && (
                <>
                  <Grid item xs={10} md={5}>
                    <AdminInput
                      label="????????????????"
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
                      label="????????"
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
                  <Grid item xs={12}>
                    <AdminInput
                      label="????????????"
                      value={preview}
                      fullWidth
                      multiline
                      onChange={(e) => {
                        setPreview(e.target.value);
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <AdminInput
                      label="????????????????"
                      value={description}
                      fullWidth
                      multiline
                      onChange={(e) => {
                        setDescription(e.target.value);
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <FormControl fullWidth>
                      <InputLabel id="difficulty-label">??????????????????</InputLabel>
                      <Select
                        labelId="difficulty-label"
                        id="difficulty-select"
                        value={difficulty}
                        label="??????????????????"
                        onChange={(e) => setDifficulty(e.target.value)}
                        sx={{ borderRadius: '6px' }}
                      >
                        <MenuItem value="easy">????????????????????</MenuItem>
                        <MenuItem value="medium">????????????????????????</MenuItem>
                        <MenuItem value="hard">??????????????????</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <FormControl fullWidth>
                      <InputLabel id="lang-label">????????</InputLabel>
                      <Select
                        labelId="lang-label"
                        id="lang-select"
                        value={lang}
                        label="????????"
                        onChange={(e) => setLang(e.target.value)}
                        sx={{ borderRadius: '6px' }}
                      >
                        <MenuItem value="python">Python</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <AdminInput
                      label="?????????? ??????????????????????"
                      value={time}
                      fullWidth
                      type="number"
                      inputProps={{
                        inputMode: 'numeric',
                        pattern: '[0-9]*',
                        min: 0,
                      }}
                      onChange={(e) => {
                        setTime(Number(e.target.value));
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={3} sx={{ display: 'flex', alignItems: 'center' }}>
                    <FormControlLabel
                      sx={{ m: 0 }}
                      control={
                        <Switch checked={inDevelop} onChange={() => setInDevelop(!inDevelop)} />
                      }
                      label="?? ????????????????????"
                    />
                  </Grid>
                </>
              )}
              {tab === 1 && (
                <>
                  <Grid item xs={12} md={6}>
                    <FormControl fullWidth>
                      <InputLabel id="instructor-label">????????????????????</InputLabel>
                      <Select
                        labelId="instructor-label"
                        id="instructor-select"
                        value={instructorId}
                        label="????????????????????"
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
                  <Grid item xs={12} md={6}>
                    <FormControl fullWidth>
                      <InputLabel id="track-label">????????</InputLabel>
                      <Select
                        labelId="track-label"
                        id="track-select"
                        value={track}
                        label="????????"
                        onChange={(e) => setTrack(e.target.value)}
                        sx={{ borderRadius: '6px' }}
                      >
                        <MenuItem value="data-analyst">???????????????? ????????????</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <InputLabel id="parent-courses-label">???????????????????????? ??????????</InputLabel>
                      <Select
                        labelId="parent-courses-label"
                        multiple
                        value={parentCourses}
                        onChange={handleParentCourseChange}
                        input={<OutlinedInput label="???????????????????????? ??????????" />}
                        sx={{
                          borderRadius: '6px',
                        }}
                      >
                        {courses.map((e: any) => (
                          <MenuItem key={e.id} value={e.title}>
                            {e.title}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                </>
              )}
              {tab === 2 && (
                <>
                  <Grid item xs={12}>
                    <Autocomplete
                      freeSolo
                      disableClearable
                      options={course?.exercises.map((option: any) => option.title)}
                      onChange={(e, v) => setSearchTerm(v as any)}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="??????????..."
                          onChange={(e) => setSearchTerm(e.target.value)}
                          InputProps={{
                            ...params.InputProps,
                            type: 'search',
                          }}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <EnhancedTable
                      headCells={[
                        {
                          id: 'title',
                          numeric: false,
                          disablePadding: false,
                          label: '????????????????',
                        },
                        {
                          id: 'xp',
                          numeric: true,
                          disablePadding: false,
                          label: 'XP',
                        },
                        {
                          id: 'type',
                          numeric: true,
                          disablePadding: false,
                          label: '??????',
                        },
                        {
                          id: 'exercise_id',
                          numeric: true,
                          disablePadding: false,
                          label: 'Url Slug',
                        },
                      ]}
                      rows={
                        !searchTerm || searchTerm === ''
                          ? course?.exercises ?? []
                          : course?.exercises.filter((e: any) =>
                              e.title.toLowerCase().includes(searchTerm.toLowerCase()),
                            ) ?? []
                      }
                      generateEditUrl={(e: any) => {
                        return `/admin/courses/${courseId}/exercise/${e.exercise_id}`;
                      }}
                    />
                  </Grid>
                </>
              )}
              <Grid item xs={12} sx={{ display: 'flex', alignItems: 'flex-end', gap: '12px' }}>
                {/* @ts-ignore */}
                <Button variant="containedRed" sx={{ ml: 'auto' }}>
                  ??????????????
                </Button>
                {/* @ts-ignore */}
                <Button variant="containedGreen">??????????????????</Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Wrapper>
    </Container>
  );
}
