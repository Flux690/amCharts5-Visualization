(function () {
  am5.ready(function () {
    // Prepare the data
    let rawData = [
      { Year: 2018, Month: 1, transac: 1899.336687772 },
      { Year: 2018, Month: 2, transac: 7765.5949934933 },
      { Year: 2018, Month: 3, transac: 3190.4325489092 },
      { Year: 2018, Month: 4, transac: 2514.4526176144 },
      { Year: 2018, Month: 5, transac: 6712.2651170206 },
      { Year: 2018, Month: 6, transac: 4357.476611661 },
      { Year: 2018, Month: 7, transac: 2699.7474047921 },
      { Year: 2018, Month: 8, transac: 1644.8277323595 },
      { Year: 2018, Month: 9, transac: 5614.5820397676 },
      { Year: 2018, Month: 10, transac: 7152.111408968 },
      { Year: 2018, Month: 11, transac: 4706.1745523194 },
      { Year: 2018, Month: 12, transac: 5008.4306318977 },
      { Year: 2019, Month: 1, transac: 2035.1273587216 },
      { Year: 2019, Month: 2, transac: 5030.9630363105 },
      { Year: 2019, Month: 3, transac: 3721.1034312126 },
      { Year: 2019, Month: 4, transac: 3969.5904371923 },
      { Year: 2019, Month: 5, transac: 1976.3756184401 },
      { Year: 2019, Month: 6, transac: 1944.4836914774 },
      { Year: 2019, Month: 7, transac: 1906.5351844046 },
      { Year: 2019, Month: 8, transac: 4784.7164604388 },
      { Year: 2019, Month: 9, transac: 1492.2271692102 },
      { Year: 2019, Month: 10, transac: 10939.1371048041 },
      { Year: 2019, Month: 11, transac: 14822.131086014 },
      { Year: 2019, Month: 12, transac: 8248.749212873 },
      { Year: 2020, Month: 1, transac: 3866.3123275158 },
      { Year: 2020, Month: 2, transac: 1711.2112519316 },
      { Year: 2020, Month: 3, transac: 2975.181325345 },
      { Year: 2020, Month: 4, transac: 2849.1706506767 },
      { Year: 2020, Month: 5, transac: 2473.5539794468 },
      { Year: 2020, Month: 6, transac: 1700.486047976 },
      { Year: 2020, Month: 7, transac: 8929.6159271534 },
      { Year: 2020, Month: 8, transac: 3063.9871701443 },
      { Year: 2020, Month: 9, transac: 3478.9967908755 },
      { Year: 2020, Month: 10, transac: 2174.3943025446 },
      { Year: 2020, Month: 11, transac: 6174.1402329924 },
      { Year: 2020, Month: 12, transac: 8711.0248249993 },
      { Year: 2021, Month: 1, transac: 5894.6127274774 },
      { Year: 2021, Month: 2, transac: 1885.8520731911 },
      { Year: 2021, Month: 3, transac: 6618.0891893623 },
      { Year: 2021, Month: 4, transac: 12121.8374549547 },
      { Year: 2021, Month: 5, transac: 2863.5696952006 },
      { Year: 2021, Month: 6, transac: 2446.3569443545 },
      { Year: 2021, Month: 7, transac: 3139.8227085143 },
      { Year: 2021, Month: 8, transac: 5168.4772921875 },
      { Year: 2021, Month: 9, transac: 2334.5553659682 },
      { Year: 2021, Month: 10, transac: 4636.3111282603 },
      { Year: 2021, Month: 11, transac: 6382.4011282116 },
      { Year: 2021, Month: 12, transac: 3995.3885950063 },
      { Year: 2022, Month: 1, transac: 4242.9768369101 },
      { Year: 2022, Month: 2, transac: 2365.5474052315 },
      { Year: 2022, Month: 3, transac: 3194.6384354847 },
      { Year: 2022, Month: 4, transac: 4175.7044676363 },
      { Year: 2022, Month: 5, transac: 5901.3091387218 },
      { Year: 2022, Month: 6, transac: 4384.1578350297 },
      { Year: 2022, Month: 7, transac: 2950.1906573578 },
      { Year: 2022, Month: 8, transac: 6259.0820944132 },
      { Year: 2022, Month: 9, transac: 3511.2173571455 },
      { Year: 2022, Month: 10, transac: 76479.6632669086 },
      { Year: 2022, Month: 11, transac: 3781.6153378205 },
      { Year: 2022, Month: 12, transac: 133922.7567093098 },
      { Year: 2023, Month: 1, transac: 28567.2355341061 },
      { Year: 2023, Month: 2, transac: 2510.5766308274 },
      { Year: 2023, Month: 3, transac: 30629.788487551 },
      { Year: 2023, Month: 4, transac: 1685.0705666149 },
      { Year: 2023, Month: 5, transac: 26349.9102548369 },
      { Year: 2023, Month: 6, transac: 5346.510929971 },
      { Year: 2023, Month: 7, transac: 58993.0 },
      { Year: 2023, Month: 8, transac: 23475.0 },
    ];

    let chartData = [];

    rawData.forEach((item) => {
      let date = new Date(item.Year, item.Month - 1, 1);
      let value = item["transac"];
      chartData.push({
        date: date.getTime(),
        value: value,
        year: item.year,
      });
    });

    // Create root element
    var root = am5.Root.new("radar-chart");
    root._logo.dispose();

    // Set themes
    root.setThemes([am5themes_Animated.new(root)]);

    // Create chart
    var chart = root.container.children.push(
      am5radar.RadarChart.new(root, {
        startAngle: 95,
        endAngle: 348,
        innerRadius: am5.percent(70),
        radius: am5.percent(135),
      })
    );

    // Create Y-axis (Value Axis)
    var yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        renderer: am5radar.AxisRendererRadial.new(root, {}),
        logarithmic: true, // Apply logarithmic scale
        visible: false,
      })
    );

    // Create X-axis (Date Axis)
    var xAxis = chart.xAxes.push(
      am5xy.DateAxis.new(root, {
        baseInterval: { timeUnit: "month", count: 1 },
        renderer: am5radar.AxisRendererCircular.new(root, {
          cellStartLocation: 0,
          cellEndLocation: 0.9,
          minGridDistance: 180, // Space between grid lines (helps control bar width)
        }),
      })
    );

    // Disable radial grid lines
    xAxis.get("renderer").grid.template.set("visible", false);
    yAxis.get("renderer").grid.template.set("visible", false);

    // Adjust label positioning if needed
    xAxis.get("renderer").labels.template.setAll({
      fontSize: 12,
      textAlign: "start",
      radius: -160,
    });

    // Create series
    var series = chart.series.push(
      am5radar.RadarColumnSeries.new(root, {
        name: "Transaction Value",
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "value",
        valueXField: "date",
        tooltip: am5.Tooltip.new(root, {}),
      })
    );

    // Set series data
    series.columns.template.setAll({
      width: am5.percent(95),
      integersOnly: true,
      tooltipText:
        "{name}, {valueX.formatDate('MMM yyyy')} : ${valueY.formatNumber('#,###.')}[/]",
    });

    const yearColors = {
      2018: am5.color(0xb7d5dd), // Lightest Blue
      2019: am5.color(0x6daabb), // Light Blue
      2020: am5.color(0x27829b), // Medium Blue
      2021: am5.color(0x055a73), // Dark Blue
      2022: am5.color(0x003647), // Darkest Blue
      2023: am5.color(0xf3a449), // Orange
    };

    // Apply custom colors based on the year using valueX
    series.columns.template.adapters.add("fill", function (fill, target) {
      if (target.dataItem) {
        let date = new Date(target.dataItem.get("valueX")); // Get the date from valueX
        let year = date.getFullYear(); // Extract the year
        return yearColors[year] || fill; // Return the corresponding color or default fill
      }
      return fill;
    });

    series.columns.template.adapters.add("stroke", function (stroke, target) {
      if (target.dataItem) {
        let date = new Date(target.dataItem.get("valueX")); // Get the date from valueX
        let year = date.getFullYear(); // Extract the year
        return yearColors[year] || stroke; // Return the corresponding color or default fill
      }
      return stroke;
    });

    series.data.setAll(chartData);
    series.appear(1000, 100)
  });
})();
