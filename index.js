document.addEventListener("DOMContentLoaded", function () {

    /* =========================================
       VAAMIO CART
    ========================================= */

    let cart =
        JSON.parse(localStorage.getItem("vaamioCart")) || [];


    const cartItems =
        document.getElementById("cartItems");

    const cartTotal =
        document.getElementById("cartTotal");

    const cartCount =
        document.getElementById("cartCount");


    /* =========================================
       UPDATE CART COUNT
    ========================================= */

    function updateCartCount() {

        let totalItems = 0;

        cart.forEach(function (item) {

            totalItems += Number(item.quantity);

        });

        if (cartCount) {

            cartCount.textContent =
                totalItems;

        }

    }


    /* =========================================
       SAVE CART
    ========================================= */

    function saveCart() {

        localStorage.setItem(
            "vaamioCart",
            JSON.stringify(cart)
        );

    }


    /* =========================================
       RENDER CART
    ========================================= */

    function renderCart() {

        if (!cartItems) {
            updateCartCount();
            return;
        }


        /* EMPTY CART */

        if (cart.length === 0) {

            cartItems.innerHTML = `
                <div class="empty-cart">
                    No Items in Cart.
                </div>
            `;

            if (cartTotal) {

                cartTotal.textContent =
                    "₹0";

            }

            updateCartCount();

            return;
        }


        /* CART HAS ITEMS */

        let subtotal = 0;

        let html = "";


        cart.forEach(function (item, index) {

            subtotal +=
                Number(item.price) *
                Number(item.quantity);


            html += `
    <div
        class="cart-line"
        style="
            display:flex;
            align-items:center;
            gap:12px;
            padding:16px;
            margin-bottom:12px;
            background:#f0e8d8;
            border-radius:16px;
            width:100%;
            box-sizing:border-box;
        "
    >

        <!-- PRODUCT IMAGE -->

        <div
            style="
                width:72px;
                height:72px;
                flex-shrink:0;
            "
        >

            <img
                src="${item.image}"
                alt="${item.name}"
                style="
                    width:100%;
                    height:100%;
                    object-fit:cover;
                    border-radius:10px;
                    display:block;
                "
            >

        </div>


        <!-- PRODUCT DETAILS -->

        <div
            style="
                flex:1;
                min-width:0;
            "
        >

            <strong
                style="
                    display:block;
                    font-size:.9rem;
                    font-weight:700;
                    color:#0a3d2e;
                    margin-bottom:4px;
                "
            >
                ${item.name}
            </strong>


            <small
                style="
                    display:block;
                    font-size:.75rem;
                    color:#777;
                    margin-bottom:10px;
                "
            >
                ₹${item.price}
            </small>


            <!-- QUANTITY -->

            <div
                style="
                    display:flex;
                    align-items:center;
                    gap:8px;
                "
            >

                <!-- MINUS -->

                <button
                    type="button"
                    onclick="decreaseCartItem(${index})"
                    style="
                        width:30px;
                        height:30px;
                        min-width:30px;
                        padding:0;
                        border:1px solid #999;
                        background:#f8f8f8;
                        border-radius:50%;
                        display:flex;
                        align-items:center;
                        justify-content:center;
                        font-size:18px;
                        line-height:1;
                        cursor:pointer;
                    "
                >
                    −
                </button>


                <!-- NUMBER CIRCLE -->

                <span
                    style="
                        width:30px;
                        height:30px;
                        min-width:30px;
                        border-radius:50%;
                        display:flex;
                        align-items:center;
                        justify-content:center;
                        background:#fff;
                        border:1px solid rgba(10,61,46,.20);
                        color:#0a3d2e;
                        font-size:.8rem;
                        font-weight:700;
                        line-height:1;
                    "
                >
                    ${item.quantity}
                </span>


                <!-- PLUS -->

                <button
                    type="button"
                    onclick="increaseCartItem(${index})"
                    style="
                        width:30px;
                        height:30px;
                        min-width:30px;
                        padding:0;
                        border:1px solid #999;
                        background:#f8f8f8;
                        border-radius:50%;
                        display:flex;
                        align-items:center;
                        justify-content:center;
                        font-size:18px;
                        line-height:1;
                        cursor:pointer;
                    "
                >
                    +
                </button>

            </div>

        </div>


        <!-- PRICE + REMOVE -->

        <div
            style="
                text-align:right;
                flex-shrink:0;
            "
        >

            <strong
                style="
                    display:block;
                    font-size:1rem;
                    color:#0a3d2e;
                    margin-bottom:8px;
                "
            >
                ₹${item.price * item.quantity}
            </strong>


            <button
                type="button"
                onclick="removeCartItem(${index})"
                style="
                    border:0;
                    background:transparent;
                    padding:0;
                    color:#c94f29;
                    font-size:.7rem;
                    cursor:pointer;
                "
            >
                Remove
            </button>

        </div>

    </div>
`;

        });


        cartItems.innerHTML =
            html;


        if (cartTotal) {

            cartTotal.textContent =
                "₹" + subtotal;

        }


        updateCartCount();

    }


    /* =========================================
       ADD TO CART
    ========================================= */

    /* =========================================
   ADD TO CART
========================================= */

document
    .querySelectorAll(".add-to-cart")
    .forEach(function (button) {

        button.addEventListener(
            "click",
            function (event) {

                event.preventDefault();
                event.stopPropagation();


                /* PRODUCT DATA */

                const product = {

                    name:
                        this.dataset.name,

                    price:
                        Number(
                            this.dataset.price
                        ),

                    image:
                        this.dataset.image,

                    quantity: 1

                };


                /* CHECK EXISTING PRODUCT */

                const existingProduct =
                    cart.find(function (item) {

                        return item.name ===
                            product.name;

                    });


                /* ADD / INCREASE */

                if (existingProduct) {

                    existingProduct.quantity += 1;

                } else {

                    cart.push(product);

                }


                /* SAVE CART */

                saveCart();


                /* REFRESH CART */

                renderCart();

                updateCartCount();


                /* =====================================
                   OPEN CART AUTOMATICALLY
                ====================================== */

                const cartCanvas =
                    document.getElementById(
                        "cartCanvas"
                    );


                if (cartCanvas) {

                    const cartDrawer =
                        bootstrap.Offcanvas
                            .getOrCreateInstance(
                                cartCanvas
                            );

                    cartDrawer.show();

                }

            }
        );

    });


    /* =========================================
       INCREASE QUANTITY
    ========================================= */

    window.increaseCartItem =
        function (index) {

            if (!cart[index]) {
                return;
            }


            cart[index].quantity += 1;


            saveCart();

            renderCart();

        };


    /* =========================================
       DECREASE QUANTITY
    ========================================= */

    window.decreaseCartItem =
        function (index) {

            if (!cart[index]) {
                return;
            }


            if (cart[index].quantity > 1) {

                cart[index].quantity -= 1;

            } else {

                cart.splice(index, 1);

            }


            saveCart();

            renderCart();

        };


    /* =========================================
       REMOVE PRODUCT
    ========================================= */

    window.removeCartItem =
        function (index) {

            if (!cart[index]) {
                return;
            }


            cart.splice(index, 1);


            saveCart();

            renderCart();

        };


    /* =========================================
       INITIAL CART LOAD
    ========================================= */

    renderCart();

    updateCartCount();

});