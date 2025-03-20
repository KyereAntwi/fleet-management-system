import { withAuthenticationRequired } from '@auth0/auth0-react';
import { Flex } from '@chakra-ui/react';
import { Outlet } from 'react-router';
import FullPageLoading from '../components/UI/FullPageLoading';

const ProtectedOutlet = withAuthenticationRequired(Outlet, {
  onRedirecting: () => <FullPageLoading />,
});

const AuthLayout = () => {
  return (
    <Flex as={'section'} flexDirection='column' w='full' pt={20}>
      <ProtectedOutlet />
    </Flex>
  );
};

export default AuthLayout;
