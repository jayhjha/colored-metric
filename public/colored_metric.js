import { CATEGORY } from 'ui/vis/vis_category';
import { VisFactoryProvider } from 'ui/vis/vis_factory';
import { VisTypesRegistryProvider } from 'ui/registry/vis_types';
import { VisSchemasProvider } from 'ui/vis/editors/default/schemas';

import './colored_metric.less';
import optionsTemplate from './colored_metric_editor.html';
import { ColoredMetricController } from './colored_metric_controller';


const ColoredMetricVisualization = (Private) => {
  const VisFactory = Private(VisFactoryProvider);
  const Schemas = Private(VisSchemasProvider);

  return VisFactory.createBaseVisualization({
    name: 'coloredMetric',
    title: 'ColoredMetric',
    icon: 'fa-square',
    category: CATEGORY.OTHER,
    description: 'Change metric color based on range of values',
    visualization: ColoredMetricController,
    visConfig: {
      defaults: {
        metricTitle: null,
        fontSize: 50,
        firstThresholdValue: 5,
        secThresholdValue: 20,
        firstThresholdColor: 'green',
        betweenTwoThresholdsColor: 'orange',
        secThresholdColor: 'red'
      },
    },
    editorConfig: {
      optionsTemplate: optionsTemplate,
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
    },
  });
}

VisTypesRegistryProvider.register(ColoredMetricVisualization);
