import { Card, Button, Form, Alert, Spinner } from 'react-bootstrap';
import { Formik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from 'react-redux';
import { createTask } from '../../redux/taskThunks';
import useToasterAndNavigate from '../../hooks/useToasterAndNavigate';  
import DatePicker from "react-datepicker";
import { motion } from "framer-motion";
import { PlusCircle } from "lucide-react";

const TaskForm = () => {
  const dispatch = useDispatch();
  const toaster = useToasterAndNavigate();
  const { loading, error } = useSelector(state => state?.taskState ?? '');

  const taskSchema = yup.object().shape({
    title: yup.string().required('Title is required').min(3),
    description: yup.string().required('Description is required').min(3),
    status: yup.string().oneOf(["To Do", "In Progress", "Done"]).required(),
    priority: yup.string().oneOf(["Low", "Medium", "High"]).required(),
    dueDate: yup.date().nullable().typeError("Invalid date"),
  });

  const handleTaskForm = (values, { resetForm }) => {
    dispatch(createTask(values))
      .unwrap()
      .then((data) => toaster(data?.success, data?.message))
      .catch((err) => toaster(false, err?.message));
    resetForm();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Card className="shadow-sm border-0">
        <Card.Body>
          <h5 className="mb-3 d-flex align-items-center gap-2">
            <PlusCircle size={20} /> Add New Task
          </h5>
          {error && <Alert variant="danger">{error}</Alert>}

          <Formik
            validationSchema={taskSchema}
            initialValues={{
              title: "",
              description: "",
              status: "To Do",
              priority: "Medium",
              dueDate: null,
            }}
            onSubmit={handleTaskForm}
          >
            {({ handleSubmit, handleChange, values, touched, errors, setFieldValue }) => (
              <Form noValidate onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    type="text"
                    name="title"
                    value={values.title}
                    onChange={handleChange}
                    isInvalid={touched.title && !!errors.title}
                  />
                  <Form.Control.Feedback type="invalid">{errors.title}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="description"
                    rows={2}
                    value={values.description}
                    onChange={handleChange}
                    isInvalid={touched.description && !!errors.description}
                  />
                  <Form.Control.Feedback type="invalid">{errors.description}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Status</Form.Label>
                  <Form.Select
                    name="status"
                    value={values.status}
                    onChange={handleChange}
                    isInvalid={touched.status && !!errors.status}
                  >
                    <option>To Do</option>
                    <option>In Progress</option>
                    <option>Done</option>
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">{errors.status}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Priority</Form.Label>
                  <Form.Select
                    name="priority"
                    value={values.priority}
                    onChange={handleChange}
                    isInvalid={touched.priority && !!errors.priority}
                  >
                    <option>Low</option>
                    <option>Medium</option>
                    <option>High</option>
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">{errors.priority}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Due Date</Form.Label>
                  <DatePicker
                    selected={values.dueDate}
                    onChange={(date) => setFieldValue("dueDate", date)}
                    showTimeSelect
                    className={`form-control ${touched.dueDate && errors.dueDate ? "is-invalid" : ""}`}
                    timeFormat="HH:mm"
                    timeIntervals={15}
                    dateFormat="MMMM d, yyyy h:mm aa"
                    minDate={new Date()}
                  />
                  {errors.dueDate && touched.dueDate && (
                    <div className="invalid-feedback d-block">{errors.dueDate}</div>
                  )}
                </Form.Group>

                <Button type="submit" disabled={loading} className="w-100">
                  {loading ? <Spinner animation="border" size="sm" /> : "Create Task"}
                </Button>
              </Form>
            )}
          </Formik>
        </Card.Body>
      </Card>
    </motion.div>
  );
};

export default TaskForm;
