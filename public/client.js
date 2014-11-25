angular.module('geojsonApp',[])
  .controller('MainCtrl', ['$http', function($http) {
    
    var self = this;
    
    self.items = [];
    self.queryItems = [];
    self.item = {};
    self.query = {};
    self.currentTab = 'home';
    
    var resetItemModel = function() {
      self.item={};
      self.item.location={};
      self.item.location.coordinates=[];
    };

    resetItemModel();
    
    var fetchItems = function() {
      return $http.get('/api/item')
      .then(
        function(response){
          self.items = response.data;
        }, 
        function(errResponse) {
          console.error('Error while fetching items');
        }
      );
    };
    
    fetchItems();
    
    self.add = function() {
      self.item.location.type = "Point";
      $http.post('/api/item', self.item)
        .then(fetchItems)
        .then( function(response) {
          resetItemModel();
          self.currentTab = 'items';
        });
    };
    
    self.inquire = function() {
      console.log(self.query);
      $http.post('/api/query', self.query)
        .then( function(response) {
          self.queryItems = response.data;
          self.currentTab = 'query';
        });
    };
    
    self.delete = function(id) {
      $http.delete('/api/item/' + id)
        .then(fetchItems)
        .then(
          function(response) {
            self.currentTab = 'items';
          },
          function(error) {
            console.log("Error deleting item");
          });
    };

  }]);
