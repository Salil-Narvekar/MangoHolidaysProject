// src/api/mangoholidaysApi.js

// --- 1. Configuration and Utility ---

// 🛑 IMPORTANT: Relative URL for use with local proxy (e.g., in package.json)
const BASE_URL = "https://mantra.mangoholidays.in/Services/WebsiteData/WebsiteDataService.svc";        // For Live
// const BASE_URL = "/Services/WebsiteData/WebsiteDataService.svc";                                        // For Local


// Credentials
const USER_NAME = "mhwebsite";
const PASSWORD = "mango";

/**
 * Generates the headers. Now includes Custom Username/Password headers.
 * @returns {Object} Headers object.
 */
function getAuthHeaders() {
    return {
        "Content-Type": "application/json",

        // 🛑 NEW: Custom headers for authentication
        Username: USER_NAME,
        Password: PASSWORD,
    };
}

// --- 2. API Fetching Functions ---

/**
 * Endpoint 1: Gets the list of products based on sector and other parameters.
 * @param {Object} params - Query string parameters (e.g., {ProductType: "World"})
 * @returns {Promise<Object>} - The JSON response data.
 */
export async function getProductList(params) {
    const headers = getAuthHeaders();
    const endpoint = "/GetProductListBySectorForWebsite";

    const authParams = {
        ...params,
        UserName: USER_NAME,
        Password: PASSWORD,
    };

    const queryString = new URLSearchParams(authParams).toString();
    const fullUrl = `${BASE_URL}${endpoint}?${queryString}`;

    // 🕵️ DEBUG STEP 1: Log the full request details
    // console.log("--- API CALL: getProductList (Tour List) ---");
    // console.log("URL:", fullUrl);
    // console.log("Method: GET");
    // console.log("Headers:", headers);
    // console.log("-------------------------------------------------------------");

    try {
        const response = await fetch(fullUrl, {
            method: "GET",
            headers: headers,
        });

        if (!response.ok) {
            let errorMessage = `HTTP error! Status: ${response.status} - ${response.statusText}`;

            try {
                const errorBody = await response.json();
                errorMessage += ` | Server Message: ${JSON.stringify(errorBody)}`;
            } catch (e) {
                const errorText = await response.text();
                errorMessage += ` | Response Content: ${errorText.substring(
                    0,
                    150
                )}...`;
            }

            console.error("API Call failed:", errorMessage);
            throw new Error(errorMessage);
        }

        // 🟢 SUCCESS: Log successful status
        // console.log("API Status: 200 OK. Parsing data...");

        const data = await response.json();

        // 🕵️ DEBUG STEP 2: Log the received data structure
        // console.log(
        //     "API Data Received (ProductList sample):",
        //     data.ProductList && data.ProductList.length > 0
        //         ? data.ProductList[0]
        //         : data
        // );
        // console.log(
        //     "-------------------------------------------------------------"
        // );

        return data;
    } catch (error) {
        if (error.message === "Failed to fetch") {
            console.error(
                "Critical Network Error (CORS/Proxy Issue):",
                "The request failed before the server responded. Ensure your local proxy is running and configured."
            );
            throw new Error(
                "Network connection failed. Check your package.json proxy configuration."
            );
        }

        console.error("General Fetching Error (getProductList):", error);
        throw error;
    }
}

// --- Endpoint 2: Product Details ---
/**
 * Endpoint 2: Gets details for a single product.
 * @param {string} productID - The Product ID.
 * @param {string} productCode - The Product Code (e.g., E32).
 * @returns {Promise<Object>} - The JSON response data.
 */
