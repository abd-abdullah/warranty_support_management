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
                    <router-link to="/send-sms" class="nav-link"
                        ><i class="material-icons">mail_outline</i>
                        <p>Send SMS</p></router-link
                    >
                </li>
                <li class="nav-item ">
                    <a class="nav-link" data-toggle="collapse" href="#setting">
                        <i class="material-icons">reports</i>
                        <p> Reports
                            <b class="caret"></b>
                        </p>
                    </a>
                    <div class="collapse" id="setting">
                        <ul class="nav">
                            <li class="nav-item ">
                                <router-link to="/advanced-search" class="nav-link"
                                    ><i class="material-icons">AS</i>
                                    <p>Advanced Search</p>
                                </router-link>
                            </li>
                            <li class="nav-item ">
                                <router-link to="/technician-report" class="nav-link"
                                    ><i class="material-icons">TR</i>
                                    <p>Technician Report</p>
                                </router-link>
                            </li>
                        </ul>
                    </div>
                </li>
                <li class="nav-item ">
                    <a class="nav-link" data-toggle="collapse" href="#setting">
                        <i class="material-icons">settings</i>
                        <p> Settings
                            <b class="caret"></b>
                        </p>
                    </a>
                    <div class="collapse" id="setting">
                        <ul class="nav">
                            <li class="nav-item ">
                                <router-link to="/customer-types" class="nav-link"
                                    ><i class="material-icons">CT</i>
                                    <p>Customer Type</p>
                                </router-link>
                            </li>
                            <li class="nav-item ">
                                <router-link to="/zones" class="nav-link"
                                    ><i class="material-icons">Z</i>
                                    <p>Zone</p>
                                </router-link>
                            </li>
                             <li class="nav-item">
                                <router-link to="/products" class="nav-link"
                                    ><i class="material-icons">Product</i>
                                    <p>Product</p></router-link
                                >
                            </li>
                            <li class="nav-item">
                                <router-link to="/admin-users" class="nav-link"
                                    ><i class="material-icons">Moderator</i>
                                    <p>Moderator</p></router-link
                                >
                            </li>
                            <li class="nav-item">
                                <router-link to="/sms-settings/form/1" class="nav-link"
                                    ><i class="material-icons">SMS</i>
                                    <p>SMS Setting</p></router-link
                                >
                            </li>
                        </ul>
                    </div>
                </li>
                <li class="nav-item hideBig">
                    <router-link to="/update-profile" class="nav-link"
                        ><i class="material-icons">support_agent</i>
                        <p>Profile</p></router-link
                    >
                </li>
                <li class="nav-item hideBig">
                    <a @click.prevent="logout" class="nav-link"
                        ><i class="material-icons">power_settings_new</i>
                        <p>Log Out</p>
                    </a>
                </li>
            </ul>
        </div>
    </div>
</template>
