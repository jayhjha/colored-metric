import { VisSchemasProvider } from 'ui/vis/schemas';
import { TemplateVisTypeProvider } from 'ui/template_vis_type/template_vis_type';
import { VisTypesRegistryProvider } from 'ui/registry/vis_types';

import 'plugins/colored-metric/colored-metric.css';
import 'plugins/colored-metric/colored-metric-controller';

VisTypesRegistryProvider.register(function ColoredMetricProvider(Private) {
  var TemplateVisType = Private(TemplateVisTypeProvider);
  var Schemas = Private(VisSchemasProvider);

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
    hierarchicalData: function (vis) {
      return Boolean(true);
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
});