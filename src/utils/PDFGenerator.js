// PDFGenerator.js - Utility for generating health declaration PDFs
// התקן את החבילות הבאות:
// npm install jspdf html2canvas

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

// פונקציה ליצירת PDF לכל ההצהרות
export const generateAllDeclarationsPDF = async (declarations) => {
  const pdf = new jsPDF('p', 'mm', 'a4');
  const pageHeight = pdf.internal.pageSize.height;
  let yPosition = 20;

  // הוספת כותרת ראשית
  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(18);
  pdf.text('Health Declarations Report - Leah Genish Clinic', 20, yPosition);
  
  yPosition += 10;
  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(12);
  pdf.text(`Generated on: ${new Date().toLocaleDateString('en-US')}`, 20, yPosition);
  pdf.text(`Total Declarations: ${declarations.length}`, 20, yPosition + 5);
  
  yPosition += 20;

  // הוספת כל הצהרה
  declarations.forEach((declaration, index) => {
    // בדיקה אם נדרש עמוד חדש
    if (yPosition > pageHeight - 40) {
      pdf.addPage();
      yPosition = 20;
    }

    // פרטי המטופל
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(14);
    pdf.text(`${index + 1}. ${declaration.fullName}`, 20, yPosition);
    
    yPosition += 8;
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(10);
    pdf.text(`ID: ${declaration.idNumber}`, 25, yPosition);
    pdf.text(`Phone: ${declaration.phoneNumber}`, 25, yPosition + 4);
    pdf.text(`Date: ${new Date(declaration.createdAt).toLocaleDateString('en-US')}`, 25, yPosition + 8);
    
    yPosition += 16;

    // מצבים רפואיים
    const conditions = getHealthConditionsSummary(declaration.healthConditions);
    if (conditions.length > 0) {
      pdf.setFont('helvetica', 'bold');
      pdf.text('Medical Conditions:', 25, yPosition);
      yPosition += 5;
      
      pdf.setFont('helvetica', 'normal');
      conditions.forEach(condition => {
        pdf.text(`• ${condition}`, 30, yPosition);
        yPosition += 4;
      });
    } else {
      pdf.setFont('helvetica', 'italic');
      pdf.text('No medical conditions reported', 25, yPosition);
      yPosition += 5;
    }

    yPosition += 8;
    
    // קו הפרדה
    pdf.setDrawColor(200, 200, 200);
    pdf.line(20, yPosition, 190, yPosition);
    yPosition += 8;
  });

  // שמירה והורדה
  pdf.save(`health-declarations-report-${new Date().toISOString().split('T')[0]}.pdf`);
};

