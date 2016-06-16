(function () {

    'use-strict'

    function ocurrenceService($http, $q) {

        function applyFilter(ocurrences, limit, page, defer) {

            var ocurrencesFiltered = [];

            var round = Math.round(ocurrences.length / limit);

            var numPages = (round == 0 ? 1 : round);

            var inicio = (page == 1 ? 0 : (limit * page) - limit);

            var fim = (limit * page);

            var contador = 0;

            for (var x = 0; x < ocurrences.length; x++) {
                if(ocurrences[x] != undefined){

                   if(contador >= inicio && contador < fim){
                       ocurrencesFiltered.push(ocurrences[x]);
                   }

                    contador = contador + 1;
                }

            }

            var result = {
                "page": page,
                "limit": limit,
                "totalPage": ocurrencesFiltered.length,
                "total": ocurrences.length,
                "numPages": numPages,
                "ocurrences": ocurrencesFiltered
            };


            defer.resolve(result);

        }


        function getOcurrence(limit, page) {

            var defer = $q.defer();

            $http.get('commons/json/cap.json').then(function (data) {

                var ocurrences = [];

                angular.forEach(data.data, function (value, key) {

                    this.push(value);

                    if (data.data.length === (key + 1)) {

                        applyFilter(ocurrences, limit, page, defer);


                    }

                }, ocurrences);


            }, function (error) {
                //TODO ERROR

            });


            return defer.promise;
        }

        return {
            getOcurrence: getOcurrence
        }

    }

    ocurrenceService.$inject = ['$http', '$q'];

    angular.module('app').service('ocurrenceService', ocurrenceService);

})();
