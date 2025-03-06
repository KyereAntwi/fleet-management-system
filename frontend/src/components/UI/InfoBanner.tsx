import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react';

interface Props {
  message: string;
}

export default function InfoBanner({ message }: Props) {
  return (
    <Alert status='info' my={4}>
      <AlertIcon />
      <AlertTitle>Information</AlertTitle>
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  );
}
