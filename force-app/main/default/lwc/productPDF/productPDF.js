// import { LightningElement, api, track } from 'lwc';
// import getAllOrgPDFs from '@salesforce/apex/ProductPDFController.getAllOrgPDFs';
// import saveSelectedPDFs from '@salesforce/apex/ProductPDFController.saveSelectedPDFs';

// export default class ProductPDFSelector extends LightningElement {
//     @api recordId;  // Product record ID
//     @track pdfList = [];
//     @track showPDFs = false; 
//     selectedPDFs = new Set();

//     handleFetchPDFs() {
//         console.log('Fetching PDFs for Record ID:', this.recordId);  // ✅ Check If Record ID Exists
    
//         if (!this.recordId) {
//             console.error('❌ Record ID is missing.');
//             return;
//         }
    
//         getAllOrgPDFs({ productId: this.recordId })
//             .then(data => {
//                 console.log('Fetched PDFs:', data);  // ✅ Check API Response
    
//                 this.pdfList = data.map(pdf => ({
//                     id: pdf.Id,
//                     title: pdf.Title,
//                     extension: pdf.FileExtension,
//                     url: `/sfc/servlet.shepherd/document/download/${pdf.LatestPublishedVersionId}`
//                 }));
    
//                 this.showPDFs = true;
//             })
//             .catch(error => {
//                 console.error('❌ Error fetching PDFs:', error);
//             });
//     }
    

//     handleCheckboxChange(event) {
//         const pdfId = event.target.dataset.id;
//         if (event.target.checked) {
//             this.selectedPDFs.add(pdfId);
//         } else {
//             this.selectedPDFs.delete(pdfId);
//         }
//     }

//     handleSaveSelection() {
//         if (this.selectedPDFs.size === 0) {
//             console.warn('❌ No PDFs selected.');
//             return;
//         }
    
//         const selectedPDFArray = Array.from(this.selectedPDFs);
//         console.log('🔍 Saving Selected PDFs:', selectedPDFArray, 'for Product:', this.recordId);
    
//         saveSelectedPDFs({ productId: this.recordId, pdfIds: selectedPDFArray })
//             .then(() => {
//                 console.log('✅ Selected PDFs saved successfully.');
//             })
//             .catch(error => {
//                 console.error('❌ Error saving PDFs:', error);
//             });
//     }
// }    

// import { LightningElement, wire, api, track } from 'lwc';
// import getProductPDFs from '@apex/ProductPDFController.getProductPDFs';
// import saveSelectedPDFs from '@apex/ProductPDFController.saveSelectedPDFs';
// import { ShowToastEvent } from 'lightning/platformShowToastEvent';

// export default class ProductPDF extends LightningElement {
//     @api recordId; // Product ID
//     @track pdfList = [];
//     selectedPDFs = new Set();
//     showModal = false;

//     @wire(getProductPDFs, { productId: '$recordId' })
//     wiredPDFs({ data, error }) {
//         if (data) {
//             this.pdfList = data.map(pdf => ({
//                 id: pdf.ContentDocumentId,
//                 title: pdf.ContentDocument.Title,
//                 url: `/sfc/servlet.shepherd/version/download/${pdf.ContentDocument.LatestPublishedVersionId}`
//             }));
//         } else if (error) {
//             console.error('Error fetching PDFs:', error);
//         }
//     }

//     handleCheckboxChange(event) {
//         const pdfUrl = event.target.dataset.url;
//         if (event.target.checked) {
//             this.selectedPDFs.add(pdfUrl);
//         } else {
//             this.selectedPDFs.delete(pdfUrl);
//         }
//     }

//     savePDFs() {
//         if (this.selectedPDFs.size === 0) {
//             this.showToast('Error', 'Please select at least one PDF.', 'error');
//             return;
//         }

//         saveSelectedPDFs({ productId: this.recordId, pdfUrls: Array.from(this.selectedPDFs) })
//             .then(() => {
//                 this.showToast('Success', 'PDF URLs saved successfully!', 'success');
//                 this.showModal = false;
//             })
//             .catch(error => {
//                 console.error('Error saving PDFs:', error);
//                 this.showToast('Error', 'Failed to save PDFs.', 'error');
//             });
//     }

//     showToast(title, message, variant) {
//         this.dispatchEvent(new ShowToastEvent({ title, message, variant }));
//     }

//     openModal() {
//         this.showModal = true;
//     }

//     closeModal() {
//         this.showModal = false;
//     }

//     downloadPDF(event) {
//         const pdfUrl = event.target.dataset.url;
//         window.open(pdfUrl, '_blank'); // Opens in a new tab for download
//     }
// }


// import { LightningElement, api, track } from 'lwc';
// import getAllOrgPDFs from '@salesforce/apex/ProductPDFController.getAllOrgPDFs';
// import saveSelectedPDFs from '@salesforce/apex/ProductPDFController.saveSelectedPDFs';
// import { ShowToastEvent } from 'lightning/platformShowToastEvent';

