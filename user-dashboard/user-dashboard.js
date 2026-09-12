document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       SIDEBAR
    ===================================================== */

    const menuButton =
        document.getElementById("userMenuBtn");

    const sidebar =
        document.getElementById("userSidebar");

    const overlay =
        document.getElementById("userOverlay");


    function openSidebar() {

        if (!sidebar || !overlay) return;

        sidebar.classList.add("show");
        overlay.classList.add("show");

        document.body.style.overflow = "hidden";

    }


    function closeSidebar() {

        if (!sidebar || !overlay) return;

        sidebar.classList.remove("show");
        overlay.classList.remove("show");

        document.body.style.overflow = "";

    }


    if (menuButton) {

        menuButton.addEventListener(
            "click",
            openSidebar
        );

    }


    if (overlay) {

        overlay.addEventListener(
            "click",
            closeSidebar
        );

    }


    /* =====================================================
       NAVIGATION
    ===================================================== */

    const navLinks =
        document.querySelectorAll(
            ".user-nav-link"
        );


    navLinks.forEach(function (link) {

        link.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                navLinks.forEach(
                    function (item) {
                        item.classList.remove("active");
                    }
                );

                this.classList.add("active");


                if (window.innerWidth <= 991) {
                    closeSidebar();
                }

            }
        );

    });


    /* =====================================================
       SEARCH
    ===================================================== */

    const search =
        document.getElementById(
            "userSearch"
        );


    if (search) {

        search.addEventListener(
            "keydown",
            function (event) {

                if (event.key !== "Enter") {
                    return;
                }

                const value =
                    this.value.trim();

                if (!value) {

                    alert(
                        "Please enter a product name."
                    );

                    return;

                }

                alert(
                    "Searching VAAMIO for: " +
                    value
                );

            }
        );

    }


    /* =====================================================
       ORDER BUTTONS
    ===================================================== */

    const orderButtons =
        document.querySelectorAll(
            ".view-order-btn"
        );


    orderButtons.forEach(
        function (button) {

            button.addEventListener(
                "click",
                function () {

                    const row =
                        this.closest("tr");

                    if (!row) return;

                    const order =
                        row.querySelector(
                            "td strong"
                        );

                    if (!order) return;

                    alert(
                        "Opening order " +
                        order.textContent.trim()
                    );

                }
            );

        }
    );


    /* =====================================================
       LOGOUT
    ===================================================== */

    const logout =
        document.querySelector(
            ".logout"
        );


    if (logout) {

        logout.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                const confirmLogout =
                    confirm(
                        "Are you sure you want to logout?"
                    );

                if (confirmLogout) {

                    window.location.href =
                        "../home.html";

                }

            }
        );

    }


    /* =====================================================
       WINDOW RESIZE
    ===================================================== */

    window.addEventListener(
        "resize",
        function () {

            if (
                window.innerWidth > 991 &&
                sidebar
            ) {

                sidebar.classList.remove("show");

                if (overlay) {
                    overlay.classList.remove("show");
                }

                document.body.style.overflow = "";

            }

        }
    );

});