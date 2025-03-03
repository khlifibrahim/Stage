/**
 * Utility function for printing a specific element with proper styling
 * @param {string} elementId - The ID of the element to print
 * @param {string} title - Optional title for the printed page
 */
export const printElement = (elementId, title = 'Print Document') => {
  const printContent = document.getElementById(elementId);
  
  if (!printContent) {
    console.error(`Element with ID "${elementId}" not found`);
    return;
  }

  // Create a new window for printing
  const printWindow = window.open('', '_blank', 'height=600,width=800');
  
  // Set up the print window document
  printWindow.document.write(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>${title}</title>
        <meta charset="utf-8">
        <style>
          @media print {
            body {
              font-family: Arial, sans-serif;
              margin: 0;
              padding: 0;
            }
            
            input, textarea {
              border: none;
              background: transparent;
              font-family: inherit;
              font-size: inherit;
              padding: 0;
              margin: 0;
              width: auto;
              display: inline;
            }
            
            .print-container {
              width: 100%;
              margin: 0 auto;
              padding: 20px;
            }
            
            .button-group {
              display: none !important;
            }
            
            @page {
              size: A4;
              margin: 1cm;
            }
          }
          ${Array.from(document.styleSheets)
            .filter(styleSheet => {
              try {
                return !styleSheet.href || styleSheet.href.startsWith(window.location.origin);
              } catch (e) {
                return false;
              }
            })
            .map(styleSheet => {
              try {
                return Array.from(styleSheet.cssRules)
                  .map(rule => rule.cssText)
                  .join('\n');
              } catch (e) {
                return '';
              }
            })
            .join('\n')}
        </style>
      </head>
      <body>
        ${printContent.outerHTML}
      </body>
    </html>
  `);
  
  // Wait for content to load before printing
  printWindow.document.close();
  printWindow.focus();
  
  // Add event listener to print after content is loaded
  printWindow.onload = function() {
    // Remove button elements before printing
    const buttonElements = printWindow.document.querySelectorAll('button');
    buttonElements.forEach(button => {
      button.style.display = 'none';
    });
    
    // Print and close the window
    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 500);
  };
};