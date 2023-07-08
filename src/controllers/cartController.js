import NotFoundError from '../errors/notFoundError.js';

class Cart {
  static async add(req, res, next) {
    try {
      const { user } = req;
      const { product, quantity } = req.body;

      const cart = user.get('cart');
      cart.push({ product, quantity });

      user.set('cart', cart);
      await user.save();

      await user.populate('cart.product');

      return res.status(201).json({ success: true, cart });
    } catch (err) {
      return next(err);
    }
  }

  static async read(req, res, next) {
    try {
      const { user } = req;
      const cart = user.get('cart');

      await user.populate('cart.product');

      return res.status(200).json({ success: true, cart });
    } catch (err) {
      return next(err);
    }
  }

  static async update(req, res, next) {
    try {
      const { user } = req;
      const { id } = req.params;
      const { quantity } = req.body;

      const productInCart = user.cart.id(id);
      if (!productInCart) throw new NotFoundError('Product not found!');

      productInCart.quantity = quantity;
      await user.save();

      const cart = user.get('cart');
      await user.populate('cart.product');

      return res.status(200).json({ success: true, cart });
    } catch (err) {
      return next(err);
    }
  }

  static async delete(req, res, next) {
    try {
      const { user } = req;
      const { id } = req.params;

      const productInCart = user.cart.id(id);
      if (!productInCart) throw new NotFoundError('Product not found!');

      await productInCart.deleteOne();
      await user.save();

      const cart = user.get('cart');
      await user.populate('cart.product');

      return res.status(200).json({ success: true, cart });
    } catch (err) {
      return next(err);
    }
  }
}

export default Cart;
