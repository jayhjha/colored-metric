export default function (kibana) {
    return new kibana.Plugin({
      uiExports: {
        visTypes: [
          'plugins/colored_metric/colored_metric'
        ]
      },
    });
  }