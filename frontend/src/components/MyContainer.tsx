import { Container } from "@mui/material";
import MyAppBar from "./MyAppBar";

export default function MyContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Container maxWidth={false} disableGutters>
      <MyAppBar></MyAppBar>
      {children}
    </Container>
  );
}
