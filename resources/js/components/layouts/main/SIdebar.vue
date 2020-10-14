<template>
    <div class="sidebar" data-color="azure" data-background-color="black">
        <!--
Tip 1: You can change the color of the sidebar using: data-color="purple | azure | green | orange | danger"

Tip 2: you can also add an image using data-image tag
    -->
        <div class="logo">
            <router-link to="/dashboard" class="simple-text logo-mini"
                >CS</router-link
            >
            <router-link to="/dashboard" class="simple-text logo-normal"
                >City Support</router-link
            >
        </div>
        <div class="sidebar-wrapper">
            <ul class="nav">
                <li class="nav-item">
                    <router-link to="/dashboard" class="nav-link"
                        ><i class="material-icons">dashboard</i>
                        <p>Dashboard</p></router-link
                    >
                </li>
                <li class="nav-item">
                    <router-link to="/products" class="nav-link"
                        ><i class="material-icons">Product</i>
                        <p>Product</p></router-link
                    >
                </li>
                <li class="nav-item">
                    <router-link to="/sales" class="nav-link"
                        ><i class="material-icons">Purchase</i>
                        <p>Purchase</p></router-link
                    >
                </li>
                <li class="nav-item">
                    <router-link to="/service-histories" class="nav-link"
                        ><i class="material-icons">Service</i>
                        <p>Service History</p></router-link
                    >
                </li>
                <li class="nav-item">
                    <router-link to="/technicians" class="nav-link"
                        ><i class="material-icons">Technicians</i>
                        <p>Technicians</p></router-link
                    >
                </li>
                <li class="nav-item">
                    <router-link to="/customers" class="nav-link"
                        ><i class="material-icons">Customers</i>
                        <p>Customers</p></router-link
                    >
                </li>
                <li class="nav-item">
                    <router-link to="/admin-users" class="nav-link"
                        ><i class="material-icons">Moderator</i>
                        <p>Moderator</p></router-link
                    >
                </li>
            </ul>
        </div>
    </div>
</template>
