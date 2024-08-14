const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

function calculateNetSalary(basicSalary, benefits) {
  const grossSalary = basicSalary + benefits;

  const paye = calculatePAYE(grossSalary);
  const nhif = calculateNHIF(grossSalary);
  const nssf = calculateNSSF(grossSalary);

  const totalDeductions = paye + nhif + nssf;
  const netSalary = grossSalary - totalDeductions;

  return {
    grossSalary,
    paye,
    nhif,
    nssf,
    totalDeductions,
    netSalary
  };
}

function calculatePAYE(grossSalary) {
  // PAYE calculation based on 2023 tax bands
  const annualSalary = grossSalary * 12;
  let annualTax = 0;

  if (annualSalary <= 288000) {
    annualTax = annualSalary * 0.1;
  } else if (annualSalary <= 388000) {
    annualTax = 28800 + (annualSalary - 288000) * 0.25;
  } else if (annualSalary <= 6000000) {
    annualTax = 28800 + 25000 + (annualSalary - 388000) * 0.30;
  } else if (annualSalary <= 9600000) {
    annualTax = 28800 + 25000 + 1683600 + (annualSalary - 6000000) * 0.325;
  } else {
    annualTax = 28800 + 25000 + 1683600 + 1170000 + (annualSalary - 9600000) * 0.35;
  }

  return annualTax / 12; // Monthly PAYE
}

function calculateNHIF(grossSalary) {
  // NHIF calculation based on 2023 rates
  if (grossSalary <= 5999) return 150;
  if (grossSalary <= 7999) return 300;
  if (grossSalary <= 11999) return 400;
  if (grossSalary <= 14999) return 500;
  if (grossSalary <= 19999) return 600;
  if (grossSalary <= 24999) return 750;
  if (grossSalary <= 29999) return 850;
  if (grossSalary <= 34999) return 900;
  if (grossSalary <= 39999) return 950;
  if (grossSalary <= 44999) return 1000;
  if (grossSalary <= 49999) return 1100;
  if (grossSalary <= 59999) return 1200;
  if (grossSalary <= 69999) return 1300;
  if (grossSalary <= 79999) return 1400;
  if (grossSalary <= 89999) return 1500;
  if (grossSalary <= 99999) return 1600;
  return 1700;
}

function calculateNSSF(grossSalary) {
  // NSSF calculation based on 2023 rates
  const tierILimit = 6000;
  const tierIILimit = 18000;
  
  let nssf = Math.min(grossSalary, tierILimit) * 0.06;
  
  if (grossSalary > tierILimit) {
    nssf += Math.min(grossSalary - tierILimit, tierIILimit - tierILimit) * 0.06;
  }
  
  return nssf;
}

function promptSalaryDetails() {
  readline.question("Enter basic salary: ", (basicSalary) => {
    readline.question("Enter benefits: ", (benefits) => {
      const numericBasicSalary = parseFloat(basicSalary);
      const numericBenefits = parseFloat(benefits);

      if (isNaN(numericBasicSalary) || isNaN(numericBenefits) || numericBasicSalary < 0 || numericBenefits < 0) {
        console.log("Invalid input. Please enter positive numbers for salary and benefits.");
        readline.close();
        return;
      }

      const result = calculateNetSalary(numericBasicSalary, numericBenefits);
      console.log("\nSalary Breakdown:");
      console.log("Gross Salary: ", result.grossSalary.toFixed(2));
      console.log("PAYE (Tax): ", result.paye.toFixed(2));
      console.log("NHIF Deduction: ", result.nhif.toFixed(2));
      console.log("NSSF Deduction: ", result.nssf.toFixed(2));
      console.log("Total Deductions: ", result.totalDeductions.toFixed(2));
      console.log("Net Salary: ", result.netSalary.toFixed(2));

      readline.close();
    });
  });
}

promptSalaryDetails();