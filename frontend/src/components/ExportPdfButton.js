import React from "react";
import { useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import { generatePDF } from "../utils/pdfGenerator";

const ExportPdfButton = () => {
  const { tasks } = useSelector((state) => state.taskState);

  return (
    <div className="my-3 text-end">
      <Button variant="outline-primary" onClick={() => generatePDF(tasks)}>
        Export PDF
      </Button>
    </div>
  );
};

export default ExportPdfButton;