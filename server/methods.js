Meteor.methods({
  fillGraph: function(company){
    var end = new Date();
    var start = new Date(end);
    start.setDate(start.getDate() - 730);
    return YahooFinance.historical({
      symbol: company,
      from: start,
      to: end
    });
  },
  findName: function(symbol){
      var data = YahooFinance.snapshot({
        symbols: [symbol],
        fields: ['n']
      });
      return data[0].name;
  },
  findSymbols: function(){
     var symbols = [];
     var company = Stocks.find().fetch();
     for(var i in company){
       symbols.push(company[i].symbol);
     }
     return symbols
  }

});
