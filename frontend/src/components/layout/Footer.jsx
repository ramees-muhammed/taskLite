import { Container } from "react-bootstrap";

const Footer = () => {
  return (
    <footer className="bg-light py-3 border-top mt-auto">
      <Container className="text-center small text-muted">
        &copy; {new Date().getFullYear()} TaskLite — Built with ❤️ using React & Redux
      </Container>
    </footer>
  );
};

export default Footer;