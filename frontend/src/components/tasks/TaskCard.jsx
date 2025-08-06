import { Card, Button, Badge } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { updateTask, deleteTask } from "../../redux/taskThunks";
import { generateSingleTaskPDF } from "../../utils/pdfGenerator";
import useToasterAndNavigate from "../../hooks/useToasterAndNavigate";
import { useState } from "react";
import ConfirmModal from "../common/ConfirmModal";
import { CheckCircle2, FileDown, Trash2, CalendarClock, CircleAlert } from "lucide-react";
import { motion } from "framer-motion";

const getPriorityVariant = (priority) => {
  switch (priority) {
    case "High":
      return "danger";
    case "Medium":
      return "warning";
    case "Low":
    default:
      return "success";
  }
};

const TaskCard = ({ task }) => {
  const dispatch = useDispatch();
  const toaster = useToasterAndNavigate();

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showDoneModal, setShowDoneModal] = useState(false);

  const handleStatusChange = () => {
    dispatch(updateTask({ id: task._id, updateData: { status: "Done" } }))
      .unwrap()
      .then((data) => toaster(data?.success, data?.message))
      .catch((err) => toaster(false, err?.message))
      .finally(() => setShowDoneModal(false));
  };

  const handleDelete = () => {
    dispatch(deleteTask(task._id))
      .unwrap()
      .then((data) => toaster(data?.success, data?.message))
      .catch((err) => toaster(false, err?.message))
      .finally(() => setShowDeleteModal(false));
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
      >
        <Card className="mb-3 shadow-sm border-0">
          <Card.Body>
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-2 gap-2">
              <Card.Title className="mb-0 fw-semibold d-flex align-items-center gap-2 text-break">
                <CircleAlert size={18} className="text-primary" /> {task.title}
              </Card.Title>
              <Badge
                bg={getPriorityVariant(task.priority)}
                className="px-3 py-1 text-uppercase fw-semibold rounded-pill"
                style={{ fontSize: "0.75rem" }}
              >
                {task.priority}
              </Badge>
            </div>

            <Card.Subtitle className="mb-2 text-muted small d-flex align-items-center gap-2">
              <CalendarClock size={16} /> Due: {new Date(task.dueDate).toLocaleString()}
            </Card.Subtitle>

            <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mt-3">
              {task.status !== "Done" && (
                <Button variant="success" size="sm" className="flex-grow-1 flex-md-grow-0" onClick={() => setShowDoneModal(true)}>
                  <CheckCircle2 size={16} className="me-1" /> Mark Done
                </Button>
              )}
              <Button variant="outline-primary" size="sm" className="flex-grow-1 flex-md-grow-0" onClick={() => generateSingleTaskPDF(task)}>
                <FileDown size={16} className="me-1" /> Export PDF
              </Button>
              <Button variant="outline-danger" size="sm" className="flex-grow-1 flex-md-grow-0" onClick={() => setShowDeleteModal(true)}>
                <Trash2 size={16} className="me-1" /> Delete
              </Button>
            </div>
          </Card.Body>
        </Card>
      </motion.div>

      <ConfirmModal
        show={showDoneModal}
        onHide={() => setShowDoneModal(false)}
        title="Mark task as Done?"
        message={`Are you sure you want to mark "${task.title}" as done?`}
        onConfirm={handleStatusChange}
        confirmLabel="Yes, Mark Done"
        variant="success"
      />

      <ConfirmModal
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        title="Delete Task?"
        message={`Are you sure you want to delete "${task.title}"? This action cannot be undone.`}
        onConfirm={handleDelete}
        confirmLabel="Yes, Delete"
        variant="danger"
      />
    </>
  );
};

export default TaskCard;



