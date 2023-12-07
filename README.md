# [SwiftWheels Co. LTD](https://ass-11-career-maker-client.web.app/)

This is an e-commerce rental web site. Here we offer many types of rental Cars & Bikes

## Table of Contents

- [Special Features](#special-features)
- [Home page features](#home-page-features)
- [Alert](#alert)
- [Design](#design)
- [Login Options](#login-options)
- [Authentication System](#authentication-system)
- [Cart](#cart)
- [Add Update Delete Product](#add-update-delete-product)
- [Search Service](#search-service)
- [All Products](#all-products)

## Special Features

- [Tanstack query mutations](https://tanstack.com/query/v4/docs/react/guides/mutations): We use useMutation() in our [addService](./src/Pages/AddService/AddService.jsx) page to create service.
- [Framer motion](https://www.npmjs.com/package/framer-motion): We use motion.div to check our terms and conditions in [signUp](./src/Pages/Credential/SignUp.jsx) page.
- [React Simple Typewriter](https://www.npmjs.com/package/react-simple-typewriter): We use Typewriter in our home page banner headlines.
- [Hemlet](): We use Helmet to show our page titles dynamically. 

## Home Page Features

In our home page we use six sections - navbar [Nav links: Home with services (cars & bikes) ], Banner, popular vehicles, Two Introduction section to our cars & bikes collection [Extra section], Testimonial [Extra section], Footer section.

## Alert

To give alert any actions in client or server site to user, I use sweetalert2.

## Design

Here we use [tailwincss](https://tailwindcss.com/) with [daisy UI](https://daisyui.com/) component library to style our site. With this we also use [Sweet Alert2](https://sweetalert2.github.io/) to show alerts or notifications to user.

Each service car contain provider info & short description of the service

## Login Options

Here we use email-password login system with google sign in system. User can register only using name, email & password. All using firebase authentication system.

## Authentication System

We use [firebase](https://firebase.google.com/) to check users authentication. And our site also host in this hosting provider.

We also use MongoDB as our database where use store users info.

## Cart

Here we implement cart system where an user can store his/her service to purchase. & can see the cart with details information.

## Add Update Delete Product

Real user can update or add new products. Also can delete the product if s/he want.

## Search Service

User can search by characters which result the services which contained in service title. If no product found s/he also can order the product directly to make the desired product.

## All Products

User also can see all cars & bikes on [cars](./src/Pages/Cars/Cars.jsx) & [bikes](./src/Pages/Bikes/Bikes.jsx) pages respectively.

## Own services

User can see, update of his own services which are added by him on [mySchedules](./src/Pages/Schedules/Schedules.jsx) page and also can manage his services from [MyServices](./src/Pages/MyServices/MyServices.jsx) page.
