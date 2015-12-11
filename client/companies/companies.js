Template.companies.helpers({
  name: function () {
    var companies = [];
    companies = Stocks.find().fetch();
    //console.log(companies);
    return companies;
  }

});

Template.companies.events({

  'click .company': function(event){
  Stocks.remove(this._id);
  }
});