// export default class ProductPDFSelector extends LightningElement {
//     @api recordId;
//     @track pdfList = [];
//     @track showPDFs = false;
//     selectedPDFs = new Set();

//     handleFetchPDFs() {
//         getAllOrgPDFs({ productId: this.recordId })
//             .then(data => {
//                 this.pdfList = data.map(pdf => ({
//                     id: pdf.Id,
//                     title: pdf.Title,
//                     extension: pdf.FileExtension,
//                     url: `/sfc/servlet.shepherd/document/download/${pdf.LatestPublishedVersionId}`
//                 }));
//                 this.showPDFs = true;
//             })
//             .catch(error => {
//                 console.error('Error fetching PDFs:', error);
//             });
//     }

//     handleCheckboxChange(event) {
//         const pdfId = event.target.dataset.id;
//         if (event.target.checked) {
//             this.selectedPDFs.add(pdfId);
//         } else {
//             this.selectedPDFs.delete(pdfId);
//         }
//     }

//     handleSaveSelection() {
//         if (this.selectedPDFs.size === 0) {
//             console.warn('No PDFs selected.');
//             return;
//         }

//         const selectedPDFArray = Array.from(this.selectedPDFs);
//         saveSelectedPDFs({ productId: this.recordId, pdfIds: selectedPDFArray })
//             .then(() => {
//                 this.dispatchEvent(
//                     new ShowToastEvent({
//                         title: 'Success',
//                         message: 'PDF links saved successfully!',
//                         variant: 'success'
//                     })
//                 );
//                 this.selectedPDFs.clear();
//                 this.handleFetchPDFs(); // ✅ Refresh UI automatically
//             })
//             .catch(error => {
//                 console.error('Error saving PDFs:', error);
//                 this.dispatchEvent(
//                     new ShowToastEvent({
//                         title: 'Error',
//                         message: 'Failed to save PDF links!',
//                         variant: 'error'
//                     })
//                 );
//             });
//     }
// }


// import { LightningElement, api, track } from 'lwc';
// import getAllOrgPDFs from '@salesforce/apex/ProductPDFController.getAllOrgPDFs';
// import saveSelectedPDFs from '@salesforce/apex/ProductPDFController.saveSelectedPDFs';
// import { ShowToastEvent } from 'lightning/platformShowToastEvent';

// export default class ProductPDFSelector extends LightningElement {
//     @api recordId;
//     @track pdfList = [];
//     @track showPDFs = false;
//     selectedPDFs = new Set();

//     handleFetchPDFs() {
//         getAllOrgPDFs({ productId: this.recordId })
//             .then(data => {
//                 this.pdfList = data.map(pdf => ({
//                     id: pdf.Id,
//                     title: pdf.Title,
//                     extension: pdf.FileExtension,
//                     url: `/sfc/servlet.shepherd/document/download/${pdf.LatestPublishedVersionId}`
//                 }));
//                 this.showPDFs = true;
//             })
//             .catch(error => {
//                 console.error('Error fetching PDFs:', error);
//             });
//     }

//     handleCheckboxChange(event) {
//         const pdfId = event.target.dataset.id;
//         if (event.target.checked) {
//             this.selectedPDFs.add(pdfId);
//         } else {
//             this.selectedPDFs.delete(pdfId);
//         }
//     }

//     handleSaveSelection() {
//         if (this.selectedPDFs.size === 0) {
//             this.dispatchEvent(
//                 new ShowToastEvent({
//                     title: 'Warning',
//                     message: 'No PDFs selected!',
//                     variant: 'warning'
//                 })
//             );
//             return;
//         }

//         const selectedPDFArray = Array.from(this.selectedPDFs);
//         saveSelectedPDFs({ productId: this.recordId, pdfIds: selectedPDFArray })
//             .then(() => {
//                 this.dispatchEvent(
//                     new ShowToastEvent({
//                         title: 'Success',
//                         message: 'PDF links saved successfully!',
//                         variant: 'success'
//                     })
//                 );
//                 this.selectedPDFs.clear(); // ✅ Clear selected PDFs after saving
//                 this.showPDFs = false; // ✅ Hide list after saving
//                 setTimeout(() => this.handleFetchPDFs(), 500); // ✅ Refresh UI after saving
//             })
//             .catch(error => {
//                 console.error('Error saving PDFs:', error);
//                 this.dispatchEvent(
//                     new ShowToastEvent({
//                         title: 'Error',
//                         message: 'Failed to save PDF links!',
//                         variant: 'error'
//                     })
//                 );
//             });
//     }
// }


// import { LightningElement, api, track, wire } from 'lwc';
// import getAllOrgPDFs from '@salesforce/apex/ProductPDFController.getAllOrgPDFs';
// import saveSelectedPDFs from '@salesforce/apex/ProductPDFController.saveSelectedPDFs';
// import { refreshApex } from '@salesforce/apex';
// import { ShowToastEvent } from 'lightning/platformShowToastEvent';

