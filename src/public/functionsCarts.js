const deleteOne = async (cid, _id, product) => {
    const cartId = document.getElementById('cid').value;

    const url = `http://localhost:8080/api/cart/${cid}/products/${product._id}`;
    const data = {
        cartId: cid, 
        _id: product._id,
    };

    console.log("cartId", cd, "product", _id);

    try {
        const response = await fetch( url, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            console.error("Error deleting product cart:", response.status, response.statusText);
            return;
        }

        const result = await response.json();
        console.log("Product delete:", result);
    } catch (error) {
        console.error("Fetch error:", error.message);
    }
};

const addProductToCart = async (cid, _id, product) => {
    const cid = document.getElementById('cid').value;
    const url = `http://localhost:8080/api/cart/${cid}/products/${product._id}`;
    const data = {
        cid: cid, 
        _id: product._id,
    };

    console.log("cartId", cid, "product", product._id);

    try {
        const response = await fetch( url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            console.error("Error adding product to cart:", response.status, response.statusText);
            return;
        }

        const result = await response.json();
        console.log("Product add to cart:", result);
    } catch (error) {
        console.error("Fetch error:", error.message);
    }
};

const deleteAll = async (cid) => {
    const cartId = document.getElementById('cid').value;
    const url = `http://localhost:8080/api/cart/${cid}`;
    const data = {
        cid: cid,  
    };

    try {
        const response = await fetch(url, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            console.error("Error deleting:", response.status, response.statusText);
            return;
        }

        const result = await response.json();
        console.log(" delete to cart:", result);
    } catch (error) {
        console.error("Fetch error:", error.message);
    }
};