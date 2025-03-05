import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";

export enum ErrorTypes {
  SERVER = "server",
}

interface Props {
  message: string;
  type: ErrorTypes;
}

const ErrorDisplay = ({ message, type }: Props) => {
  return (
    <Alert status="error" my={4}>
      <AlertIcon />
      <AlertTitle>{`${type} Error`}</AlertTitle>
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  );
};

export default ErrorDisplay;
