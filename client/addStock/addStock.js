
  Template.addStock.events({
    'click #addStock': function (event, template) {
      event.preventDefault();
      var stockEntry = $('[name=stockEntry]').val().toUpperCase();

      //var stockEntry = event.target.stockEntry.value;
    Meteor.call("findName", stockEntry, function(error, result){
      if(result !== null){
       Stocks.insert({
            name: result,
            symbol: stockEntry
          });
        }
        location.reload();
      //  $('[name=stockEntry]').val().clear();
    });

  

  }
  });
