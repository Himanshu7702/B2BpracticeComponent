import { LightningElement, api, track, wire } from 'lwc';
import getProductsByCategory from '@salesforce/apex/ProductController.getProductsByCategory';
import { NavigationMixin } from 'lightning/navigation';// plp se pdp pr jane k liye navigation mixin ka use krte h

export default class CategoryProductList1 extends NavigationMixin(LightningElement) {
    @api categoryId;  
    @track products = [];// products ko track krne k liye track ka use kiya h
    @track error;
    
    // Replace with your actual Webstore ID
    webstoreId = '0ZENS000000suJl4AI'; 
// jab hame kabhi productID ya categoryId ki chahiye hoti h to hum url se extract kr skte h 
    connectedCallback() {
        let url = window.location.href;
        let segments = url.split("/");
        this.categoryId = segments[segments.length - 1]; 
        console.log("Extracted category ID:", this.categoryId);
        this.fetchProducts();
    }

    fetchProducts() {// fetchProducts function bnaya h jisme getProductsByCategory function ka use kiya h
        getProductsByCategory({ webstoreId: this.webstoreId, categoryId: this.categoryId })// getProductsByCategory function ko call krte h
            .then(result => {
                console.log('Products fetched:', JSON.stringify(result));
                this.products = result;
                this.error = undefined;
            })
            .catch(err => {
                console.error('Error fetching products:', err);
                this.error = 'Error loading products.';
                this.products = [];
            });
    }

    handleProductClick(event) {// pdp pr jane k liye handleProductClick function bnaya h
        const productId = event.currentTarget.dataset.id;// event.currentTarget.dataset.id se product id fetch krte h
        console.log('Product ID:', productId);
        
        // ✅ Corrected navigation using NavigationMixin
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                objectApiName: 'Product2',
                recordId: productId,
                actionName: 'view',
            },
        });
    }
}

// import { LightningElement, api, track, wire } from 'lwc';
// import getProductsByCategory from '@salesforce/apex/ProductController.getProductsByCategory';
// import { NavigationMixin } from 'lightning/navigation'; 
// import userid from '@salesforce/user/Id';

// export default class CategoryProductList1 extends NavigationMixin(LightningElement) {
//     @api categoryId;  
//     @track products = [];
//     @track error;
    
//     // Replace with your actual Webstore ID
//     webstoreId = '0ZENS000000suJl4AI'; 

//     connectedCallback() {
//         let url = window.location.href;
//         let segments = url.split("/");
//         this.categoryId = segments[segments.length - 1]; 
//         console.log("Extracted category ID:", this.categoryId);
//         this.fetchProducts();
//     }

//     fetchProducts() {
//         getProductsByCategory({ webstoreId: this.webstoreId, categoryId: this.categoryId, UserId : userid })
//             .then(result => {
//                 console.log('Products fetched:', JSON.stringify(result));
//                 this.products = result.map(product => ({
//                     ...product,
//                     Price: product.Price && product.Price !== 'Not Available' ? `₹${product.Price}` : 'Price Not Available'
//                 }));
//                 this.error = undefined;
//             })
//             .catch(err => {
//                 console.error('Error fetching products:', err);
//                 this.error = 'Error loading products.';
//                 this.products = [];
//             });
//     }

//     handleProductClick(event) {
//         const productId = event.currentTarget.dataset.id;
//         console.log('Product ID:', productId);
        
//         this[NavigationMixin.Navigate]({
//             type: 'standard__recordPage',
//             attributes: {
//                 objectApiName: 'Product2',
//                 recordId: productId,
//                 actionName: 'view',
//             },
//         });
//     }
// }

