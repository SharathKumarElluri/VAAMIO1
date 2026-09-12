document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       SIDEBAR
    ===================================================== */

    const menuButton =
        document.getElementById("adminMenuBtn");

    const sidebar =
        document.getElementById("adminSidebar");

    const overlay =
        document.getElementById("adminOverlay");


    function openAdminSidebar() {

        if (!sidebar || !overlay) return;

        sidebar.classList.add("show");

        overlay.classList.add("show");

        document.body.style.overflow = "hidden";

    }


    function closeAdminSidebar() {

        if (!sidebar || !overlay) return;

        sidebar.classList.remove("show");

        overlay.classList.remove("show");

        document.body.style.overflow = "";

    }


    if (menuButton) {

        menuButton.addEventListener(
            "click",
            openAdminSidebar
        );

    }


    if (overlay) {

        overlay.addEventListener(
            "click",
            closeAdminSidebar
        );

    }


    /* =====================================================
       NAVIGATION
    ===================================================== */

    const navLinks =
        document.querySelectorAll(
            ".admin-nav-link"
        );


    navLinks.forEach(function (link) {

        link.addEventListener(
            "click",
            function (event) {

                const isLogout =
                    this.classList.contains(
                        "admin-logout"
                    );

                const isWebsite =
                    this.getAttribute("href") !== "#";


                if (!isLogout && !isWebsite) {

                    event.preventDefault();

                }


                if (
                    !isLogout &&
                    !isWebsite
                ) {

                    navLinks.forEach(
                        function (item) {

                            item.classList.remove(
                                "active"
                            );

                        }
                    );

                    this.classList.add("active");

                }


                if (window.innerWidth <= 991) {

                    closeAdminSidebar();

                }

            }
        );

    });


    /* =====================================================
       SEARCH
    ===================================================== */

    const search =
        document.getElementById(
            "adminSearch"
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
                        "Enter a product, order or customer."
                    );

                    return;

                }


                alert(
                    "Searching VAAMIO admin for: " +
                    value
                );

            }
        );

    }


    /* =====================================================
       SALES RANGE
    ===================================================== */

    const salesRange =
        document.getElementById(
            "salesRange"
        );


    if (salesRange) {

        salesRange.addEventListener(
            "change",
            function () {

                console.log(
                    "Sales range:",
                    this.value
                );

            }
        );

    }


    /* =====================================================
       ORDER BUTTONS
    ===================================================== */

    const viewButtons =
        document.querySelectorAll(
            ".admin-view-btn"
        );


    viewButtons.forEach(
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
                        "Opening " +
                        order.textContent.trim()
                    );

                }
            );

        }
    );


    /* =====================================================
       QUICK ACTIONS
    ===================================================== */

    const quickActions =
        document.querySelectorAll(
            ".quick-action"
        );


    quickActions.forEach(
        function (button) {

            button.addEventListener(
                "click",
                function () {

                    const title =
                        this.querySelector(
                            "strong"
                        );


                    if (!title) return;


                    alert(
                        title.textContent.trim()
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
            ".admin-logout"
        );


    if (logout) {

        logout.addEventListener(
            "click",
            function (event) {

                event.preventDefault();


                const confirmLogout =
                    confirm(
                        "Are you sure you want to logout from the admin panel?"
                    );


                if (confirmLogout) {

                    window.location.href =
                        "../home.html";

                }

            }
        );

    }


    /* =====================================================
       RESIZE
    ===================================================== */

    window.addEventListener(
        "resize",
        function () {

            if (
                window.innerWidth > 991 &&
                sidebar
            ) {

                sidebar.classList.remove(
                    "show"
                );

                if (overlay) {

                    overlay.classList.remove(
                        "show"
                    );

                }

                document.body.style.overflow = "";

            }

        }
    );

});