define(function (require) {
    var module = require('ui/modules').get('kibana/colored-metric', ['kibana']);

    module.controller('ColoredMetricController', function($scope, Private) {
        var tabifyAggResponse = Private(require('ui/agg_response/tabify/tabify'));
        var metrics = $scope.metrics = [];
        var title = null;

        $scope.processTableGroups = function (tableGroups) {
            tableGroups.tables.forEach(function (table) {
            table.columns.forEach(function (column, i) {
                var fieldFormatter = table.aggConfig(column).fieldFormatter();
                    metrics[0] = {label: column.title, value: table.rows[0][i]};	
                });
            });
        };

        $scope.$watch('esResponse', function (resp) {
            if (resp) {
                metrics.length = 0;
                $scope.processTableGroups(tabifyAggResponse($scope.vis, resp));
                title = ( !$scope.vis.params.metricTitle ) ? $scope.metrics[0].label : $scope.vis.params.metricTitle;
                value = $scope.metrics[0].value
                $scope.title = title;
                $scope.value = value.toFixed(2)
            }
        });

        $scope.selectColor = function() {
            if ($scope.value <= $scope.vis.params.firstThresholdValue) {
                return $scope.vis.params.firstThresholdColor;
            } else if ($scope.value > $scope.vis.params.firstThresholdValue && $scope.value < $scope.vis.params.secThresholdValue) {
                return $scope.vis.params.betweenTwoThresholdsColor;
            } else if ($scope.value >= $scope.vis.params.secThresholdValue) {
                return $scope.vis.params.secThresholdColor;
            }
        }
    });
});
