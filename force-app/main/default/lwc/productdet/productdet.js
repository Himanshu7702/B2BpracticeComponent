//  import { LightningElement, track, wire } from "lwc";
// import { ProductAdapter } from "commerce/productApi";


// export default class ProductDetails extends LightningElement {
//     @track product;
//     @track images = [];
//     productId;

//     connectedCallback() {
//         this.extractProductIdFromUrl();
//     }

//     extractProductIdFromUrl() {
//         let url = window.location.href;
//         let segments = url.split('/');
//         this.productId = segments[segments.length - 1]; 
//         console.log('Extracted Product ID:', this.productId);
//     }

//     @wire(ProductAdapter, { productId: "$productId", excludeMedia: false }) 
//     wiredProduct({ error, data }) {
//         if (error) {
//             console.error("Error fetching product:", error);
//         } else if (data) {
//             console.log("Product Data:", JSON.stringify(data));

//             this.product = {
//                 Name: data.fields.Name,
//                 StockKeepingUnit: data.fields.StockKeepingUnit,
//                 Description: data.fields.Description,
//                 StandardPrice: data.fields.StandardPrice  || "Price not available"
//             };

//             this.extractProductDetailImages(data);
//         }
//     }

//     extractProductDetailImages(data) {
//         let imageUrls = [];

//         if (data.mediaGroups && data.mediaGroups.length > 0) {
//             let productDetailGroup = data.mediaGroups.find(group => group.developerName === "productDetailImage");
            
//             if (productDetailGroup && productDetailGroup.mediaItems.length > 0) {
//                 productDetailGroup.mediaItems.forEach(item => {
//                     if (item.url) {
//                         imageUrls.push(item.url);
//                         console.log("Product Detail Image:", item.url);
//                     }
//                 });
//             }
//         }
        
//         if (imageUrls.length > 0) {
//             this.images = imageUrls;
//         } else {
//             console.log("No 'Product Detail Images' found.");
//         }

//         console.log("Filtered Product Detail Images:", this.images);
//     }
// }

// import { LightningElement, track, wire } from "lwc";
// import { ProductAdapter } from "commerce/productApi";
// import getStandardPrice from "@salesforce/apex/ProductController.getStandardPrice";

// export default class ProductDetails extends LightningElement {
//     @track product;
//     @track images = [];
//     @track price;
//     productId;

//     connectedCallback() {
//         this.extractProductIdFromUrl();
//     }

//     extractProductIdFromUrl() {
//         let url = window.location.href;
//         let segments = url.split("/");
//         this.productId = segments[segments.length - 1]; 
//         console.log("Extracted Product ID:", this.productId);
//     }

//     // Fetch Product Details
//     @wire(ProductAdapter, { productId: "$productId", excludeMedia: false }) 
//     wiredProduct({ error, data }) {
//         if (error) {
//             console.error("Error fetching product:", error);
//         } else if (data) {
//             this.product = {
//                 Name: data.fields.Name,
//                 StockKeepingUnit: data.fields.StockKeepingUnit,
//                 Description: data.fields.Description
//             };

//             this.extractProductDetailImages(data);

//             // Fetch price from Apex
//             this.fetchProductPrice();
//         }
//     }

//     // Extract Product Images
//     extractProductDetailImages(data) {
//         let imageUrls = [];
//         if (data.mediaGroups) {
//             let productDetailGroup = data.mediaGroups.find(group => group.developerName === "productDetailImage");
//             if (productDetailGroup) {
//                 productDetailGroup.mediaItems.forEach(item => {
//                     if (item.url) {
//                         imageUrls.push(item.url);
//                     }
//                 });
//             }
//         }
//         this.images = imageUrls;
//     }

//     // Fetch price from Apex
//     fetchProductPrice() {
//         getStandardPrice({ productId: this.productId })
//             .then((result) => {
//                 if (result) {
//                     this.price = `${result.UnitPrice} ${result.CurrencyIsoCode}`;
//                     console.log("Price Fetched:", this.price);
//                 } else {
//                     this.price = "Price not available";
//                 }
//             })
//             .catch((error) => {
//                 console.error("Error fetching price:", error);
//                 this.price = "Price not available";
//             });
//     }
// }
 
import { LightningElement, wire } from 'lwc';
import { getRecord } from 'lightning/uiRecordApi';
import PRODUCT_MEDIA from '@commerce/productApi/ProductCategoryAdapter';

export default class ProductPdfViewer extends LightningElement {
    productId;
    pdfUrl;

    connectedCallback() {
        this.productId = this.extractProductIdFromUrl();
    }

    @wire(PRODUCT_MEDIA, { productId: '$productId' })
    wiredMedia({ error, data }) {
        if (data) {
            console.log('Media Data:', JSON.stringify(data));
            let pdfMedia = data.mediaItems.find(media => media.fileType.toLowerCase() === 'pdf');
            this.pdfUrl = pdfMedia ? pdfMedia.mediaUrl : null;
        } else if (error) {
            console.error('Error fetching media:', error);
        }
    }

    extractProductIdFromUrl() {
        const url = window.location.href;
        const segments = url.split('/');
        return segments[segments.length - 1];
    }

    handleDownload() {
        if (this.pdfUrl) {
            window.open(this.pdfUrl, '_blank');
        }
    }
}
