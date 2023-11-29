import IncorrectRequisition from '../errors/incorrectRequisition.js';

class Order {
  static async add(req, res, next) {
    try {
      const { user } = req;

      const cart = user.get('cart');
      if (!cart[0]) return next(new IncorrectRequisition('Your Cart is empty!'));
      await user.populate('cart.product');

      const orders = user.get('orders');

      // Calculate the total price of the cart
      let finalPrice = 0;
      cart.forEach((record) => {
        const { product } = record;
        finalPrice += product.price * record.quantity;
      });

      orders.push({ shopping: cart, price: finalPrice.toFixed(2) });
      user.set('cart', []);
      await user.save();

      return res.status(201).json({ success: true, orders });
    } catch (err) {
      return next(err);
    }
  }

  static async read(req, res, next) {
    try {
      const { user } = req;
      const orders = user.get('orders');
      await user.populate('orders.shopping.product');

      return res.status(201).json({ success: true, orders });
    } catch (err) {
      return next(err);
    }
  }

  static async readOne(req, res, next) {
    try {
      const { user } = req;
      const { id } = req.params;
      const order = user.get('orders').id(id);
      await user.populate('orders.shopping.product');

      return res.status(201).json({ success: true, order });
    } catch (err) {
      return next(err);
    }
  }
}

export default Order;
