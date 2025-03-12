import { LightningElement, track, wire } from "lwc";
import { ProductAdapter } from "commerce/productApi";

export default class ProductDetails extends LightningElement {
    @track product;
    @track images = [];
    productId;

    // Extract product ID from the URL
    connectedCallback() {
        this.extractProductIdFromUrl();
    }

    extractProductIdFromUrl() {
        let urlSegments = window.location.pathname.split("/");
        this.productId = urlSegments[urlSegments.length - 1]; // Last part of URL
        console.log("Extracted Product ID:", this.productId);
    }

    // Fetch product details using Commerce Display API
    @wire(ProductAdapter, { productId: "$productId", excludeMedia: false })
    wiredProduct({ error, data }) {
        if (error) {
            console.error("Error fetching product:", error);
        } else if (data) {
            console.log("Product Data:", JSON.stringify(data));

            // Extract relevant fields
            this.product = {
                Name: data.fields.Name,
                StockKeepingUnit: data.fields.StockKeepingUnit,
                Description: data.fields.Description,
                StandardPrice: data.fields.StandardPrice || "Price not available",
            };

            this.extractProductImages(data);
        }
    }

    // Extract product images
    extractProductImages(data) {
        let imageUrls = [];

        if (data.mediaGroups && data.mediaGroups.length > 0) {
            let productDetailGroup = data.mediaGroups.find(
                (group) => group.developerName === "productDetailImage"
            );

            if (productDetailGroup && productDetailGroup.mediaItems.length > 0) {
                productDetailGroup.mediaItems.forEach((item) => {
                    if (item.url) {
                        imageUrls.push(item.url);
                    }
                });
            }
        }

        this.images = imageUrls.length > 0 ? imageUrls : [];
        console.log("Extracted Product Images:", this.images);
    }
}
