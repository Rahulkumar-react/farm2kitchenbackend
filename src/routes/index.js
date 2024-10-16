const express = require("express");
const categoryRoutes = require("./categoriesRoutes");
const ProductRoutes = require("./productRoutes");
const favoritesRoutes = require("./favoritesRoutes");
const authenticationRouters = require("./authenticationRouters");
const OrderHistoryRouters = require("./OrderHistoryRouters");
const AddCartRouters = require("./AddCartRouters");
const InventoryRouters = require("./inventoryRouters");
const OfferRouters = require("./OfferRouters");
const userDetailRouters = require("./userDetailsRouters");
const serviceLocationRouters = require("./serviceLocation");
const routes = express.Router();

routes.use('/category', categoryRoutes);
routes.use('/product', ProductRoutes);
routes.use('/favorites', favoritesRoutes);
routes.use('/authentication', authenticationRouters);
routes.use('/orderhistory', OrderHistoryRouters);
routes.use('/carts', AddCartRouters)
routes.use('/inventory', InventoryRouters);
routes.use('/offer', OfferRouters);
routes.use('/userDetails', userDetailRouters)
routes.use('/serviceLocation', serviceLocationRouters)

module.exports = routes;