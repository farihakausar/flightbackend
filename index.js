require("dotenv").config();
const cors = require("cors");
const express = require("express");
const { loadAppRoutes } = require("./src/routes");

//initializing database
const { initializeDatabase } = require("./src/database/db");
initializeDatabase();

const app = express();

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));

const allowedOrigins = ["http://localhost:3000"];
const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));

app.use(express.json());

// server running check
app.get("/", (req, res) => {
  res.send("Server is up and running. Test successful!");
});

loadAppRoutes(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});

// const express = require("express");
// const { jsPDF } = require("jspdf");
// require("jspdf-autotable");

// const app = express();
// const port = 5000;
// app.get("/generate-pdf", (req, res) => {
//   // Create a new jsPDF instance
//   const doc = new jsPDF();

//   // Page dimensions
//   const pageWidth = doc.internal.pageSize.getWidth();
//   const pageHeight = doc.internal.pageSize.getHeight();

//   // Set font size for header
//   doc.setFontSize(16);

//   // Header - "Executive Summary"
//   doc.setTextColor(255, 255, 255); // White color
//   doc.setFillColor(0, 153, 0); // Dark Green background
//   doc.rect(0, 0, pageWidth, 20, "F"); // Rectangle (header background)
//   doc.text("Executive Summary", pageWidth / 2, 12, { align: "center" });

//   // Introduction Section
//   doc.setTextColor(0, 0, 0); // Black text
//   doc.setFontSize(12);
//   doc.text("Introduction", 10, 30);
//   doc.setFontSize(10);
//   const introText = `
//   TPN has the pleasure in providing you with the following report. Should you have any queries
//   regarding the content of the report, please do not hesitate to contact our call centre on 0861 876 000.
//   An executive overview of the applicant queried has been compiled from all the modules requested.
//   `;
//   doc.text(introText, 10, 40, { maxWidth: pageWidth - 20 });

//   // Table 1 - Consumer Information
//   doc.setFontSize(12);
//   doc.text("Consumer Information", 10, 60);

//   doc.autoTable({
//     startY: 65,
//     theme: "striped",
//     head: [
//       [
//         "Contact Type",
//         "National ID",
//         "Full Name",
//         "Date of Birth",
//         "Gender",
//         "Citizenship",
//         "Dependents",
//       ],
//     ],
//     body: [
//       [
//         "RSA ID",
//         "8901015564181",
//         "Gideon Jacobs Du Preez",
//         "1989/06/10",
//         "Male",
//         "Foreign",
//         "2",
//       ],
//     ],
//     margin: { top: 10, left: 10, right: 10 },
//   });

//   // Table 2 - Aka Information
//   doc.text("Aka Information", 10, doc.autoTable.previous.finalY + 10);

//   doc.autoTable({
//     startY: doc.autoTable.previous.finalY + 15,
//     theme: "striped",
//     head: [
//       [
//         "Korakia Karaila",
//         "John Doe",
//         "Njs ZAWALA",
//         "Ygg Huo",
//         "Du Preez G",
//         "Aurora Mansur",
//       ],
//     ],
//     body: [["Doe Xoln", "AtyasqnsDNA seq", "GJOXOOOOOO", "JACOBUSGIDEON"]],
//     margin: { top: 10, left: 10, right: 10 },
//   });

//   // TPN RentCheck Scorecard
//   doc.text("TPN RentCheck Scorecard", 10, doc.autoTable.previous.finalY + 10);

//   // Add a placeholder for the scorecard image
//   doc.setFillColor(204, 204, 204); // Light gray background
//   doc.rect(10, doc.autoTable.previous.finalY + 15, 40, 20, "F");
//   doc.text("B", 25, doc.autoTable.previous.finalY + 30); // Placeholder score

//   // Sample Paragraph
//   const sampleText = `
//   This is a sample text for the TPN RentCheck Scorecard, which provides a visual representation of
//   the applicant's credit and rent payment history.
//   `;
//   doc.text(sampleText, 60, doc.autoTable.previous.finalY + 25, {
//     maxWidth: pageWidth - 70,
//   });

//   // Add a new page
//   doc.addPage();

//   // Tables on the new page
//   for (let i = 1; i <= 5; i++) {
//     doc.setFontSize(12);
//     doc.text(`Table ${i}`, 10, doc.autoTable.previous.finalY + 10);

