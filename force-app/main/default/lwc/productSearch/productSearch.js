// import { LightningElement, track } from 'lwc';
// import searchRecords from '@salesforce/apex/ProductSearchController.searchRecords';

// export default class ProductSearch extends LightningElement {
//     @track products = [];
//     @track categories = [];
//     @track showDropdown = false;

//     handleInputChange(event) {
//         const searchTerm = event.target.value;
//         if (searchTerm.length > 2) {
//             this.fetchSearchResults(searchTerm);
//         } else {
//             this.products = [];
//             this.categories = [];
//             this.showDropdown = false;
//         }
//     }

//     fetchSearchResults(searchTerm) {
//         searchRecords({ searchTerm })
//             .then((result) => {
//                 // "result" is a map with keys: "products" and "categories"
//                 this.products = result.products || [];
//                 this.categories = result.categories || [];

//                 this.showDropdown = (this.products.length > 0 || this.categories.length > 0);
//             })
//             .catch((error) => {
//                 console.error('Error searching:', error);
//                 this.products = [];
//                 this.categories = [];
//                 this.showDropdown = false;
//             });
//     }

//     handleProductClick(event) {
//         const productId = event.currentTarget.dataset.id;
//         // Example PDP navigation
//         window.location.href = `/product/${productId}`;
//     }

//     handleCategoryClick(event) {
//         const categoryId = event.currentTarget.dataset.id;
//         // Example Category navigation
//         window.location.href = `/category/${categoryId}`;
//     }
// }

// import { LightningElement, track } from 'lwc';
// import searchAccounts from '@salesforce/apex/prodconytroller.searchAccounts';

// export default class GlobalProductSearch extends NavigationMixin(LightningElement) {
//     // @track searchTerm = '';
    // @track products = [];// Array to store search results``
    // @track showSearchBox = false;// Boolean to show/hide search box

    // connectedCallback() {
    //     document.addEventListener('click', this.handleClickOutside.bind(this));// Add event listener to detect clicks outside the component
    // }

    // disconnectedCallback() {
    //     document.removeEventListener('click', this.handleClickOutside.bind(this));// Remove event listener when component is removed
    // }

    // Open search box when icon is clicked
    // handleIconClick(event) {
    //     event.stopPropagation(); // Prevent immediate closing
    //     this.showSearchBox = true;
    //     setTimeout(() => {
    //         const input = this.template.querySelector('.search-input');
    //         if (input) {
    //             input.focus();
    //         }
    //     }, 0);
    // }

//     // Prevent clicks inside the search box from propagating to the document
//     handleBoxClick(event) {
//         event.stopPropagation();
//     }

//     // When user types, fetch products if 2+ characters entered
//     handleSearchChange(event) {
//         this.searchTerm = event.target.value;// Update searchTerm with input value
//         if (this.searchTerm.length >= 2) {
//             searchProducts({ searchTerm: this.searchTerm })
//                 .then(result => {
//                     this.products = result;
//                     console.log('result:', result);
//                 })
//                 .catch(error => {
//                     console.error('Error searching products:', error);
//                     this.products = [];
//                 });
//         } else {
//             this.products = [];
//         }
//     }

//     // Navigate to PDP when a product is clicked, and close the search box
//     handleProductClick(event) {
//         const productId = event.currentTarget.dataset.id;
//         this.showSearchBox = false;
//         this[NavigationMixin.Navigate]({
//             type: 'standard__recordPage',
//             attributes: {
//                 recordId: productId,
//                 objectApiName: 'Product2',
//                 actionName: 'view'
//             }
//         });
//     }

//     // If a click happens outside the component, close the search box
//     handleClickOutside(event) {
//         // Use composedPath to properly detect clicks inside the component’s shadow DOM
//         const path = event.composedPath();// 
//         if (!path.includes(this.template.host)) {
//             this.showSearchBox = false;
//         }
//     }
// }

// // import { LightningElement, track } from 'lwc';
// // import searchProducts from '@salesforce/apex/GlobalProductSearchController.searchProducts';
// // import { NavigationMixin } from 'lightning/navigation';

// // export default class ProductSearch extends NavigationMixin(LightningElement) {
// //     @track searchTerm = '';
// //     @track products = [];
// //     @track showSearchBox = false;

