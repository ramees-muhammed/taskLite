import { Modal, Button, Spinner } from "react-bootstrap";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, CheckCircle, Trash2 } from "lucide-react";

const ConfirmModal = ({
  show,
  onHide,
  title,
  message,
  onConfirm,
  confirmLabel = "Confirm",
  variant = "primary",
  isLoading = false,
  iconType = "alert", // alert | success | danger
}) => {
  const getIcon = () => {
    switch (iconType) {
      case "success":
        return <CheckCircle className="text-success" size={48} />;
      case "danger":
        return <Trash2 className="text-danger" size={48} />;
      default:
        return <AlertTriangle className="text-warning" size={48} />;
    }
  };

  return (
    <AnimatePresence>
      {show && (
        <Modal
          show={show}
          onHide={onHide}
          centered
          backdrop="static"
          contentClassName="border-0 rounded-4 shadow-sm"
          dialogClassName="modal-dialog-zoom"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85 }}
            transition={{ duration: 0.25 }}
          >
            <Modal.Body className="text-center py-4 px-3">
              <div className="mb-3">{getIcon()}</div>
              <h5 className="fw-semibold mb-2">{title || "Are you sure?"}</h5>
              <p className="text-muted">{message}</p>
            </Modal.Body>
            <Modal.Footer className="border-0 pt-0 d-flex justify-content-center gap-2 pb-4">
              <Button variant="outline-secondary" onClick={onHide} disabled={isLoading}>
                Cancel
              </Button>
              <Button variant={variant} onClick={onConfirm} disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Spinner animation="border" size="sm" className="me-2" />
                    Processing...
                  </>
                ) : (
                  confirmLabel
                )}
              </Button>
            </Modal.Footer>
          </motion.div>
        </Modal>
      )}
    </AnimatePresence>
  );
};

export default ConfirmModal;


