import { useGetCoursesQuery } from '@src/features/courses/courses.api';
import { Breadcrumbs, Container, Grid, Link, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import EnhancedTable from '@src/features/admin/components/Table';

const Wrapper = styled('div')`
  display: flex;
  flex-direction: column;

  padding-top: 64px;
  padding-bottom: 64px;
`;

export default function UsersPage() {
  const users: any[] = [];

  return (
    <Container>
      <Wrapper>
        <Breadcrumbs sx={{ mb: '16px' }}>
          <Link underline="hover" color="inherit" href="/admin">
            Admin Panel
          </Link>
          <Typography color="text.primary">Пользователи</Typography>
        </Breadcrumbs>
        <EnhancedTable
          headCells={[
            {
              id: 'email',
              numeric: true,
              disablePadding: false,
              label: 'Email',
            },
            {
              id: 'role',
              numeric: true,
              disablePadding: false,
              label: 'Роль',
            },
            {
              id: 'created_at',
              numeric: true,
              disablePadding: false,
              label: 'Создан',
            },
          ]}
          rows={users}
        />
      </Wrapper>
    </Container>
  );
}
