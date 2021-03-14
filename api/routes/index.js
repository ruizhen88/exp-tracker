module.exports = function (app, Product) {
  // GET ALL PRODUCTS
  app.get("/products", (req, res) => {
    Product.find((err, products) => {
      if (err) return res.status(500).send({ error: err });
      res.json(products);
    });
  });

  // GET SINGLE PRODUCT
  app.get("/products/:product_id", function (req, res) {
    Product.findOne({ _id: req.params.product_id }, function (err, product) {
      if (err) return res.status(500).json({ error: err });
      if (!product) return res.status(404).json({ error: "product not found" });
      res.json(product);
    });
  });

  // CREATE PRODUCT
  app.post("/products", function (req, res) {
    // console.log(req.body);
    const product = new Product({
      name: req.body.name,
      img_url: req.body.img_url,
      expiration_date:
        req.body.expiration_date && new Date(req.body.expiration_date),
      hidden: false,
    });

    product.save((err) => {
      if (err) {
        console.error(err);
        res.json({ err: "error creating new product" });
        return;
      }

      res.json(product);
    });
  });

  // UPDATE PRODUCT
  app.put("/products/:product_id", function (req, res) {
    Product.findById(req.params.product_id, function (err, product) {
      if (err) return res.status(500).json({ error: "database failure" });
      if (!product) return res.status(404).json({ error: "product not found" });

      if (req.body.name) product.name = req.body.name;
      if (req.body.img_url) product.img_url = req.body.img_url;
      if (req.body.expiration_date)
        product.expiration_date = req.body.expiration_date;
      if (req.body.hidden) product.hidden = req.body.hidden;

      product.save(function (err) {
        if (err) res.status(500).json({ error: "failed to update" });
        res.json({ message: "product updated" });
      });
    });
  });

  // DELETE PRODUCT
  app.delete("/products/:product_id", function (req, res) {
    Product.deleteOne({ _id: req.params.product_id }, function (err, output) {
      if (err) return res.status(500).json({ error: "database failure" });
      res.status(204).end();
    });
  });
};
