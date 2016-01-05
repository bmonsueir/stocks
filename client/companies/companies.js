Template.companies.helpers({
  name: function () {
    var svg = d3.select("#graph");
    svg.select("*").remove();
    makeGraph();
    return Stocks.find().fetch();
    }
});

Template.companies.events({
  'click .company0': function(event){
    event.preventDefault();
    Stocks.remove(this._id);
  },
  'click .company1': function(event){
    event.preventDefault();
    Stocks.remove(this._id);
  },
  'click .company2': function(event){
    event.preventDefault();
    Stocks.remove(this._id);
  },
  'click .company3': function(event){
    event.preventDefault();
    Stocks.remove(this._id);
  },
  'click .company4': function(event){
    event.preventDefault();
    Stocks.remove(this._id);
  }
});
