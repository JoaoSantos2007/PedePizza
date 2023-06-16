import express from 'express';
import cookieParser from 'cookie-parser';
import product from './productRoutes.js';
import user from './userRoutes.js';
import auth from './authRoutes.js';
import order from './orderRoutes.js';

const Routes = (app) => {
  app.use((req, res, next) => {
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Headers', '*');
    res.set('Access-Control-Allow-Methods', '*');
    res.set('Access-Control-Allow-Credentials', true);
    next();
  });

  app.use(
    express.json(),
    cookieParser(),
    product,
    user,
    auth,
    order,
  );
};

export default Routes;
