class ColoredMetricController {
    constructor(el, vis) {
      this.el = el;
      this.vis = vis;
      this.container = document.createElement('div');
      this.container.className = 'coloredMetric';
      this.el.appendChild(this.container);
      this.metricValue = null;
    }

    getColor() {
      if (this.metricValue <= this.vis.params.firstThresholdValue) {
        return this.vis.params.firstThresholdColor;
      } else if (this.metricValue > this.vis.params.firstThresholdValue && this.metricValue < this.vis.params.secThresholdValue) {
        return this.vis.params.betweenTwoThresholdsColor;
      } else if (this.metricValue >= this.vis.params.secThresholdValue) {
        return this.vis.params.secThresholdColor;
      }
    }
  
    render(visData, status) {
      this.container.innerHTML = '';
      const table = visData.tables[0];
      const metrics = [];
      let bucketAgg;
  
      table.columns.forEach((column, i) => {
        table.rows.forEach(row => {
          const value = row[i];
          metrics.push({
            title: bucketAgg ? `${row[0]} ${column.title}` : column.title,
            value: row[i],
            formattedValue: column.aggConfig ? column.aggConfig.fieldFormatter('text')(value) : value,
            bucketValue: bucketAgg ? row[0] : null,
            aggConfig: column.aggConfig
          });
        });
      });
  
      metrics.forEach(metric => {
        const metricDiv = document.createElement(`div`);
        metricDiv.className = `coloredMetric`;
        metricDiv.innerHTML = `${metric.formattedValue}`;
        metricDiv.setAttribute('style', `font-size: ${this.vis.params.fontSize}pt; color: ${this.getColor()}`);
  
        this.container.appendChild(metricDiv);
        this.metricValue = metric.formattedValue;
      });
      
      return new Promise(resolve => {
        resolve('Done rendering');
      });
    }
  
    destroy() {
      this.el.innerHTML = '';
      console.log('Destroying');
    }
  };

  export { ColoredMetricController };
  