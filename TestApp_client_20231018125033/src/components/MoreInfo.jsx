import { Container, Link } from "@mui/material";
export const MoreInfo = MoreInfoDocsLink

function MoreInfoItem({ children }) {
  return (
    <Container
      style={{ textAlign: "center", padding: "14px 0", marginTop: "auto" }}
    >
      {children}
    </Container>
  );
}

export function MoreInfoDocsLink() {
  const gitLink = new URL("https://github.com/M1-MIAGE-IDA/ProjetWeb");
  return (
    <MoreInfoItem>
      <span>{
        "For more information, see the"
      }</span> {" "}
      <Link target="_blank" href={gitLink}>
        Repo Docs
      </Link>
    </MoreInfoItem>
  );
}

