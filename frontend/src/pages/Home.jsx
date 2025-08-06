import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks } from "../redux/taskThunks";
import TaskForm from "../components/tasks/TaskForm";
import TaskBoard from "../components/tasks/TaskBoard";
import { Row, Col, Accordion } from "react-bootstrap";
import FullScreenLoader from "../components/common/FullScreenLoader";
import TaskFilters from "../components/tasks/TaskFilters";
import { motion } from "framer-motion";

const Home = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.taskState);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  if (loading) return <FullScreenLoader message="Fetching your tasks..." />;

  return (
    <motion.div
      key="home-page"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -24 }}
      transition={{ duration: 0.4 }}
    >
      <Row>
        <Col xs={12} lg={4} className="mb-4">
          <TaskForm />
        </Col>
        <Col xs={12} lg={8}>
          <Accordion className="d-lg-none mb-3">
            <Accordion.Item eventKey="0">
              <Accordion.Header>Filters</Accordion.Header>
              <Accordion.Body>
                <TaskFilters />
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
          <div className="d-none d-lg-block mb-3">
            <TaskFilters />
          </div>
          <TaskBoard />
        </Col>
      </Row>
    </motion.div>
  );
};

export default Home;