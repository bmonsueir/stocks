Meteor.methods({
  fillGraph: function(start, end){
    var data = {};
    var dataToReturn = [];
    var symbols = [];
    var company = Stocks.find().fetch();
    for(var i in company){
      symbols.push(company[i].symbol);
    }
    if(symbols){
      for(var j = 0; j < symbols.length; j++){
        data = YahooFinance.historical({
          symbol: symbols[j],
          from: start,
          to: end
        });
        dataToReturn.push(data);
      }
    }
      return dataToReturn;
  },
  findName: function(symbol){
      var data = YahooFinance.snapshot({
        symbols: [symbol],
        fields: ['n']
      });
      return data[0].name;
  }
});
