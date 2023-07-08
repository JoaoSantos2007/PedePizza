class Cart {
  static async add(req, res, next) {
    try {
      const { user } = req;
      const cart = user.get('cart');
      const { product, quantity } = req.body;

      cart.push({ product, quantity });
      user.set('cart', cart);
      await user.populate('cart.product');

      await user.save();

      return res.status(201).json({ success: true, cart });
    } catch (err) {
      return next(err);
    }
  }

  static async read(req, res, next) {
    try {
      const { user } = req;
      await user.populate('cart.product');

      const cart = user.get('cart');

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

      await user.populate('cart.product');
      user.cart.id(id).quantity = quantity;
      await user.save();

      const cart = user.get('cart');

      return res.status(200).json({ success: true, cart });
    } catch (err) {
      return next(err);
    }
  }

  static async delete(req, res, next) {
    try {
      const { user } = req;
      const { id } = req.params;

      await user.updateOne({ $pull: { cart: { _id: id } } }, { new: true });
      await user.populate('cart.product');

      const cart = user.get('cart');

      return res.status(200).json({ success: true, cart });
    } catch (err) {
      return next(err);
    }
  }
}

export default Cart;
