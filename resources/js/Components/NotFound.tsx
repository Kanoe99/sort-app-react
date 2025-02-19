interface NotFoundProps {
  message: string;
}
const NotFound = ({ message }: NotFoundProps) => {
  return <div>{message}</div>;
};
export { NotFound };
