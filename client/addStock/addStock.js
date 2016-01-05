
  Template.addStock.events({
    'click #addStock': function (event, template) {
      event.preventDefault();
      var stockEntry = $('[name=stockEntry]').val().toUpperCase();

        Meteor.call("findName", stockEntry, function(error, result){
          if(result !== null){
              Stocks.insert({
                name: result,
                symbol: stockEntry
                });
              }
          });
        }
  });