// //     // connectedCallback() {
// //     //     document.addEventListener('click', this.handleClickOutside.bind(this));
// //     // }

// //     // disconnectedCallback() {
// //     //     document.removeEventListener('click', this.handleClickOutside.bind(this));
// //     // }

// //     // Open search box when the search icon is clicked
// //     handleIconClick(event) {
// //         event.stopPropagation();
// //         this.showSearchBox = true;
// //         // Focus the input after a tiny delay
// //         setTimeout(() => {
// //             const inputEl = this.template.querySelector('.search-input');
// //             if (inputEl) {
// //                 inputEl.focus();
// //             }
// //         }, 0);
// //     }

// //     // Prevent clicks inside the search box from propagating
// //     handleBoxClick(event) {
// //         event.stopPropagation();
// //     }

// //     // Handle input changes: fetch products if searchTerm is at least 2 characters
// //     handleInputChange(event) {
// //         this.searchTerm = event.target.value;
// //         console.log('searchTerm:', this.searchTerm);
// //         if (this.searchTerm.length >= 2) {
// //             console.log('searchTerm: 166', this.searchTerm);
// //             searchProducts({ searchTerm: this.searchTerm })
// //                 .then(result => {
// //                     this.products = result; // result is a list of {Id, Name}
// //                     console.log('searchTerm: result:', result);
// //                 })
// //                 .catch(error => {
// //                     console.error(' searchTerm: Error searching products:', error);
// //                 });
// //         } else {
// //             this.products = [];
// //         }
// //     }
    

// //     // Navigate to PDP when a product is clicked
// //     handleProductClick(event) {
// //         const productId = event.currentTarget.dataset.id;
// //         this.showSearchBox = false;
// //         this[NavigationMixin.Navigate]({
// //             type: 'standard__recordPage',
// //             attributes: {
// //                 recordId: productId,
// //                 objectApiName: 'Product2',
// //                 actionName: 'view'
// //             }
// //         });
// //     }

// //     // Close the search box if click is outside the component using composedPath()
// //     handleClickOutside(event) {
// //         const path = event.composedPath();
// //         // If the component's host element is not in the event path, close the search box.
// //         if (!path.includes(this.template.host)) {
// //             this.showSearchBox = false;
// //         }
// //     }
// // }


// // import { LightningElement, track, wire } from 'lwc';
// // import searchProducts from '@salesforce/apex/GlobalProductSearchController.searchProducts';
// // import { NavigationMixin } from 'lightning/navigation';
// // import { getRecord } from 'lightning/uiRecordApi';
// // import USER_ID from '@salesforce/user/Id';

// // const USER_FIELDS = ['User.AccountId'];

// // export default class ProductSearch extends NavigationMixin(LightningElement) {
// //     @track searchTerm = '';
// //     @track products = [];
// //     @track showSearchBox = false;
// //     accountId;
// //     userId = USER_ID; 

// //     // Fetch logged-in user's AccountId
// //     @wire(getRecord, { recordId: '$userId', fields: USER_FIELDS })
// //     wiredUser({ error, data }) {
// //         if (data) {
// //             this.accountId = data.fields.AccountId.value;
// //             console.log(' Fetched AccountId:', this.accountId);
// //         } else if (error) {
// //             console.error(' Error fetching AccountId:', error);
// //         }
// //     }

// //     // Open search box
// //     handleIconClick(event) {
// //         event.stopPropagation();
// //         this.showSearchBox = true;
// //         setTimeout(() => {
// //             const inputEl = this.template.querySelector('.search-input');
// //             if (inputEl) {
// //                 inputEl.focus();
// //             }
// //         }, 0);
// //     }

// //     // Prevent search box from closing when clicking inside
// //     handleBoxClick(event) {
// //         event.stopPropagation();
// //     }

// //     // Handle input change and search products
// //     handleInputChange(event) {
// //         this.searchTerm = event.target.value;
// //         if (this.searchTerm.length >= 2) {
// //             console.log(' Searching for:', this.searchTerm);
// //             searchProducts({ searchTerm: this.searchTerm, effectiveAccountId: this.accountId })
// //                 .then(result => {
// //                     this.products = result;
// //                     console.log(' Search Results:', result);
// //                 })
// //                 .catch(error => {
// //                     console.error(' Error searching products:', error);
// //                 });
// //         } else {
// //             this.products = [];
// //         }
// //     }

