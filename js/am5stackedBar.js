(function () {
  am5.ready(function () {
    // Create root and chart instance
    var root = am5.Root.new("stacked-bar");
    root._logo.dispose();

    root.setThemes([am5themes_Animated.new(root)]);
    root.container.set("fontFamily", "Poppins");

    // Create chart
    var chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        // fontFamily: "sans-serif",
        layout: root.verticalLayout,
        paddingLeft: -120,
      })
    );

    var data = [
      {
        base: "Region",
        APAC: 50794.5949030149,
        Africa: 4643.5275188301,
        Europe: 98112.0540591493,
        "Latin America And Caribbean": 6295.597390235,
        MENA: 3962.0,
        "United States And Canada": 237703.6532982757,
      },
    ];

    // Create axes
    var yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        min: 0,
        numberFormat: "#,###.",
        renderer: am5xy.AxisRendererY.new(root, {}),
        visible: false,
      })
    );

    var xAxis = chart.xAxes.push(
      am5xy.CategoryAxis.new(root, {
        renderer: am5xy.AxisRendererX.new(root, {}),
        categoryField: "base",
      })
    );

    xAxis.get("renderer").grid.template.set("visible", false);
    yAxis.get("renderer").grid.template.set("visible", false);
    xAxis.get("renderer").labels.template.set("fontSize", 12);
    xAxis.get("renderer").labels.template.set("fontFamily", "Arial");

    xAxis.data.setAll(data);

    function createSeries(name, field, color) {
      var series = chart.series.push(
        am5xy.ColumnSeries.new(root, {
          name: name,
          xAxis: xAxis,
          yAxis: yAxis,
          valueYField: field,
          categoryXField: "base",
          stacked: true,
          tooltip: am5.Tooltip.new(root, {
            labelText:
              "[fontSize: 13px fontFamily:Arial]{name}: ${valueY.formatNumber('#,###.')}",
            pointerOrientation: "left",
          }),
        })
      );

      series.data.setAll(data);
      series.columns.template.setAll({
        width: 30,
        fill: am5.color(color),
        stroke: am5.color(color),
        tooltipText: "{name}: ${valueY.formatNumber('#,###.')}",
      });
    }
    createSeries("US and Canada", "United States And Canada", "#015A72");
    createSeries("Europe", "Europe", "#24839A");
    createSeries("APAC", "APAC", "#6EACBB");
    createSeries("Africa", "Africa", "#B3D7DD");
    createSeries("MENA", "MENA", "#FBC891");
    createSeries(
      "LATAM and Caribbean",
      "Latin America And Caribbean",
      "#F3A449"
    );
  });
})();
