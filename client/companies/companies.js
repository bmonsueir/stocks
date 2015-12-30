var companySize;

Template.companies.helpers({
  name: function () {
    var companies = [];
    companies = Stocks.find().fetch();
    companySize = companies.length;
    return companies;
  }

});

Template.companies.events({
  'click .company0': function(event){
    Stocks.remove(this._id);
    location.reload();
  },
  'click .company1': function(event){
    Stocks.remove(this._id);
    location.reload();
  },
  'click .company2': function(event){
    Stocks.remove(this._id);
    location.reload();
  },
  'click .company3': function(event){
    Stocks.remove(this._id);
    location.reload();
  },
  'click .company4': function(event){
    Stocks.remove(this._id);
    location.reload();
  }
});
