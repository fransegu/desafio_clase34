const restaurarviamail = async (paramEmail) =>{
    const token = document.getElementById('token').value;    
    const email = document.getElementById('email').value;
    const url = `http://localhost:8080/api/session/restaurarviamail`;
    const data = {
        email: email,
    };
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,        
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            console.error("Sending mail error:", response.status, response.statusText);
            return;
        }

        const result = await response.json();
        if (result.success) {
            form.reset(); 
        }
    } catch (error) {
        console.error("Fetch error:", error.message);
    }
}

const restaurar = async () =>{
    const token = document.getElementById('token').value;    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    console.log("token",token);
    const url = `http://localhost:8080/api/session/restaurar`;
    const data = {
        email: email,
        password: password,
    };
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,        
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            console.error("Fail:", response.status, response.statusText);
            return;
        }

        const result = await response.json();
        if (result.success) {
            form.reset(); 
        }
    } catch (error) {
        console.error("Fetch error:", error.message);
    }
}

const addToCart = async (cartId, _id) => {
    const id = document.getElementById('pid').value;

    const url = `http://localhost:8080/api/cart/${cartId}/products/${id}`;
    const data = {
        cartId: cartId,
        _id: _id,

    };

    console.log("cart", cartId, "product", _id);

    try {
        const response = await fetch(url, {
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
        console.log("Product added to cart:", result);
        location.reload(true);

    } catch (error) {
        console.error("Fetch error:", error.message);
    }
};


const deleteOne = async (cartId, _id) => {

    const url = `http://localhost:8080/api/cart/${cartId}/products/${_id}`;
    const data = {
        cartId: cartId,  
        _id: _id,
    };

    console.log("cartId", cartId, "product", _id);

    try {
        const response = await fetch( url, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            console.error("Error deleting product to cart:", response.status, response.statusText);
            return;
        }

        const result = await response.json();
        console.log("Product delete to cart:", result);
        location.reload(true);

    } catch (error) {
        console.error("Fetch error:", error.message);
    }
};


const addProductToCart = async (cartId, _id) => {
   
    const url = `http://localhost:8080/api/cart/${cartId}/products/${_id}`;
    const data = {
        cartId: cartId, 
        _id: _id,
    };

    console.log("cartId", cartId, "product", _id);

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
        location.reload(true);

    } catch (error) {
+        console.error("Fetch error:", error.message);
    }
};

const deleteAll = async (cartId) => {

    const url = `http://localhost:8080/api/cart/${cartId}`;
    const data = {
        cartId: cartId,  
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
            console.error("Error in deleting cart:", response.status, response.statusText);
            return;
        }

        const result = await response.json();

        console.log(" delete to cart:", result);
        location.reload(true);

    } catch (error) {
        console.error("Fetch error:", error.message);
    }
};

const createOneProduc = async () => {
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const price = document.getElementById('price').value;
    const stock = document.getElementById('stock').value;
    const code = document.getElementById('code').value;
    const category = document.getElementById('category').value;
    const thumbail = document.getElementById('thumbail').value;
    const token = document.getElementById('token').value;

    const data = {
        title: title,
        description: description,
        price: price,
        stock: stock,
        code: code,
        category: category,
        thumbail: thumbail

    };

    const url = 'http://localhost:8080/api/products/';
    try {
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,        
        },
        body: JSON.stringify(data),
    });
    if (!response.ok) {
        console.error("Error about adding product:", response.status, response.statusText);
        return;
    }
    const result = await response.json();

    console.log(" product add:", result);
    location.reload(true);

    } catch (error) {
    console.error("Fetch error:", error.message);
}
};

const deleteOneProdAll = async () => {
    const id = document.getElementById('id').value;
    const token = document.getElementById('token').value;

    const url = `http://localhost:8080/api/products/${id}`;
    try {
    const response = await fetch(url, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,        
        },
        body: JSON.stringify({ id: id }),
    });
    if (!response.ok) {
        console.error("Product removal error:", response.status, response.statusText);
        return;
    }
    const result = await response.json();

    console.log("Removed product:", result);
    location.reload(true);
    } catch (error) {
        console.error("Fetch error:", error.message);        
    }
}

async function changeUserRole(uid) {
    const email = document.getElementById('email').value;
    const userid = document.getElementById('uid').value;
    const selectedRole = document.getElementById('role').value;
    console.log(uid, userid, "uid front", role);

    try {
        const response = await fetch(`/api/users/premium/${uid}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ role: selectedRole }),
        });

        if (!response.ok) {
            console.error('Error changing role:', response.status, response.statusText);
            return;
        }

        const result = await response.json();
        console.log('Role changed successfully:', result);
    } catch (error) {
        console.error('Request error:', error.message);
    }
}