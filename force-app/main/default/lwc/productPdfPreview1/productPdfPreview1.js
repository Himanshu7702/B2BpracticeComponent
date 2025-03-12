// import { LightningElement, wire } from 'lwc';
// import { ProductAdapter } from 'commerce/productApi';

// export default class ProductPdfViewer extends LightningElement {
//     productId;
//     pdfUrl;

//     connectedCallback() {
//         this.productId = this.extractProductIdFromUrl();
//     }

//     @wire(ProductAdapter, { productId: '$productId' })
//     wiredProduct({ error, data }) {
//         if (data) {
//             console.log('Product Data:', JSON.stringify(data,null, 2));

//             // Look for mediaGroups containing PDFs
//             if (data.mediaGroups) {
//                 data.mediaGroups.forEach(group => {
//                     if (group.usageType === 'Attachment' && group.mediaItems) {
//                         let pdfMedia = group.mediaItems.find(media => 
//                             media.mediaType && media.mediaType.toLowerCase() === 'pdf'
//                         );

//                         if (pdfMedia) {
//                             this.pdfUrl = pdfMedia.url;
//                         }
//                     }
//                 });
//             }
//         } else if (error) {
//             console.error('Error fetching product media:', error);
//         }
//     }

//     extractProductIdFromUrl() {
//         const url = window.location.href;
//         const segments = url.split('/');
//         return segments[segments.length - 1];
//         console.log('Product ID:', this.productId); 
//     }

//     handleDownload() {
//         if (this.pdfUrl) {
//             window.open(this.pdfUrl, '_blank');
//         }
//     }
// }

// import { LightningElement, wire } from 'lwc';
// import { ProductAdapter } from 'commerce/productApi';

// export default class ProductPdfViewer extends LightningElement {
//     productId;
//     pdfUrl = '';

//     connectedCallback() {
//         this.productId = this.extractProductIdFromUrl();
//         console.log('Extracted Product ID:', this.productId);
//     }

//     @wire(ProductAdapter, { productId: '$productId' })
//     wiredProduct({ error, data }) {
//         if (data) {
//             console.log('Product Data:', JSON.stringify(data, null, 2));

//             if (data.mediaGroups) {
//                 for (let group of data.mediaGroups) {
//                     if (group.usageType === 'Attachment' && group.mediaItems) {
//                         let pdfMedia = group.mediaItems.find(media => 
//                             media.mediaType && media.mediaType.toLowerCase().includes('pdf')
//                         );

//                         if (pdfMedia) {
//                             this.pdfUrl = pdfMedia.url;
//                             console.log('PDF URL:', this.pdfUrl);
//                             break; // Stop searching once found
//                         }
//                     }
//                 }
//             }

//             if (!this.pdfUrl) {
//                 console.warn('No PDF found in product media.');
//             }
//         } else if (error) {
//             console.error('Error fetching product media:', error);
//         }
//     }

//     extractProductIdFromUrl() {
//         const url = window.location.href;
//         const segments = url.split('/');
//         const productId = segments[segments.length - 1];
//         console.log('Extracted Product ID:', productId);
//         return productId;
//     }

//     handleDownload() {
//         if (this.pdfUrl) {
//             window.open(this.pdfUrl, '_blank');
//         } else {
//             console.warn('No PDF available to download.');
//         }
//     }
// }


// import { LightningElement, wire } from 'lwc';
// import { ProductAdapter } from 'commerce/productApi';

// export default class ProductPdfViewer extends LightningElement {
//     productId;
//     pdfUrl;

//     connectedCallback() {
//         this.productId = this.extractProductIdFromUrl();
//     }

//     @wire(ProductAdapter, { productId: '$productId' })
//     wiredProduct({ error, data }) {
//         if (data) {
//             console.log('Full Product Data:', JSON.stringify(data, null, 2));

//             if (data.mediaGroups) {
//                 data.mediaGroups.forEach(group => {
//                     if (group.usageType === 'Attachment' && group.mediaItems) {
//                         group.mediaItems.forEach(media => {
//                             let mediaType = media.mediaType ? media.mediaType.toLowerCase() : '';

//                             // Extract the first PDF file found
//                             if (mediaType.includes('document')) {
//                                 this.pdfUrl = media.url;
//                                 console.log('✅ PDF Found:', this.pdfUrl);
//                             }
//                         });
//                     }
//                 });

//                 if (!this.pdfUrl) {
//                     console.warn('❌ No PDF found in product media.');
//                 }
//             } else {
//                 console.warn('❌ No mediaGroups found in product data.');
//             }
//         } else if (error) {
//             console.error('❌ Error fetching product media:', error);
//         }
//     }

//     extractProductIdFromUrl() {
//         const url = window.location.href;
//         const segments = url.split('/');
//         return segments[segments.length - 1];
//     }

//     handleDownload(event) {
//         event.preventDefault(); // Stop default browser download behavior
//         event.stopPropagation();
//         if (this.pdfUrl) {
//             window.open(this.pdfUrl, '_blank');
//         }
//     }
// }

// import { LightningElement, wire, track } from 'lwc';
// import { ProductAdapter } from 'commerce/productApi';

