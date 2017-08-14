define(function(require) {

    require('plugins/colored-metric/colored-metric.css')
    require('plugins/colored-metric/colored-metric-controller')
    require('ui/registry/vis_types').register(ColoredMetricProvider)

    function ColoredMetricProvider(Private) {
        var TemplateVisType = Private(require('ui/template_vis_type/template_vis_type'));
        var Schemas = Private(require('ui/vis/schemas'));

        return new TemplateVisType({
            name: 'coloredMetric',
            title: 'ColoredMetric',
            icon: 'fa-square',
            description: 'Add colored metric to your dashboard',
            template: require('plugins/colored-metric/colored-metric.html'),
            params: {
                defaults: {
                    metricTitle: null,
                    fontSize: 60,
                    firstThresholdValue: 5,
                    secThresholdValue: 20,
                    firstThresholdColor: 'green',
                    betweenTwoThresholdsColor: 'orange',
                    secThresholdColor: 'red'
                },
                editor: require('plugins/colored-metric/colored-metric-editor.html')
            },
            schemas: new Schemas([
                {
                  group: 'metrics',
                  name: 'metric',
                  title: 'Metric',
                  min: 1,
                  max: 1,
                  defaults: [
                    { type: 'count', schema: 'metric' }
                  ]
                }
            ])
        });
    }

    return ColoredMetricProvider
});