//     doc.autoTable({
//       startY: doc.autoTable.previous ? doc.autoTable.previous.finalY + 15 : 20,
//       theme: "striped",
//       head: [["Column 1", "Column 2", "Column 3", "Column 4"]],
//       body: [
//         ["Row 1 Col 1", "Row 1 Col 2", "Row 1 Col 3", "Row 1 Col 4"],
//         ["Row 2 Col 1", "Row 2 Col 2", "Row 2 Col 3", "Row 2 Col 4"],
//         ["Row 3 Col 1", "Row 3 Col 2", "Row 3 Col 3", "Row 3 Col 4"],
//         ["Row 4 Col 1", "Row 4 Col 2", "Row 4 Col 3", "Row 4 Col 4"],
//       ],
//       margin: { top: 10, left: 10, right: 10 },
//     });
//   }

//   // Footer with line separator and text
//   const finalY = doc.autoTable.previous.finalY + 20;
//   doc.setDrawColor(0, 0, 0); // Black color for line
//   doc.line(10, finalY, pageWidth - 10, finalY); // Line separator
//   doc.text(
//     "This is the footer text, which provides additional information.",
//     10,
//     finalY + 10
//   );
//   doc.addPage();
//   doc.setFontSize(16);
//   doc.setTextColor(0, 0, 0);
//   doc.text("Payment Information", pageWidth / 2, 20, { align: "center" });

//   // Payment History Table 1
//   doc.autoTable({
//     startY: 30,
//     theme: "grid",
//     head: [
//       [
//         "Year",
//         "Jan",
//         "Feb",
//         "Mar",
//         "Apr",
//         "May",
//         "Jun",
//         "Jul",
//         "Aug",
//         "Sep",
//         "Oct",
//         "Nov",
//         "Dec",
//       ],
//     ],
//     body: [
//       [
//         "2022",
//         "POT",
//         "POT",
//         "GP",
//         "GP",
//         "POT",
//         "PL",
//         "POT",
//         "POT",
//         "GP",
//         "POT",
//         "POT",
//         "POT",
//       ],
//       [
//         "2023",
//         "POT",
//         "GP",
//         "GP",
//         "PL",
//         "POT",
//         "POT",
//         "POT",
//         "POT",
//         "POT",
//         "POT",
//         "POT",
//         "POT",
//       ],
//     ],
//     styles: { fontSize: 10 },
//     didDrawCell: function (data) {
//       // Apply background colors for table cells based on content
//       const cellContent = data.cell.raw;
//       if (cellContent === "POT") {
//         doc.setFillColor(0, 153, 0); // Green for POT
//       } else if (cellContent === "GP") {
//         doc.setFillColor(255, 204, 0); // Yellow for GP
//       } else if (cellContent === "PL") {
//         doc.setFillColor(255, 0, 0); // Red for PL
//       } else if (cellContent === "DNP") {
//         doc.setFillColor(128, 128, 128); // Gray for DNP
//       }
//       doc.rect(
//         data.cell.x,
//         data.cell.y,
//         data.cell.width,
//         data.cell.height,
//         "F"
//       );
//     },
//   });

//   // Adding text below table
//   doc.setFontSize(10);
//   doc.text(
//     "For further information with regards to this account, please contact:",
//     10,
//     doc.autoTable.previous.finalY + 10
//   );
//   doc.text("PC Test on 0861876000", 10, doc.autoTable.previous.finalY + 15);

//   // New Table 2 (Similar to first table)
//   doc.text("School - TPN Group", 10, doc.autoTable.previous.finalY + 30);
//   doc.text(
//     "TPN657842 - Edenvale Gauteng",
//     10,
//     doc.autoTable.previous.finalY + 35
//   );
//   doc.text("Date Opened: 2020/03/01", 10, doc.autoTable.previous.finalY + 40);
//   doc.text("Installment: R1,000.00 pm", 10, doc.autoTable.previous.finalY + 45);

//   doc.autoTable({
//     startY: doc.autoTable.previous.finalY + 50,
//     theme: "grid",
//     head: [
//       [
//         "Year",
//         "Jan",
//         "Feb",
//         "Mar",
//         "Apr",
//         "May",
//         "Jun",
//         "Jul",
//         "Aug",
//         "Sep",
//         "Oct",
//         "Nov",
//         "Dec",
//       ],
//     ],
//     body: [
//       [
//         "2021",
//         "GP",
//         "GP",
//         "PL",
//         "GP",
//         "POT",
//         "GP",
//         "POT",
//         "POT",
//         "PL",
//         "POT",
//         "POT",
//         "POT",
//       ],
//     ],
//     styles: { fontSize: 10 },
//     didDrawCell: function (data) {
//       // Apply background colors for table cells based on content
//       const cellContent = data.cell.raw;
//       if (cellContent === "POT") {
//         doc.setFillColor(0, 153, 0); // Green for POT
//       } else if (cellContent === "GP") {
//         doc.setFillColor(255, 204, 0); // Yellow for GP
//       } else if (cellContent === "PL") {
//         doc.setFillColor(255, 0, 0); // Red for PL
//       } else if (cellContent === "DNP") {
//         doc.setFillColor(128, 128, 128); // Gray for DNP
//       }
//       doc.rect(
//         data.cell.x,
//         data.cell.y,
//         data.cell.width,
//         data.cell.height,
//         "F"
//       );
//     },
//   });

