
  Template.body.helpers({
    stocks: function () {
      return Stocks.find();
    }
  });
