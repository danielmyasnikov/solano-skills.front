import { Redirect } from 'react-router';

export const FailPaymentPage = () => {
  return <Redirect to="/courses?paymentStatus=fail" />;
};
