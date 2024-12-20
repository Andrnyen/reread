import { Container } from "@mui/material";
import MyAppBar from "./MyAppBar";
import Footer from "./Footer";

export default function MyContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Container maxWidth={false} disableGutters>
      <MyAppBar></MyAppBar>
      {children}
      <Footer></Footer>
    </Container>
  );
}
