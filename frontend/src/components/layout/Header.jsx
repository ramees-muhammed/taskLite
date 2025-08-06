import { Container, Navbar } from "react-bootstrap";
import { ClipboardList } from "lucide-react";

const Header = () => {
  return (
    <Navbar bg="primary" variant="dark" className="shadow-sm py-3">
      <Container>
        <Navbar.Brand className="d-flex align-items-center gap-2">
          <ClipboardList size={22} />
          TaskLite
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
};

export default Header;
