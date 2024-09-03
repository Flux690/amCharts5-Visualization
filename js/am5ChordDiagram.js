(function () {
  am5.ready(function () {
    // Create root element
    var root = am5.Root.new("chord-diagram");
    root._logo.dispose();

    // Set themes
    root.setThemes([am5themes_Animated.new(root)]);

    // Create series
    var series = root.container.children.push(
      am5flow.ChordDirected.new(root, {
        padAngle: 2,
        linkHeadRadius: null,
        sourceIdField: "from",
        targetIdField: "to",
        valueField: "value",
        nodeWidth: "20",
        startAngle: 90,
        centerX: am5.percent(0),
        centerY: am5.percent(0),
        radius: am5.percent(81),
      })
    );

    series.nodes.rectangles.template.setAll({
      stroke: am5.color(0xffffff),
      strokeWidth: 1.6,
    });

    series.nodes.labels.template.setAll({
      textType: "radial",
      centerX: 0,
      fontSize: 12,
      fontFamily: "Arial",
      // textAlign: "end",
      radius: 0,
    });

    var tooltip = am5.Tooltip.new(root, {
      getFillFromSprite: false,
    });

    tooltip.get("background").setAll({
      fillGradient: am5.LinearGradient.new(root, {
        stops: [{ color: am5.color(0xc96802) }, { color: am5.color(0x025875) }],
        rotation: 0,
      }),
      opacity: 0.7,
    });

    series.links.template.set("tooltip", tooltip);

    series.links.template.setAll({
      fillOpacity: 0.86,
      tooltipText:
        "[Bold]From[/]: {sourceId}\n[Bold]To[/]: {targetId}\n[Bold]Value[/]: ${value.formatNumber('#,###.')}[/]",
    });

    series.nodes.rectangles.template.adapters.add(
      "tooltipText",
      function (text, target) {
        var dataItem = target.dataItem;
        var outgoing = dataItem.get("sumOutgoing");
        var incoming = dataItem.get("sumIncoming");

        // Number formatting with thousands separators
        var numberFormat = new Intl.NumberFormat("en-US");

        // Build the tooltip text
        var tooltip = `[bold]{name}[/]`;
        if (outgoing > 0 || incoming > 0) {
          tooltip += `\n${
            outgoing > 0
              ? "Outgoing: " + "$" + numberFormat.format(outgoing)
              : ""
          }${outgoing > 0 && incoming > 0 ? "\n" : ""}${
            incoming > 0
              ? "Incoming: " + "$" + numberFormat.format(incoming)
              : ""
          }`;
        }
        return tooltip;
      }
    );

    series.links.template.set(
      "fillGradient",
      am5.LinearGradient.new(root, {
        stops: [{ color: am5.color(0xc96802) }, { color: am5.color(0x025875) }],
        rotation: 0,
      })
    );

    series.links.template.events.on("pointerover", function (event) {
      let hoveredLink = event.target;
      let hoveredUid = hoveredLink.dataItem.uid;

      // Iterate over all links
      series.dataItems.forEach(function (dataItem) {
        let link = dataItem.get("link");
        if (link) {
          if (link.dataItem.uid === hoveredUid) {
            // Keep the hovered link at full opacity
            link.set("fillOpacity", 0.86);
          } else {
            // Reduce opacity of all other links
            link.set("fillOpacity", 0.3);
          }
        }
      });
    });

    series.links.template.events.on("pointerout", function (event) {
      // Reset opacity of all links when mouse is moved out
      series.dataItems.forEach(function (dataItem) {
        let link = dataItem.get("link");
        if (link) {
          link.set("fillOpacity", 0.86);
        }
      });
    });

    // Set data
    series.nodes.data.setAll([
      { id: "Govt", fill: am5.color(0xc96802) },
      { id: "Debt", fill: am5.color(0xc96802) },
      { id: "Public Equity", fill: am5.color(0xc96802) },
      { id: "Private Equity", fill: am5.color(0xc96802) },
      { id: "Other", fill: am5.color(0x025875) },
      { id: "Digital energy management", fill: am5.color(0x025875) },
      { id: "Industrial decarbonization", fill: am5.color(0x025875) },
      { id: "Renewable electricity", fill: am5.color(0x025875) },
    ]);

    series.nodes.dataItems.forEach(function (dataItem) {
      dataItem.get("label").setAll({
        fill: dataItem.get("fill"),
      });
    });

    series.nodes.labels.template.setAll({
      maxWidth: 105,
      oversizedBehavior: "wrap",
    });

    // https://www.amcharts.com/docs/v5/charts/flow-charts/#Setting_data
    series.data.setAll([
      { from: "Private Equity", to: "Renewable electricity", value: 112152 },
      { from: "Private Equity", to: "Digital energy management", value: 31236 },
      { from: "Private Equity", to: "Industrial decarbonization", value: 27267 },
      { from: "Private Equity", to: "Other", value: 89961 },
      { from: "Public Equity", to: "Renewable electricity", value: 26039 },
      { from: "Public Equity", to: "Digital energy management", value: 8100 },
      { from: "Public Equity", to: "Industrial decarbonization", value: 5350 },
      { from: "Debt", to: "Renewable electricity", value: 18665 },
      { from: "Debt", to: "Digital energy management", value: 125 },
      { from: "Debt", to: "Industrial decarbonization", value: 7000 },
      { from: "Debt", to: "Other", value: 750 },
      { from: "Govt", to: "Renewable electricity", value: 4800 },
      { from: "Govt", to: "Industrial decarbonization", value: 450 },
    ]);

    // Make stuff animate on load
    series.appear(1000, 100);
  }); // end am5.ready()
})();
