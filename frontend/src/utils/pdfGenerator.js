import jsPDF from "jspdf";
import "jspdf-autotable";

export const generatePDF = (tasks) => {
  const doc = new jsPDF();
  doc.setFontSize(18);
  doc.text("Task Report", 14, 22);

  const tableData = tasks.map((task, i) => [
    i + 1,
    task.title,
    task.status,
    task.priority,
    new Date(task.dueDate).toLocaleDateString(),
  ]);

  doc.autoTable({
    head: [["#", "Title", "Status", "Priority", "Due Date"]],
    body: tableData,
    startY: 30,
  });

  doc.save("tasks-report.pdf");
};

export const generateSingleTaskPDF = (task) => {
  const doc = new jsPDF();
  doc.setFontSize(16);
  doc.text(`Task: ${task.title}`, 10, 20);
  doc.setFontSize(12);
  doc.text(`Status: ${task.status}`, 10, 30);
  doc.text(`Priority: ${task.priority}`, 10, 40);
  doc.text(`Due: ${new Date(task.dueDate).toLocaleString()}`, 10, 50);
  doc.text("Description:", 10, 60);
  doc.text(task.description || "No description", 10, 70);
  doc.save(`${task.title}-task.pdf`);
};