//   // Send PDF as buffer
//   const pdfData = doc.output("arraybuffer");

//   // Set response headers
//   res.setHeader("Content-Type", "application/pdf");
//   res.setHeader(
//     "Content-Disposition",
//     "attachment; filename=colored_tables.pdf"
//   );

//   // Send the PDF to the client
//   res.send(Buffer.from(pdfData));
// });

// // app.get("/generate-pdf", (req, res) => {
// //   // Create a new jsPDF instance
// //   const doc = new jsPDF();

// //   // Page dimensions
// //   const pageWidth = doc.internal.pageSize.getWidth();
// //   const pageHeight = doc.internal.pageSize.getHeight();

// //   // Set font size for header
// //   doc.setFontSize(16);

// //   // Header - "Executive Summary"
// //   doc.setTextColor(255, 255, 255); // White color
// //   doc.setFillColor(0, 153, 0); // Dark Green background
// //   doc.rect(0, 0, pageWidth, 20, "F"); // Rectangle (header background)
// //   doc.text("Executive Summary", pageWidth / 2, 12, { align: "center" });

// //   // Introduction Section
// //   doc.setTextColor(0, 0, 0); // Black text
// //   doc.setFontSize(12);
// //   doc.text("Introduction", 10, 30);
// //   doc.setFontSize(10);
// //   const introText = `
// //   TPN has the pleasure in providing you with the following report. Should you have any queries
// //   regarding the content of the report, please do not hesitate to contact our call centre on 0861 876 000.
// //   An executive overview of the applicant queried has been compiled from all the modules requested.
// //   `;
// //   doc.text(introText, 10, 40, { maxWidth: pageWidth - 20 });

// //   // Table 1 - Consumer Information
// //   doc.setFontSize(12);
// //   doc.text("Consumer Information", 10, 60);

// //   doc.autoTable({
// //     startY: 65,
// //     theme: "striped",
// //     head: [
// //       [
// //         "Contact Type",
// //         "National ID",
// //         "Full Name",
// //         "Date of Birth",
// //         "Gender",
// //         "Citizenship",
// //         "Dependents",
// //       ],
// //     ],
// //     body: [
// //       [
// //         "RSA ID",
// //         "8901015564181",
// //         "Gideon Jacobs Du Preez",
// //         "1989/06/10",
// //         "Male",
// //         "Foreign",
// //         "2",
// //       ],
// //     ],
// //     margin: { top: 10, left: 10, right: 10 },
// //   });

// //   // Table 2 - Aka Information
// //   doc.text("Aka Information", 10, doc.autoTable.previous.finalY + 10);

// //   doc.autoTable({
// //     startY: doc.autoTable.previous.finalY + 15,
// //     theme: "striped",
// //     head: [
// //       [
// //         "Korakia Karaila",
// //         "John Doe",
// //         "Njs ZAWALA",
// //         "Ygg Huo",
// //         "Du Preez G",
// //         "Aurora Mansur",
// //       ],
// //     ],
// //     body: [["Doe Xoln", "AtyasqnsDNA seq", "GJOXOOOOOO", "JACOBUSGIDEON"]],
// //     margin: { top: 10, left: 10, right: 10 },
// //   });

// //   // TPN RentCheck Scorecard
// //   doc.text("TPN RentCheck Scorecard", 10, doc.autoTable.previous.finalY + 10);

// //   // Add a placeholder for the scorecard image
// //   doc.setFillColor(204, 204, 204); // Light gray background
// //   doc.rect(10, doc.autoTable.previous.finalY + 15, 40, 20, "F");
// //   doc.text("B", 25, doc.autoTable.previous.finalY + 30); // Placeholder score

// //   // Sample Paragraph
// //   const sampleText = `
// //   This is a sample text for the TPN RentCheck Scorecard, which provides a visual representation of
// //   the applicant's credit and rent payment history.
// //   `;
// //   doc.text(sampleText, 60, doc.autoTable.previous.finalY + 25, {
// //     maxWidth: pageWidth - 70,
// //   });

// //   // Generate PDF as a buffer
// //   const pdfData = doc.output("arraybuffer");

// //   // Set response headers
// //   res.setHeader("Content-Type", "application/pdf");
// //   res.setHeader("Content-Disposition", "attachment; filename=styled_pdf.pdf");

// //   // Send the PDF to the client
// //   res.send(Buffer.from(pdfData));
// // });
// // Start the server
// app.listen(port, () => {
//   console.log(`PDF generator API listening at http://localhost:${port}`);
// });
