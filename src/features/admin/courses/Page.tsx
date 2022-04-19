import { useGetCoursesQuery } from '@src/features/courses/courses.api';
import {
  Breadcrumbs,
  Container,
  Grid,
  Pagination,
  Link as MuiLink,
  Typography,
  ToggleButton,
  ToggleButtonGroup,
  Box,
  Autocomplete,
  TextField,
} from '@mui/material';
import PaginationItem from '@mui/material/PaginationItem';
import { styled } from '@mui/material/styles';
import { CourseCard } from './CourseCard';
import { Link, useLocation } from 'react-router-dom';
import React, { useMemo, useState } from 'react';
import GridViewIcon from '@mui/icons-material/GridView';
import TocIcon from '@mui/icons-material/Toc';
import EnhancedTable from '@src/features/admin/components/Table';

const Wrapper = styled('div')`
  display: flex;
  flex-direction: column;

  padding-top: 64px;
  padding-bottom: 64px;
`;

const SearchInput = styled(TextField)`
  background: white;
  & > div {
    border-radius: 4px;
  }
`;

export default function CoursesPage() {
  const location = useLocation();
  const PageSize = 4;
  const [view, setView] = useState('grid');

  const handleChange = (event: React.MouseEvent<HTMLElement>, nextView: string) => {
    setView(nextView);
  };
  const [searchTerm, setSearchTerm] = useState('');
  const query = new URLSearchParams(location.search);
  const page = parseInt(query.get('page') || '1', 10);

  const { data: courses, isLoading, error } = useGetCoursesQuery({});

  const currentTableData = useMemo(() => {
    const firstPageIndex = (page - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return courses ? courses.slice(firstPageIndex, lastPageIndex) : [];
  }, [page, courses]);

  if (isLoading) {
    return <>Loading...</>;
  }

  if (error) {
    return <>Что-то пошло не так...</>;
  }

  return (
    <Container>
      <Wrapper>
        <Box
          sx={{
            mb: '16px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Breadcrumbs>
            <MuiLink underline="hover" color="inherit" href="/admin">
              Admin Panel
            </MuiLink>
            <Typography color="text.primary">Курсы</Typography>
          </Breadcrumbs>
          <ToggleButtonGroup value={view} exclusive onChange={handleChange}>
            <ToggleButton value="grid" aria-label="grid">
              <GridViewIcon />
            </ToggleButton>
            <ToggleButton value="table" aria-label="table">
              <TocIcon />
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>
        {view === 'grid' ? (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: '64px',
            }}
          >
            <Grid spacing={3} container>
              {currentTableData?.map((item: any) => (
                <Grid item xs={12} md={6} lg={4} xl={3} key={item.id}>
                  <CourseCard info={item} />
                </Grid>
              ))}
            </Grid>
            <Pagination
              page={page}
              count={Math.ceil((courses?.length ?? 0) / PageSize)}
              renderItem={(item) => (
                <PaginationItem
                  component={Link}
                  to={`/admin/courses/${item.page === 1 ? '' : `?page=${item.page}`}`}
                  {...item}
                />
              )}
            />
          </Box>
        ) : (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: '24px',
            }}
          >
            <Autocomplete
              freeSolo
              disableClearable
              options={courses.map((option: any) => option.title)}
              onChange={(e, v) => setSearchTerm(v as any)}
              renderInput={(params) => (
                <SearchInput
                  {...params}
                  label="Поиск..."
                  onChange={(e) => setSearchTerm(e.target.value)}
                  InputProps={{
                    ...params.InputProps,
                    type: 'search',
                  }}
                />
              )}
            />
            <EnhancedTable
              headCells={[
                {
                  id: 'title',
                  numeric: false,
                  disablePadding: false,
                  label: 'Название',
                },
                {
                  id: 'description',
                  numeric: true,
                  disablePadding: false,
                  label: 'Описание',
                },
                {
                  id: 'time',
                  numeric: true,
                  disablePadding: false,
                  label: 'Время',
                },
              ]}
              rows={
                !searchTerm || searchTerm === ''
                  ? courses
                  : courses.filter((e: any) =>
                      e.title.toLowerCase().includes(searchTerm.toLowerCase()),
                    ) ?? []
              }
              generateEditUrl={(e: any) => `/admin/courses/${e.slug}`}
            />
          </Box>
        )}
      </Wrapper>
    </Container>
  );
}