// export default class ProductPdfPreview1 extends LightningElement {
//     productId;
//     pdfUrls = [];

//     connectedCallback() {
//         this.productId = this.extractProductIdFromUrl();
//     }

//     @wire(ProductAdapter, { productId: '$productId' })// Fetch product data
//     wiredProduct({ error, data }) {
//         if (data) {
//             console.log('Full Product Data:', JSON.stringify(data, null, 2));

//             if (data.mediaGroups) {
//                 const pdfList = [];
                
//                 data.mediaGroups.forEach(group => {
//                     if (group.usageType === 'Attachment' && group.mediaItems) {// Extract the first PDF file found
//                         group.mediaItems.forEach(media => {
//                             let mediaType = media.mediaType ? media.mediaType.toLowerCase() : '';// Extract the first PDF file found

//                             if (mediaType.includes('document') || mediaType.includes('pdf')) {// Extract the first PDF file found
//                                 pdfList.push({
//                                     id: media.id,
//                                     title: media.title || 'PDF Document',
//                                     url: media.url
//                                 });
//                             }
//                         });
//                     }
//                 });

//                 this.pdfUrls = pdfList;
//                 console.log('Extracted PDFs:', this.pdfUrls);
//             }
//         } else if (error) {
//             console.error('Error fetching product media:', error);
//         }
//     }

//     extractProductIdFromUrl() {
//         const url = window.location.href;
//         const segments = url.split('/');
//         return segments[segments.length - 1];
//         console.log('Product ID:', this.productId); 
//     }

//     handlePreviewClick(event) {
//         event.preventDefault();
//         const pdfUrl = event.target.dataset.url;

//         if (pdfUrl) {
//             window.open(pdfUrl, '_blank', 'width=800,height=600');
//         }
//     }
// }


// import { LightningElement, wire, track } from 'lwc';
// import { ProductAdapter } from 'commerce/productApi';

// export default class ProductPdfPreview1 extends LightningElement {
//     productId;
//     @track pdfUrls = [];

//     connectedCallback() {
//         this.productId = this.extractProductIdFromUrl();
//     }

//     @wire(ProductAdapter, { productId: '$productId' })
//     wiredProduct({ error, data }) {
//         if (data) {
//             console.log('Full Product Data:', JSON.stringify(data, null, 2));

//             if (data.mediaGroups) {
//                 const pdfList = [];

//                 data.mediaGroups.forEach(group => {
//                     if (group.usageType === 'Attachment' && group.mediaItems) {
//                         group.mediaItems.forEach(media => {
//                             let mediaType = media.mediaType ? media.mediaType.toLowerCase() : '';

//                             if (mediaType.includes('document') || mediaType.includes('pdf')) {
//                                 pdfList.push({
//                                     id: media.id,
//                                     title: media.title || 'PDF Document',
//                                     url: media.url.startsWith('/') 
//                                         ? window.location.origin + media.url  // Convert relative URL to absolute
//                                         : media.url
//                                 });
//                             }
//                         });
//                     }
//                 });

//                 this.pdfUrls = pdfList;
//                 console.log('Extracted PDFs:', this.pdfUrls);
//             }
//         } else if (error) {
//             console.error('Error fetching product media:', error);
//         }
//     }
//     handlePreview(event) {
//         event.preventDefault();
//         let pdfUrl = event.target.dataset.url;
//         console.log('PDF URL:', pdfUrl);
    
//         // Fix: Convert relative URL to absolute
//         if (pdfUrl.startsWith('/')) {
//             pdfUrl = window.location.origin + pdfUrl;
//         }
    
//         // Open the PDF in a new tab
//         if (pdfUrl) {
//             window.open(pdfUrl, '_blank');
//         }
//     }
    

//     extractProductIdFromUrl() {
//         const url = window.location.href;
//         const segments = url.split('/');
//         return segments[segments.length - 1];
//     }
// }


import { LightningElement, wire, track } from 'lwc';
import { ProductAdapter } from 'commerce/productApi';

export default class ProductPdfPreview1 extends LightningElement {
    productId;
    @track pdfUrl;

    connectedCallback() {
        this.productId = this.extractProductIdFromUrl();
    }

    @wire(ProductAdapter, { productId: '$productId' })
    wiredProduct({ error, data }) {
        if (data) {
            console.log('Full Product Data:', JSON.stringify(data, null, 2));

            // Get PDF URL from the field Product_PDF_Link__c
            if (data.fields && data.fields.Product_PDF_Link__c) {
                this.pdfUrl = data.fields.Product_PDF_Link__c;
                console.log('PDF URL:', this.pdfUrl);
            } else {
                console.warn('No PDF URL found in Product_PDF_Link__c field.');
            }
        } else if (error) {
            console.error('Error fetching product data:', error);
        }
    }

    handlePreview() {
        if (this.pdfUrl) {
            window.open(this.pdfUrl, '_blank'); // Open in a new tab for preview
        } else {
            console.warn('No PDF URL available.');
        }
    }

    extractProductIdFromUrl() {
        const url = window.location.href;
        const segments = url.split('/');
        return segments[segments.length - 1];
    }
}

