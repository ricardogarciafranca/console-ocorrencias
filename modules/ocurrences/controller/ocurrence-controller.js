(function () {

    'use-strict'

    function OcurrenceController(ocurrenceService, $scope) {

        $scope.showItemsPage = '7';

        $scope.selectedPage = '1';

        $scope.getOcurrences = function (limit, page) {

            ocurrenceService.getOcurrence(limit, page).then(function (data) {

                $scope.ocurrences = data.ocurrences;

                $scope.pages = [];

                for(var p = 1; p <= data.numPages; p++){
                    $scope.pages.push(p);
                }

                console.log("Error: "+data.numPages);

            }, function (error) {
                console.log("Error: "+error);

            });
        };

        $scope.$watch('showItemsPage', function (newValue, oldValue) {
            $scope.getOcurrences(newValue, $scope.selectedPage);
        });

    }

    OcurrenceController.$inject = ['ocurrenceService', '$scope'];

    angular.module('app').controller('OcurrenceController', OcurrenceController);

})();