// //     // Navigate to Product Detail Page (PDP)
// //     handleProductClick(event) {
// //         const productId = event.currentTarget.dataset.id;
// //         this.showSearchBox = false;
// //         this[NavigationMixin.Navigate]({
// //             type: 'standard__recordPage',
// //             attributes: {
// //                 recordId: productId,
// //                 objectApiName: 'Product2',
// //                 actionName: 'view'
// //             }
// //         });
// //     }

// //     // Close search box when clicking outside
// //     handleClickOutside(event) {
// //         const path = event.composedPath();
// //         if (!path.includes(this.template.host)) {
// //             this.showSearchBox = false;
// //         }
// //     }
// // }



// productSearch.js
// import { LightningElement, track } from 'lwc';
// import searchProducts from '@salesforce/apex/ProductSearchController.searchProducts';
// import { NavigationMixin } from 'lightning/navigation';

// export default class ProductSearch extends NavigationMixin(LightningElement) {
//     @track searchKey = '';
//     @track products = [];
//     @track categories = [];
//     @track isLoading = false;
    
//     // Use your actual Community Id
//     communityId = '0DBNS000000XEFV';

//     // Called when the search input value changes
//     handleInputChange(event) {
//         this.searchKey = event.target.value;
//         console.log('🔍 handleInputChange: Search Key =', this.searchKey);
//         if (this.searchKey.length > 2) {
//             console.log('🚀 Input length > 2, fetching search results...');
//             this.fetchSearchResults();
//         } else {
//             this.products = [];
//             this.categories = [];
//             console.log('⚠️ Input too short, clearing results.');
//         }
//     }

//     // Calls the Apex method to fetch products and categories
//     fetchSearchResults() {
//         this.isLoading = true;
//         console.log('🚀 fetchSearchResults: Calling Apex with CommunityId:', this.communityId, 'and SearchKey:', this.searchKey);
//         searchProducts({ communityId: this.communityId, searchKey: this.searchKey })
//             .then(result => {
//                 console.log('✅ Apex Response:', JSON.stringify(result));
//                 if (result) {
//                     this.products = result.products || [];
//                     this.categories = result.categories || [];
//                     console.log('🎯 Products Received:', this.products);
//                     console.log('📂 Categories Received:', this.categories);
//                 } else {
//                     console.warn('⚠️ No results returned from Apex.');
//                     this.products = [];
//                     this.categories = [];
//                 }
//             })
//             .catch(error => {
//                 console.error('❌ Error fetching search results:', error);
//             })
//             .finally(() => {
//                 this.isLoading = false;
//                 console.log('✅ fetchSearchResults: Completed');
//             });
//     }

//     // When a product is clicked, navigate to its record page (PDP) and reset the search state
//     handleProductClick(event) {
//         const productId = event.currentTarget.dataset.id;
//         console.log('🛒 handleProductClick: Product clicked with Id =', productId);
//         this[NavigationMixin.Navigate]({
//             type: 'standard__recordPage',
//             attributes: {
//                 recordId: productId,
//                 objectApiName: 'Product2',
//                 actionName: 'view'
//             }
//         });
//         this.resetSearch();
//     }

//     // Resets search key and results
//     resetSearch() {
//         console.log('🔄 resetSearch: Resetting search state');
//         this.searchKey = '';
//         this.products = [];
//         this.categories = [];
//     }
    
//     // Getter to conditionally display the "No products found" message
//     get noProductsFound() {
//         return !this.isLoading && this.products.length === 0 && this.searchKey.length > 2;
//     }
    
//     // Getter to conditionally display the categories section
//     get showCategories() {
//         return this.categories && this.categories.length > 0;
//     }
// }





import { LightningElement, track } from 'lwc';
import { NavigationMixin } from 'lightning/navigation'; 
import searchByName from '@salesforce/apex/ProductSearchController.searchByName';

export default class ProductSearch extends NavigationMixin(LightningElement) {
    @track isSearchOpen = false;   // Initially false -> only the icon is visible
    @track searchKey = '';// User input
    @track products = [];// Search results
    @track categories = [];// Search results
    @track isLoading = false;//c/categoryProductList1 

    // If you want to hide the dropdown if no results, you can track showDropdown as well
    @track showDropdown = false;

