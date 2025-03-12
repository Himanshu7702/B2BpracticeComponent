// import { LightningElement, wire } from 'lwc';
// import { getRecord } from 'lightning/uiRecordApi';
// import PRODUCT_MEDIA from '@commerce/productApi/ProductCategoryAdapter';

// export default class ProductPdfViewer extends LightningElement {
//     productId;
//     pdfUrl;

//     connectedCallback() {
//         this.productId = this.extractProductIdFromUrl();
//     }

//     @wire(PRODUCT_MEDIA, { productId: '$productId' })
//     wiredMedia({ error, data }) {
//         if (data) {
//             console.log('Media Data:', JSON.stringify(data));
//             let pdfMedia = data.mediaItems.find(media => media.fileType.toLowerCase() === 'pdf');
//             this.pdfUrl = pdfMedia ? pdfMedia.mediaUrl : null;
//         } else if (error) {
//             console.error('Error fetching media:', error);
//         }
//     }


//     extractProductIdFromUrl() {
//         const url = window.location.href;
//         const segments = url.split('/');
//         return segments[segments.length - 1];
//         console.log("Extracted Product ID:", this.productId);
//     }

//     handleDownload() {
//         if (this.pdfUrl) {
//             window.open(this.pdfUrl, '_blank');
//         }
//     }
// }


import { LightningElement, wire, api } from 'lwc';
import { ProductAdapter } from 'commerce/productApi';

export default class ProductPdfViewer extends LightningElement {
    @api productId;
    pdfUrl;

    @wire(ProductAdapter, { productId: '$productId' })
    wiredProduct({ error, data }) {
        if (data) {
            console.log('Product Data:', JSON.stringify(data, null, 2));

            // Ensure mediaGroups exist
            if (data.mediaGroups) {
                const attachmentGroup = data.mediaGroups.find(
                    group => group.developerName === 'attachment'
                );

                if (attachmentGroup && attachmentGroup.mediaItems) {
                    let pdfMedia = attachmentGroup.mediaItems.find(
                        media => media.mediaType && media.mediaType.toLowerCase() === 'pdf'
                    );

                    this.pdfUrl = pdfMedia ? pdfMedia.url : null;
                }
            }
        } else if (error) {
            console.error('Error fetching product media:', error);
        }
    }

    handleDownload() {
        if (this.pdfUrl) {
            window.open(this.pdfUrl, '_blank');
        } else {
            console.warn('No PDF found for this product.');
        }
    }
}