// פונקציה ליצירת PDF להצהרה אחת
export const generateSingleDeclarationPDF = async (declaration) => {
  const pdf = new jsPDF('p', 'mm', 'a4');
  
  // הגדרת צבעים וסגנונות
  const primaryColor = [212, 181, 176]; // var(--primary-color)
  const textColor = [74, 52, 41]; // var(--text-primary)
  
  let yPosition = 30;

  // כותרת הקליניקה
  pdf.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  pdf.rect(0, 0, 210, 25, 'F');
  
  pdf.setTextColor(255, 255, 255);
  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(20);
  pdf.text('Leah Genish Clinic', 20, 15);
  
  pdf.setFontSize(12);
  pdf.text('Health Declaration Form', 20, 20);

  // איפוס צבע הטקסט
  pdf.setTextColor(textColor[0], textColor[1], textColor[2]);
  yPosition = 40;

  // פרטי המטופל
  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(16);
  pdf.text('Patient Information', 20, yPosition);
  
  yPosition += 10;
  drawInfoBox(pdf, 20, yPosition, 170, 25);
  
  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(12);
  pdf.text(`Full Name: ${declaration.fullName}`, 25, yPosition + 8);
  pdf.text(`ID Number: ${declaration.idNumber}`, 25, yPosition + 15);
  pdf.text(`Phone: ${declaration.phoneNumber}`, 120, yPosition + 8);
  pdf.text(`Date: ${new Date(declaration.createdAt).toLocaleDateString('en-US')}`, 120, yPosition + 15);
  
  yPosition += 35;

  // מצבים רפואיים
  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(16);
  pdf.text('Medical Conditions', 20, yPosition);
  
  yPosition += 10;
  
  const conditionLabels = {
    skinDiseases: 'Skin Diseases',
    heartDiseases: 'Heart Diseases',
    diabetes: 'Diabetes',
    bloodPressure: 'High Blood Pressure',
    spineProblems: 'Spine Problems',
    fracturesOrSprains: 'Fractures or Sprains',
    fluFeverInflammation: 'Flu/Fever/Inflammation',
    epilepsy: 'Epilepsy',
    surgeries: 'Previous Surgeries',
    chronicMedications: 'Chronic Medications',
    pregnancy: 'Pregnancy',
    otherMedicalIssues: 'Other Medical Issues'
  };

  const boxHeight = Object.keys(conditionLabels).length * 8 + 15;
  drawInfoBox(pdf, 20, yPosition, 170, boxHeight);
  
  yPosition += 8;
  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(10);

  Object.entries(conditionLabels).forEach(([key, label]) => {
    const condition = declaration.healthConditions[key];
    const isPositive = condition === true || 
      (typeof condition === 'object' && (condition.hasSurgeries || condition.hasOtherIssues));
    
    // סמן עיגול
    pdf.setDrawColor(100, 100, 100);
    pdf.circle(28, yPosition - 1, 2);
    
    if (isPositive) {
      pdf.setFillColor(34, 197, 94); // ירוק
      pdf.circle(28, yPosition - 1, 1.5, 'F');
    }
    
    pdf.setTextColor(textColor[0], textColor[1], textColor[2]);
    pdf.text(label, 35, yPosition);
    
    // פרטים נוספים אם קיימים
    if (typeof condition === 'object' && condition.details) {
      pdf.setFont('helvetica', 'italic');
      pdf.setFontSize(9);
      pdf.text(`Details: ${condition.details}`, 35, yPosition + 3);
      yPosition += 3;
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(10);
    }
    
    yPosition += 6;
  });

  yPosition += 15;

  // אישור ההצהרה
  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(14);
  pdf.text('Declaration Confirmation', 20, yPosition);
  
  yPosition += 10;
  drawInfoBox(pdf, 20, yPosition, 170, 20);
  
  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(12);
  pdf.text('I hereby confirm that all information provided is accurate and complete.', 25, yPosition + 8);
  
  const confirmationStatus = declaration.declarationConfirmed ? 'CONFIRMED' : 'NOT CONFIRMED';
  const confirmationColor = declaration.declarationConfirmed ? [34, 197, 94] : [239, 68, 68];
  
  pdf.setTextColor(confirmationColor[0], confirmationColor[1], confirmationColor[2]);
  pdf.setFont('helvetica', 'bold');
  pdf.text(`Status: ${confirmationStatus}`, 25, yPosition + 15);
  
  yPosition += 30;

  // חתימה
  pdf.setTextColor(textColor[0], textColor[1], textColor[2]);
  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(10);
  pdf.text('Digital Signature:', 20, yPosition);
  pdf.text(declaration.signature ? 'Present' : 'Not Available', 60, yPosition);
  
  // כותרת תחתונה
  pdf.setFontSize(8);
  pdf.setTextColor(150, 150, 150);
  pdf.text('This document was generated electronically by Leah Genish Clinic management system.', 20, 280);
  pdf.text(`Generated on: ${new Date().toLocaleString('en-US')}`, 20, 285);

  // שמירה והורדה
  pdf.save(`health-declaration-${declaration.fullName.replace(/\s+/g, '-')}-${declaration.idNumber}.pdf`);
};

// פונקציה עזר לציור קופסת מידע
const drawInfoBox = (pdf, x, y, width, height) => {
  pdf.setDrawColor(200, 200, 200);
  pdf.setFillColor(250, 250, 250);
  pdf.roundedRect(x, y, width, height, 2, 2, 'FD');
};

// פונקציה עזר לקבלת סיכום מצבים רפואיים
const getHealthConditionsSummary = (healthConditions) => {
  const conditionLabels = {
    skinDiseases: 'Skin Diseases',
    heartDiseases: 'Heart Diseases',
    diabetes: 'Diabetes',
    bloodPressure: 'High Blood Pressure',
    spineProblems: 'Spine Problems',
    fracturesOrSprains: 'Fractures or Sprains',
    fluFeverInflammation: 'Flu/Fever/Inflammation',
    epilepsy: 'Epilepsy',
    surgeries: 'Previous Surgeries',
    chronicMedications: 'Chronic Medications',
    pregnancy: 'Pregnancy',
    otherMedicalIssues: 'Other Medical Issues'
  };

  return Object.entries(healthConditions)
    .filter(([key, value]) => 
      value === true || 
      (typeof value === 'object' && (value.hasSurgeries || value.hasOtherIssues))
    )
    .map(([key, value]) => {
      let result = conditionLabels[key] || key;
      if (typeof value === 'object' && value.details) {
        result += ` (${value.details})`;
      }
      return result;
    });
};

// פונקציה ליצירת PDF מ-HTML element (לעיצוב מתקדם יותר)
export const generateHTMLToPDF = async (elementId, filename) => {
  const element = document.getElementById(elementId);
  if (!element) {
    throw new Error('Element not found');
  }

  const canvas = await html2canvas(element, {
    scale: 2,
    useCORS: true,
    allowTaint: true
  });

  const imgData = canvas.toDataURL('image/png');
  const pdf = new jsPDF('p', 'mm', 'a4');
  
  const imgWidth = 210;
  const pageHeight = 295;
  const imgHeight = (canvas.height * imgWidth) / canvas.width;
  let heightLeft = imgHeight;
  let position = 0;

  pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
  heightLeft -= pageHeight;

  while (heightLeft >= 0) {
    position = heightLeft - imgHeight;
    pdf.addPage();
    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;
  }

  pdf.save(filename);
};