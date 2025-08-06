import { Row, Col, Spinner } from "react-bootstrap";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { motion } from "framer-motion";
import TaskCard from "./TaskCard";
import { useSelector, useDispatch } from "react-redux";
import { updateTask } from "../../redux/taskThunks";
import { LayoutDashboard } from "lucide-react";

const columns = [
  { key: "To Do", icon: <LayoutDashboard size={20} className="me-1" /> },
  { key: "In Progress", icon: <Spinner animation="border" size="sm" className="me-1" /> },
  { key: "Done", icon: <span className="text-success me-1">✔️</span> },
];

const TaskBoard = () => {
  const { tasks, loading } = useSelector((state) => state.taskState);
  const dispatch = useDispatch();

  const grouped = columns.reduce((acc, col) => {
    acc[col.key] = tasks.filter((task) => task.status === col.key);
    return acc;
  }, {});

  const handleDragEnd = ({ source, destination, draggableId }) => {
    if (!destination || source.droppableId === destination.droppableId) return;
    dispatch(updateTask({ id: draggableId, updateData: { status: destination.droppableId } }));
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Row>
        {columns.map(({ key, icon }) => (
          <Col key={key} md={4}>
            <h5 className="text-center mb-3">
              {icon} {key}
            </h5>

            <Droppable droppableId={key}>
              {(provided) => (
                <motion.div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  {loading && (
                    <div className="d-flex justify-content-center my-2">
                      <Spinner animation="grow" size="sm" />
                    </div>
                  )}

                  {grouped[key]?.map((task, index) => (
                    <Draggable draggableId={task._id} index={index} key={task._id}>
                      {(provided, snapshot) => (
                        <motion.div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={`mb-2 ${snapshot.isDragging ? "opacity-75" : ""}`}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <TaskCard task={task} />
                        </motion.div>
                      )}
                    </Draggable>
                  ))}

                  {provided.placeholder}
                </motion.div>
              )}
            </Droppable>
          </Col>
        ))}
      </Row>
    </DragDropContext>
  );
};

export default TaskBoard;