    // Reset each time the component loads (e.g., new page)
    connectedCallback() {// 
        console.log(' connectedCallback -> resetting search');// 
        this.resetSearch();
    }

    // 1) If user clicks the icon -> show the search bar
    handleIconClick() {
        console.log('  Search icon clicked -> opening search bar');
        this.isSearchOpen = true;
    }

    // 2) If user types in the search bar
    handleInputChange(event) {
        this.searchKey = event.target.value;
        console.log('  Search input changed:', this.searchKey);

        if (this.searchKey.length > 2) {
            this.fetchSearchResults();
        } else {
            // Clear if too short
            this.products = [];
            this.categories = [];
            this.showDropdown = false;
        }
    }

    // 3) Fetch product & category from Apex
    fetchSearchResults() {
        this.isLoading = true;
        this.showDropdown = true;  // Show the dropdown once we start searching
        console.log(' Calling Apex with searchKey:', this.searchKey);

        searchByName({ searchKey: this.searchKey }) // Apex method
            .then(result => {
                console.log('  Apex Response:', JSON.stringify(result));// "result" is a map with keys: "products" and "categories"
                if (result) {
                    this.products = result.products || []; // Set the products and categories
                    this.categories = result.categories || [];//    this.showDropdown = (this.products.length > 0 || this.categories.length > 0);
                    console.log('  Products:', this.products);
                    console.log('  Categories:', this.categories);
                } else {
                    console.warn(' No results from Apex');
                    this.products = [];
                    this.categories = [];
                }
            })
            .catch(error => { // Error handling
                console.error(' Error fetching search results:', error);
                this.products = []; // Clear on error
                this.categories = [];
            })
            .finally(() => {
                this.isLoading = false;
                console.log(' fetchSearchResults completed');
            });
    }

    // 4) Click product -> standard record page for Product2
    handleProductClick(event) {  // When a product is clicked, navigate to its record page (PDP)
        const productId = event.currentTarget.dataset.id;
        console.log(' Product clicked. ID:', productId);

        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: productId,
                objectApiName: 'Product2',
                actionName: 'view'
            }
        });
        // reset so next page also starts with icon
        this.resetSearch();
    }

    // 5) Click category -> standard record page for ProductCategory
    handleCategoryClick(event) { // When a category is clicked, navigate to its record page
        const categoryId = event.currentTarget.dataset.id;
        console.log('  Category clicked. ID:', categoryId);

        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: categoryId,
                objectApiName: 'ProductCategory',
                actionName: 'view'
            }
        });
        // reset so next page also starts with icon
        this.resetSearch();
    }

    // Reset to icon-only
    resetSearch() { // Reset search
        console.log('  Resetting search');
        this.isSearchOpen = false;
        this.searchKey = '';
        this.products = [];
        this.categories = [];
        this.isLoading = false;
        this.showDropdown = false;
    }

    // If typed enough but no results
    get noResults() { // If no results
        return !this.isLoading && // Not loading
               this.searchKey.length > 2 &&// Typed enough
               this.products.length === 0 &&//c/categoryProductList1 
               this.categories.length === 0; // No results
    }
}









































// // //How It Works:
// // Search Icon Click:
// // Clicking the search icon calls handleIconClick(), which sets showSearchBox to true and focuses on the input.

// // User Input:
// // When the user types at least 2 characters, handleSearchChange() calls the Apex method to get related products and displays them.

// // Product Click:
// // Clicking a product calls handleProductClick(), which navigates to the PDP using the product ID and closes the search box.

// // Click Outside:
// // The global event listener in handleClickOutside() detects clicks outside the component and sets showSearchBox to false, hiding the search box and showing only the search icon.

// // This should meet your requirement that when you click anywhere outside, the search box closes and only the search icon remains visible. Let me know if you need further modifications!
// @track accounts;
// @track noResults = false;
// handleSearch(event) {
//     const searchTerm = event.target.value;
//     if (searchTerm) {
//         searchAccounts({ searchKey: searchTerm })
//             .then(result => {
//                 this.accounts = result;
//                 this.noResults = result.length === 0;
//             })
//             .catch(error => {
//                 console.error('Error searching accounts: ', error);
//                 this.accounts = undefined;
//                 this.noResults = true;
//             });
//     } else {
//         this.accounts = undefined;
//         this.noResults = false;
//     }
// }
// }