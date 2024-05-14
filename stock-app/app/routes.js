import priceController from "./controllers/priceController.js";

const APP_ROUTES= [
  {
    path: '/price',
    method: 'get',
    controller: priceController.getPrice, 
  },
  //more routes here
];
export default APP_ROUTES