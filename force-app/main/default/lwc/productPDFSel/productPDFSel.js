import { LightningElement, api, wire, track } from 'lwc';
import getAllOrgPDFs from '@salesforce/apex/ProductPDFController.getAllOrgPDFs';
import saveSelectedPDFs from '@salesforce/apex/ProductPDFController.saveSelectedPDFs';

export default class ProductPDFSelector extends LightningElement {
    @api recordId;  //  Auto-populated when placed on a Record Page
    @track pdfList = [];
    @track showPDFs = false; 
    selectedPDFs = new Set();


    handleFetchPDFs() {
        if (!this.recordId) {
            
            console.error(' Record ID is missing. Make sure this component is placed on a Record Page.');
            return;
        }
        getAllOrgPDFs({ productId: this.recordId })
            .then(data => {
                this.pdfList = data.map(pdf => ({
                    id: pdf.Id,
                    title: pdf.Title,
                    extension: pdf.FileExtension,
                    url: `/sfc/servlet.shepherd/version/renditionDownload?rendition=THUMB720BY480&versionId=${pdf.LatestPublishedVersionId}`
                }));
                
                this.showPDFs = true;
            })
            .catch(error => {
                console.error(' Error fetching PDFs:', error);
            });
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
            console.warn(' No PDFs selected.');
            return;
        }
        const selectedPDFArray = Array.from(this.selectedPDFs);
        saveSelectedPDFs({ productId: this.recordId, pdfIds: selectedPDFArray })
            .then(() => {
                console.log(' Selected PDFs saved successfully.');
            })
            .catch(error => {
                console.error(' Error saving PDFs:', error);
            });
    }
}
