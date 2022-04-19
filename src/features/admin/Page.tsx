import { Breadcrumbs, Card, CardContent, Container, Grid, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';

const Wrapper = styled('div')`
  display: flex;
  flex-direction: column;

  padding-top: 64px;
  padding-bottom: 64px;
`;

function AdminCard({ title, to }: any) {
  return (
    <Grid item xs={12} md={4} lg={3}>
      <Link to={to}>
        <Card
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            minHeight: '180px',
            borderRadius: '32px',
          }}
        >
          <CardContent>
            <Typography variant="h3">{title}</Typography>
          </CardContent>
        </Card>
      </Link>
    </Grid>
  );
}

export default function AdminPage() {
  return (
    <Container>
      <Wrapper>
        <Breadcrumbs sx={{ mb: '16px' }}>
          <Typography color="text.primary">Admin Panel</Typography>
        </Breadcrumbs>
        <Grid spacing={3} container>
          <AdminCard title="Курсы" to="/admin/courses" />
          <AdminCard title="Пользователи" to="/admin/users" />
        </Grid>
      </Wrapper>
    </Container>
  );
}
