(function () {

    'use-strict'

    function OcurrenceController(ocurrenceService, $scope) {

        $scope.showItemsPage = '10';

        $scope.selectedPage = '1';

        $scope.getOcurrences = function (page) {

            $scope.selectedPage = page;

            ocurrenceService.getOcurrence($scope.showItemsPage, page).then(function (data) {

                $scope.ocurrences = data.ocurrences;

                $scope.total = data.total;

                $scope.pages = [];

                for (var p = 1; p <= data.numPages; p++) {
                    $scope.pages.push(p);
                }

            }, function (error) {
                console.log("Error: " + error);

            });
        };

        $scope.$watch('showItemsPage', function (newValue, oldValue) {
            $scope.getOcurrences(1);
        });


        $scope.getOcurrencesNext = function () {

            var next = new Number($scope.selectedPage) + 1;

            $scope.selectedPage = next <= $scope.pages.length ? next : $scope.pages.length;

            $scope.getOcurrences($scope.selectedPage);
        };

        $scope.getOcurrencesNextAll = function () {
            $scope.getOcurrences($scope.pages.length);
        };

        $scope.getOcurrencesBeforeAll = function () {
            $scope.getOcurrences(1);
        };

        $scope.getOcurrencesBefore = function () {

            var before = new Number($scope.selectedPage) - 1;

            $scope.selectedPage = before == 0 ? 1 : before;

            $scope.getOcurrences($scope.selectedPage);
        };

    }

    OcurrenceController.$inject = ['ocurrenceService', '$scope'];

    angular.module('app').controller('OcurrenceController', OcurrenceController);

})();