// export default class ProductPDFSelector extends LightningElement {
//     @api recordId;
//     @track pdfList = [];
//     @track showPDFs = false;
//     selectedPDFs = new Set();
//     wiredPdfData;

//     @wire(getAllOrgPDFs, { productId: '$recordId' })
//     wiredPDFs(result) {
//         this.wiredPdfData = result;
//         if (result.data) {
//             this.pdfList = result.data.map(pdf => ({
//                 id: pdf.Id,
//                 title: pdf.Title,
//                 extension: pdf.FileExtension,
//                 url: `/sfc/servlet.shepherd/document/download/${pdf.LatestPublishedVersionId}`
//             }));
//             this.showPDFs = true;
//         } else if (result.error) {
//             console.error('Error fetching PDFs:', result.error);
//         }
//     }

//     handleCheckboxChange(event) {
//         const pdfId = event.target.dataset.id;
//         if (event.target.checked) {
//             this.selectedPDFs.add(pdfId);
//         } else {
//             this.selectedPDFs.delete(pdfId);
//         }
//     }

//     handleSaveSelection() {
//         if (this.selectedPDFs.size === 0) {
//             this.dispatchEvent(
//                 new ShowToastEvent({
//                     title: 'Warning',
//                     message: 'No PDFs selected!',
//                     variant: 'warning'
//                 })
//             );
//             return;
//         }
    
//         const selectedPDFArray = Array.from(this.selectedPDFs);
//         saveSelectedPDFs({ productId: this.recordId, pdfIds: selectedPDFArray })
//             .then(() => {
//                 this.dispatchEvent(
//                     new ShowToastEvent({
//                         title: 'Success',
//                         message: 'PDF links saved successfully!',
//                         variant: 'success'
//                     })
//                 );
//                 this.selectedPDFs.clear();
//                 this.showPDFs = false;
    
//                 // ✅ Thoda delay do taaki database commit ho jaye
//                 setTimeout(() => {
//                     return refreshApex(this.wiredPdfData);
//                 }, 1000); // 1 sec delay
//             })
//             .catch(error => {
//                 console.error('Error saving PDFs:', error);
//                 this.dispatchEvent(
//                     new ShowToastEvent({
//                         title: 'Error',
//                         message: 'Failed to save PDF links!',
//                         variant: 'error'
//                     })
//                 );
//             });
//     }
// }    


import { LightningElement, api, track, wire } from 'lwc';
import getAllOrgPDFs from '@salesforce/apex/ProductPDFController.getAllOrgPDFs';
import saveSelectedPDFs from '@salesforce/apex/ProductPDFController.saveSelectedPDFs';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { refreshApex } from '@salesforce/apex';

export default class ProductPDFSelector extends LightningElement {
    @api recordId;
    @track pdfList = [];
    @track showModal = false;
    selectedPDFs = new Set();
    wiredPdfList;

    @wire(getAllOrgPDFs, { productId: '$recordId' })
    wiredPDFs(result) {
        this.wiredPdfList = result;
        if (result.data) {
            this.pdfList = result.data.map(pdf => ({
                id: pdf.Id,
                title: pdf.Title,
                url: `/sfc/servlet.shepherd/document/download/${pdf.LatestPublishedVersionId}`
            }));
        } else if (result.error) {
            console.error('Error fetching PDFs:', result.error);
        }
    }

    handleOpenModal() {
        this.showModal = true; // ✅ Button click par modal show hoga
    }

    handleCloseModal() {
        this.showModal = false; // ✅ Close button se modal hide hoga
    }

    handleCheckboxChange(event) {
        const pdfId = event.target.dataset.id;
        if (event.target.checked) {
            this.selectedPDFs.add(pdfId);
        } else {
            this.selectedPDFs.delete(pdfId);
        }
    }

    handleSaveSelection() {
        if (this.selectedPDFs.size === 0) {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Warning',
                    message: 'No PDFs selected!',
                    variant: 'warning'
                })
            );
            return;
        }
    
        const selectedPDFArray = Array.from(this.selectedPDFs);
        saveSelectedPDFs({ productId: this.recordId, pdfIds: selectedPDFArray })
            .then(() => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Success',
                        message: 'PDF links saved successfully!',
                        variant: 'success'
                    })
                );
                this.selectedPDFs.clear(); 
                this.showModal = false; // ✅ Modal close hoga
    
                // 🔄 Yeh direct Product_PDF_Link__c update karega bina refresh kiye
                this.pdfList = this.pdfList.filter(pdf => selectedPDFArray.includes(pdf.id));
    
                // ✅ Manually UI ko dobara render karne ke liye force update
                this.pdfList = [...this.pdfList];
            })
            .catch(error => {
                console.error('Error saving PDFs:', error);
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error',
                        message: 'Failed to save PDF links!',
                        variant: 'error'
                    })
                );
            });
    }
}    