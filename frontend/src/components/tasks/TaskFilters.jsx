import React, { useState } from "react";
import { Form, Button, Row, Col, Card } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { fetchTasks } from "../../redux/taskThunks";
import { motion } from "framer-motion";
import { Filter } from "lucide-react";

const TaskFilters = () => {
  const dispatch = useDispatch();

  const [filters, setFilters] = useState({
    status: "",
    priority: "",
    search: "",
    sortBy: "createdAt",
    order: "desc",
    page: 1,
    limit: 10,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(fetchTasks(filters));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Card className="shadow-sm border-0 mb-4">
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <h6 className="mb-3 d-flex align-items-center gap-2">
              <Filter size={18} /> Filter Tasks
            </h6>
            <Row className="g-2">
              <Col md={6}>
                <Form.Control
                  type="text"
                  placeholder="Search by title..."
                  name="search"
                  value={filters.search}
                  onChange={handleChange}
                />
              </Col>
              <Col md={3}>
                <Form.Select name="status" value={filters.status} onChange={handleChange}>
                  <option value="">All Status</option>
                  <option value="To Do">To Do</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Done">Done</option>
                </Form.Select>
              </Col>
              <Col md={3}>
                <Form.Select name="priority" value={filters.priority} onChange={handleChange}>
                  <option value="">All Priority</option>
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </Form.Select>
              </Col>
            </Row>

            <Row className="g-2 mt-2">
              <Col md={6}>
                <Form.Select name="sortBy" value={filters.sortBy} onChange={handleChange}>
                  <option value="createdAt">Sort by Created</option>
                  <option value="dueDate">Sort by Due Date</option>
                  <option value="priority">Sort by Priority</option>
                </Form.Select>
              </Col>
              <Col md={3}>
                <Form.Select name="order" value={filters.order} onChange={handleChange}>
                  <option value="desc">Descending</option>
                  <option value="asc">Ascending</option>
                </Form.Select>
              </Col>
              <Col md={3}>
                <Button type="submit" className="w-100">
                  Apply
                </Button>
              </Col>
            </Row>
          </Form>
        </Card.Body>
      </Card>
    </motion.div>
  );
};

export default TaskFilters;