export async function getProductDetails(productID, productCode) {
    const headers = getAuthHeaders();
    const endpoint = "/GetProductForWebsite";

    const authParams = {
        ProductID: productID,
        ProductCode: productCode,
        UserName: USER_NAME,
        Password: PASSWORD,
    };

    const queryString = new URLSearchParams(authParams).toString();
    const fullUrl = `${BASE_URL}${endpoint}?${queryString}`;

    // 🕵️ DEBUG STEP 1: Log the full request details
    // console.log("--- API CALL: getProductDetails (Single Tour) ---");
    // console.log("URL:", fullUrl);
    // console.log("Method: GET");
    // console.log("Headers:", headers);
    // console.log("-------------------------------------------------------------");

    try {
        const response = await fetch(fullUrl, {
            method: "GET",
            headers: headers,
        });

        if (!response.ok) {
            let errorMessage = `HTTP error! Status: ${response.status} - ${response.statusText}`;

            try {
                const errorBody = await response.json();
                errorMessage += ` | Server Message: ${JSON.stringify(errorBody)}`;
            } catch (e) {
                const errorText = await response.text();
                errorMessage += ` | Response Content: ${errorText.substring(
                    0,
                    150
                )}...`;
            }

            console.error("API Call failed:", errorMessage);
            throw new Error(errorMessage);
        }

        // 🟢 SUCCESS: Log successful status
        // console.log("API Status: 200 OK. Parsing data...");

        const data = await response.json();

        // 🕵️ DEBUG STEP 2: Log the received data structure
        // console.log("API Data Received (ProductDetails sample):", data);
        // console.log(
        //     "-------------------------------------------------------------"
        // );

        return data;
    } catch (error) {
        if (error.message === "Failed to fetch") {
            console.error(
                "Critical Network Error (CORS/Proxy Issue):",
                "The request failed before the server responded. Ensure your local proxy is running and configured."
            );
            throw new Error(
                "Network connection failed. Check your package.json proxy configuration."
            );
        }
        console.error("General Fetching Error (getProductDetails):", error);
        throw error;
    }
}

// --- Endpoint 3: Tour Pricing Details ---
/**
 * Endpoint 3: Gets Tour Pricing Details.
 * @param {string} tourDetailID - The Tour Detail ID.
 * @param {string} tourCode - The Tour Code (e.g., E32061023).
 * @returns {Promise<Object>} - The JSON response data.
 */
export async function getTourPricingDetails(tourDetailID, tourCode) {
    const headers = getAuthHeaders();
    const endpoint = "/GetTourPricingDetailForWebsite";

    const authParams = {
        TourDetailID: tourDetailID,
        TourCode: tourCode,
        UserName: USER_NAME,
        Password: PASSWORD,
    };

    const queryString = new URLSearchParams(authParams).toString();
    const fullUrl = `${BASE_URL}${endpoint}?${queryString}`;

    // 🕵️ DEBUG STEP 1: Log the full request details
    // console.log("--- API CALL: getTourPricingDetails (Pricing) ---");
    // console.log("URL:", fullUrl);
    // console.log("Method: GET");
    // console.log("Headers:", headers);
    // console.log("-------------------------------------------------------------");

    try {
        const response = await fetch(fullUrl, {
            method: "GET",
            headers: headers,
        });

        if (!response.ok) {
            let errorMessage = `HTTP error! Status: ${response.status} - ${response.statusText}`;

            try {
                const errorBody = await response.json();
                errorMessage += ` | Server Message: ${JSON.stringify(errorBody)}`;
            } catch (e) {
                const errorText = await response.text();
                errorMessage += ` | Response Content: ${errorText.substring(
                    0,
                    150
                )}...`;
            }

            console.error("API Call failed:", errorMessage);
            throw new Error(errorMessage);
        }

        // 🟢 SUCCESS: Log successful status
        // console.log("API Status: 200 OK. Parsing data...");

        const data = await response.json();

        // 🕵️ DEBUG STEP 2: Log the received data structure
        // console.log("API Data Received (PricingDetails sample):", data);
        // console.log(
        //     "-------------------------------------------------------------"
        // );

        return data;
    } catch (error) {
        if (error.message === "Failed to fetch") {
            console.error(
                "Critical Network Error (CORS/Proxy Issue):",
                "The request failed before the server responded. Ensure your local proxy is running and configured."
            );
            throw new Error(
                "Network connection failed. Check your package.json proxy configuration."
            );
        }
        console.error("General Fetching Error (getTourPricingDetails):", error);
        throw error;
    }
}
