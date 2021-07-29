// Vc -> Maximum Value of the product for consumers (Customers willingingness to pay)
var Vc = 1;
// Vd -> Maximum Value of the product for developers (Developers willingingness to pay)
var Vd = 1;
// Qc -> Consumer Maximum Market Size (How many consumers are in the market)
var Qc = 1;
// Qd -> Developer Maximum Market Size (How many developers are in the market)
var Qd = 1;
// pc-> Consumer Price
var pc = 1;
// pd-> Developer Price
var pd = 0.5;
// surgeMarkup -> Surge Pricing Markup (Affects Vc)
var surgeMarkup = 0;
// crimeMarkup -> Crime Pricing Markup (Affects Vc)
var crimeMarkup = 0;
// ecd -> 0.125 constant value (Effect of purchases in the Consumer market on the Developer market)
var ecd = 0.125;
// edc -> 0.875 constant value (Effect of purchases in the Developer market on the Consumer market)
var edc = 0.875;

// Optimal Consumer Price
var opc =
  (Vc * Vd * (Qd * ((ecd * edc - 2) * Qc - edc * Qd) * Vc + ecd * Qc * (ecd * Qc + Qd) * Vd)) /
  (edc * edc * Qd * Qd * Vc * Vc + 2 * (ecd * edc - 2) * Qc * Qd * Vc * Vd + ecd * ecd * Qc * Qc * Vd * Vd);

// Optimal Developer Price
var opd =
  (Vc * Vd * (edc * Qd * (Qc + edc * Qd) * Vc + Qc * ((ecd * edc - 2) * Qd - ecd * Qc) * Vd)) /
  (edc * edc * Qd * Qd * Vc * Vc + 2 * (ecd * edc - 2) * Qc * Qd * Vc * Vd + ecd * ecd * Qc * Qc * Vd * Vd);

var animationShown = "../images/60passengers5vehicles.gif";
document.getElementById("img").src = animationShown;

var expenses = 0;

// Consumer Price from text box input
var consumerPrice = document.getElementById("consumerPrice");
// Consumer Price from slider input
var consumerPriceSlider = document.getElementById("consumerPriceSlider");

// Developer Price from slider input
var developerPriceSlider = document.getElementById("developerPriceSlider");
// Developer Price from text box input
var developerPrice = document.getElementById("developerPrice");

// Consumer Surge Pricing markup from text box input
var surgePricing = document.getElementById("surgePricing");
// Consumer Surge Pricing markup from slider input
var surgePricingSlider = document.getElementById("surgePricingSlider");

// Consumer Crime Pricing markup from text box input
var crimePricing = document.getElementById("crimePricing");
// Consumer Crime Pricing markup from slider input
var crimePricingSlider = document.getElementById("crimePricingSlider");

// Consumer Star Pricing markup from text box input
var riderStars = document.getElementById("riderStars");
// Consumer Star Pricing markup from slider input
var riderStarsSlider = document.getElementById("riderStarsSlider");

// Developer Star Pricing markup from text box input
var driverStars = document.getElementById("driverStars");
// Developer Star Pricing markup from slider input
var driverStarsSlider = document.getElementById("driverStarsSlider");

// Consumer Low Battery Pricing markup from text box input
var lowBattery = document.getElementById("lowBattery");
// Consumer Low Battery Pricing markup from slider input
var lowBatterySlider = document.getElementById("lowBatterySlider");

// Minimum Rider Rating from text box input
var riderRating = document.getElementById("riderRating");
// Minimum Rider Rating from sldier input
var riderRatingSlider = document.getElementById("riderRatingSlider");

// Minimum Driver Rating from text box input
var driverRating = document.getElementById("driverRating");
// Minimum Driver Rating from sldier input
var drivingRatingSlider = document.getElementById("driverRatingSlider");

// Rider Redress checkbox input
var riderRedress = document.getElementById("riderRedress");
// Driver Redress checkbox input
var driverRedress = document.getElementById("driverRedress");

// Expense rider pays for diver directed ads from text box input
var driverAds = document.getElementById("driverAds");
// Expense rider pays for diver directed ads from slider input
var driverAdsSlider = document.getElementById("driverAdsSlider");

// Expense driver pays for rider directed ads from text box input
var riderAds = document.getElementById("riderAds");
// Expense driver pays for rider directed ads from slider input
var riderAdsSlider = document.getElementById("riderAdsSlider");

// Total profit made from our system
var totalProfit = document.getElementById("profit");
// Chart from canvas node consumerChart
var ctx1 = document.getElementById("consumerChart").getContext("2d");
// Chart from canvas node developerChart
var ctx2 = document.getElementById("developerChart").getContext("2d");
// Chart from canvas node profitChart
var ctx3 = document.getElementById("profitChart").getContext("2d");

var chart1 = new Chart(ctx1, {
  // The type of chart we want to create
  type: "scatter",

  // The data for our dataset
  data: {
    datasets: [
      {
        // Consumer Surplus
        // From the Max Value to Max Market Size
        label: "Consumer Surplus",
        fill: false,
        showLine: true,
        backgroundColor: "rgba(255, 192, 99, 0.5)", // orange
        lineTension: 0,
        pointHoverRadius: 3,
        data: [
          {
            x: 0,
            y: 1,
          },
          {
            x: 1,
            y: 0,
          },
        ],
      },
      {
        // Profit
        // Selected Price * Calculated Quantity from plength(x, y, p)
        label: "Rider Profit = Riders * Fees = (" + ")",
        fill: true,
        backgroundColor: "rgba(88, 214, 141, 0.5)", // light green
        pointHoverRadius: 3,
        data: [
          {
            x: 0,
            y: 1,
          },
          {
            x: 0,
            y: 1,
          },
        ],
      },
      {
        // Dead Weight Loss
        // Starts at the end of the quantity and goes to the Max Market Size (Q)
        label: "DWL",
        pointHoverRadius: 3,
        fill: false,
        showLine: true,
        // red
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        lineTension: 0,
        data: [
          {
            x: 0,
            y: 1,
          },
          {
            x: 1,
            y: 0,
          },
        ],
      },
    ],
  },

  // Configuration options go here
  options: {
    plugins: {
      legend: {
        labels: {
          filter: function (item, chart) {
            return !item.text.includes("Consumer Surplus") && !item.text.includes("DWL");
          },
        },
      },
    },
    responsive: true,
    scales: {
      x: {
        suggestedMax: 3,
        ticks: {
          fontSize: 11,
          suggestedMax: 2.3,
          min: 0,
        },
        title: {
          display: true,
          text: xAxisChart1,
        },
      },
      y: {
        suggestedMax: 3,
        ticks: {
          fontSize: 11,
          suggestedMax: 2.3,
        },
        title: {
          display: true,
          text: yAxisChart1,
        },
      },
    },
  },
});

var chart2 = new Chart(ctx2, {
  // The type of chart we want to create
  type: "scatter",

  // The data for our dataset
  data: {
    datasets: [
      {
        // Consumer Surplus
        // From the Max Value to Max Market Size
        label: "Consumer Surplus",
        fill: false,
        showLine: true,
        pointHoverRadius: 3,
        // orange
        backgroundColor: "rgba(255, 192, 99, 0.5)",
        lineTension: 0,
        data: [
          {
            x: 0,
            y: 1,
          },
          {
            x: 1,
            y: 0,
          },
        ],
      },
      {
        // Profit
        // Selected Price * Calculated Quantity from plength(x, y, p)
        label: "Profit(" + ")",
        backgroundColor: "rgba(84, 153, 199, 0.5)", // light blue
        fill: true,
        data: [
          {
            x: 0,
            y: 1,
          },
          {
            x: 0,
            y: 1,
          },
        ],
      },
      {
        // Dead Weight Loss
        // Starts at the end of the quantity and goes to the Max Market Size (Q)
        label: "DWL",
        pointHoverRadius: 3,
        showLine: true,
        fill: false,
        // red
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        lineTension: 0,
        data: [
          {
            x: 0,
            y: 1,
          },
          {
            x: 1,
            y: 0,
          },
        ],
      },
    ],
  },

  // Configuration options go here
  options: {
    plugins: {
      legend: {
        labels: {
          filter: function (item, chart) {
            return !item.text.includes("Consumer Surplus") && !item.text.includes("DWL");
          },
        },
      },
    },
    responsive: true,
    scales: {
      x: {
        suggestedMax: 3,
        type: "linear",
        ticks: {
          fontSize: 11,
          suggestedMax: 2.3,
          min: 0,
        },
        title: {
          display: true,
          text: xAxisChart2,
        },
      },
      y: {
        suggestedMax: 3,
        type: "linear",
        ticks: {
          fontSize: 11,
          suggestedMax: 2.3,
        },
        title: {
          display: true,
          text: yAxisChart2,
        },
      },
    },
  },
});

var chart3 = new Chart(ctx3, {
  // The type of chart being cretated
  type: "bar",
  // The data for our dataset
  data: {
    datasets: [
      {
        label: "Rider Profit",
        //barThickness: 40,
        borderColor: "rgba(175, 122, 197, 0.5)",
        backgroundColor: "rgba(175, 122, 197, 0.5)", // purple
        data: [],
        stack: "Stack 0",
      },
      {
        label: "Driver Profit",
        //barThickness: 40,
        borderColor: "rgba(84, 153, 199, 0.5)",
        backgroundColor: "rgba(84, 153, 199, 0.5)", // light blue
        data: [],
        stack: "Stack 0",
      },
      {
        label: "Rider Satisfaction",
        borderColor: "rgba(241, 196, 15, 0.5)",
        backgroundColor: "rgba(241, 196, 15, 0.5)", // yellow
        data: [],
        stack: "Stack 1",
      },
      {
        label: "Driver Satisfaction",
        borderColor: "rgba(230, 126, 34, 0.5)",
        backgroundColor: "rgba(230, 126, 34, 0.5)", // orange
        data: [],
        stack: "Stack 1",
      },
    ],
  },
  // Configuration options go here
  options: {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Analytics",
      },
    },
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
        title: {
          display: true,
        },
      },
    },
  },
});

// Update the values of the chart
// Initial consumer price is set to 0.2 (pc = 0.2)
// Initial developer price is set to 0.2 (pd = 0.2)
// Initial admin controls are all set to 0
calcUpdate(Qc, Qd, Vc, Vd, expenses, 0.2, 0.2, ecd, edc, 0, 0, 0, 0, 0, 0, 0, 0, 0);

// Add the first Profits (consumerProfit = 0.33684, developerProfit = 0.20211)
addData(chart3, "", 0.33684, 0.20211, 1.48439, 2.4739);

// Function to update  the values of the chart
// Qc -> Consumer Maximum Market Size (How many consumers are in the market)
// Qd -> Developer Maximum Market Size (How many developers are in the market)
// Vc -> Maximum Value of the product for consumers (Customers willingingness to pay)
// Vd -> Maximum Value of the product for developers (Developers willingingness to pay)
// pc-> Consumer Price
// pd-> Developer Price
// ecd -> 0.125 constant value (Effect of purchases in the Consumer market on the Developer market)
// edc -> 0.875 constant value (Effect of purchases in the Developer market on the Consumer market)
// left -> boolean value reprsents which price has been adjusted (true -> consumer price was adjusted/false -> dev price was adjusted)
function calcUpdate(
  Qc,
  Qd,
  Vc,
  Vd,
  expenses,
  pc,
  pd,
  ecd,
  edc,
  surgeMarkup,
  crimeMarkup,
  riderStarMarkup,
  driverStarMarkup,
  lowBatteryMarkup,
  banRidersRule,
  banDriversRule,
  driverAdExpense,
  riderAdExpense,
  left
) {
  // Keep within Range 0-2
  // Consumer Price
  if (pc > 2) pc = 2;
  if (pc < 0) pc = 0;

  // Keep within Range 0-2
  // Developer Price
  if (pd > 2) pd = 2;
  if (pd < 0) pd = 0;

  // Update values from the consumer price input (either sliders or text box)
  consumerPriceSlider.value = pc;
  consumerPrice.value = pc;

  // Update values from the developer price input (either sliders or text box)
  developerPriceSlider.value = pd;
  developerPrice.value = pd;

  // Update values from the Surge Pricing input (either sliders or text box)
  surgePricingSlider.value = surgeMarkup;
  surgePricing.value = surgeMarkup;

  // Update values from the Crime Pricing input (either sliders or text box)
  crimePricingSlider.value = crimeMarkup;
  crimePricing.value = crimeMarkup;

  // Update values from the Rider Stars input (either sliders or text box)
  riderStarsSlider.value = riderStarMarkup;
  riderStars.value = riderStarMarkup;

  // Update values from the Rider Stars input (either sliders or text box)
  driverStarsSlider.value = driverStarMarkup;
  driverStars.value = driverStarMarkup;

  // Update values from the Low Battery input (either sliders or text box)
  lowBatterySlider.value = lowBatteryMarkup;
  lowBattery.value = lowBatteryMarkup;

  // Update values from the Ban Riders input (either sliders or text box)
  riderRatingSlider.value = banRidersRule;
  riderRating.value = banRidersRule;

  // Update values from the Ban Drivers input (either sliders or text box)
  driverRatingSlider.value = banDriversRule;
  driverRating.value = banDriversRule;

  // Update values from the Driver-Directed Ads input (either sliders or text box)
  driverAdsSlider.value = driverAdExpense;
  driverAds.value = driverAdExpense;

  // Update values from the Rider-Directed Ads input (either sliders or text box)
  riderAdsSlider.value = riderAdExpense;
  riderAds.value = riderAdExpense;

  // Surge Pricing increases both Vc and Vd
  // Low Battery Markups increase Vc
  Vc = 1 * (1 + parseFloat(surgePricing.value)) + parseFloat(crimePricing.value) + parseFloat(driverStars.value) + parseFloat(lowBattery.value);
  Vd = 1 * (1 + parseFloat(surgePricing.value)) + parseFloat(crimePricing.value) + parseFloat(riderStars.value);

  // Rider-Directed Ads increase Qc
  Qc = 1 + parseFloat(riderAds.value) - 0.1 * parseFloat(riderRating.value);
  console.log("Qc is " + Qc);

  // Driver-Directed Ads increase Qd
  Qd = 1 + parseFloat(driverAds.value) - 0.1 * parseFloat(driverRating.value);
  console.log("Qd is " + Qd);

  ecd = 0.125 + 0.1 * parseFloat(riderRating.value);

  edc = 0.875 + 0.1 * parseFloat(driverRating.value);

  expenses += parseFloat(riderAds.value) + parseFloat(driverAds.value);

  // Profit Size Length for consumers represents Quantity
  // Similar to the plength() function in the single sided market simulation
  // qc represents the x-value of the profit for consumers (the quantity)
  let qc = (edc * Qd * Vc * (pd - Vd) + Qc * (pc - Vc) * Vd) / ((ecd * edc - 1) * Vc * Vd);
  console.log("qc is " + qc);

  // Profit Size Length for developers represents Quantity
  // Similar to the plenght() function in the single sided market simulation
  // qd represents the x-value of the profit for developers (the quantity)
  let qd = (pd * Qd * Vc + (ecd * Qc * (pc - Vc) - Qd * Vc) * Vd) / ((ecd * edc - 1) * Vc * Vd);
  console.log("qd is " + qd);

  if (qc <= 0.67) {
    if (qd <= 0.66) {
      animationShown = "../images/10passengers1vehicles.gif";
    } else if (qd <= 1.33) {
      animationShown = "../images/10passengers5vehicles.gif";
    } else {
      animationShown = "../images/10passengers10vehicles.gif";
    }
  } else if (qc <= 1.33) {
    if (qd <= 0.66) {
      animationShown = "../images/40passengers1vehicles.gif";
    } else if (qd <= 1.33) {
      animationShown = "../images/40passengers5vehicles.gif";
    } else {
      animationShown = "../images/40passengers10vehicles.gif";
    }
  } else if (qc > 1.33) {
    if (qd <= 0.66) {
      animationShown = "../images/60passengers1vehicles.gif";
    } else if (qd <= 1.33) {
      animationShown = "../images/60passengers5vehicles.gif";
    } else {
      animationShown = "../images/60passengers10vehicles.gif";
    }
  }

  // If the quantity of consumers in the market is ever 0
  if (qc < 0) {
    // Don't let it become negative
    qc = 0;
    // Don't let consumer price go over 1.875
    if (pc > 1 + edc) {
      pc = 1 + edc;
    }

    //pd = (1.125 - pc)/0.125; <-- not my comment, not sure what it represents

    // If left is true, then consumer price is equal to 1.875 - (developer price * 1.875)
    // if not, then the developer price is equal to (2.875 - consumer price)/ 1.875
    // When consumer price is adjusted, the developer price changes
    // When developer price is adjusted, the consumer price changes
    if (left) {
      pc = 1 + edc - pd * edc;
    } else {
      pd = (edc + 1 - pc) / edc;
    }

    // Update the profit lengths (quantities) for both consumers (qc) and developers (qd) with updated values
    qc = (edc * Qd * Vc * (pd - Vd) + Qc * (pc - Vc) * Vd) / ((ecd * edc - 1) * Vc * Vd);
    qd = (pd * Qd * Vc + (ecd * Qc * (pc - Vc) - Qd * Vc) * Vd) / ((ecd * edc - 1) * Vc * Vd);

    developerPriceSlider.value = pd;
    developerPrice.value = pd;
    consumerPriceSlider.value = pc;
    consumerPrice.value = pc;
  }

  // If the quantity of developers in the market is ever smaller than 0
  if (qd < 0) {
    // Don't let it become negative
    qd = 0;
    if (pd > ecd + 1) {
      pd = ecd + 1;
    }
    if (left) {
      pc = (ecd + 1 - pd) / ecd;
    } else {
      pd = ecd + 1 - pc * ecd;
    }

    // Profit Size Length for consumers
    // Similar to the plenght() function in the single sided market simulation
    // qc represents the x-value of the profit for consumers
    qc = (edc * Qd * Vc * (pd - Vd) + Qc * (pc - Vc) * Vd) / ((ecd * edc - 1) * Vc * Vd);

    // Profit Size Length for developers
    // Similar to the plenght() function in the single sided market simulation
    // qc represents the x-value of the profit for developers
    qd = (pd * Qd * Vc + (ecd * Qc * (pc - Vc) - Qd * Vc) * Vd) / ((ecd * edc - 1) * Vc * Vd);

    developerPriceSlider.value = pd;
    developerPrice.value = pd;
    consumerPriceSlider.value = pc;
    consumerPrice.value = pc;
  }

  // The y value of the consumer chart (The Maximum Value)
  let yc = ((Qc + edc * ((pd * Qd * Vc + (ecd * Qc * (pc - Vc) - Qd * Vc) * Vd) / ((ecd * edc - 1) * Vc * Vd))) * Vc) / Qc;

  // The x value of the consumer chart (The Maximum Market Size)
  let xc = Qc + edc * ((pd * Qd * Vc + (ecd * Qc * (pc - Vc) - Qd * Vc) * Vd) / ((ecd * edc - 1) * Vc * Vd));

  // The y value of the developer chart (The Maximum Value)
  let yd = ((Qd + ecd * ((pc * Qc * Vd + (edc * Qd * (pd - Vd) - Qc * Vd) * Vc) / ((edc * ecd - 1) * Vd * Vc))) * Vd) / Qd;

  // The x value of the developer chart (The Maximum Market Size)
  let xd = Qd + ecd * ((pc * Qc * Vd + (edc * Qd * (pd - Vd) - Qc * Vd) * Vc) / ((edc * ecd - 1) * Vd * Vc));

  // Consumer Price cannot exceed  Consumer Maximum Market Size
  if (pc > yc) {
    pc = yc;
  }

  // Developer Price cannot exceed Consumer Maximum Market Size
  if (pd > yd) {
    pd = yd;
  }

  var opc =
    (Vc * Vd * (Qd * ((ecd * edc - 2) * Qc - edc * Qd) * Vc + ecd * Qc * (ecd * Qc + Qd) * Vd)) /
    (edc * edc * Qd * Qd * Vc * Vc + 2 * (ecd * edc - 2) * Qc * Qd * Vc * Vd + ecd * ecd * Qc * Qc * Vd * Vd);
  console.log("opc is " + opc);
  var opd =
    (Vc * Vd * (edc * Qd * (Qc + edc * Qd) * Vc + Qc * ((ecd * edc - 2) * Qd - ecd * Qc) * Vd)) /
    (edc * edc * Qd * Qd * Vc * Vc + 2 * (ecd * edc - 2) * Qc * Qd * Vc * Vd + ecd * ecd * Qc * Qc * Vd * Vd);
  console.log("opd is " + opd);

  console.log("expenses are " + expenses);
  // Total Profit is maximized (turns green) when |0.875 - consumer price| < 0.001 AND when |0.125 - developer price| < 0.001
  var totalProfit2 = pd * qd + pc * qc - expenses;
  var consumerProfit = pc * qc;
  var developerProfit = pd * qd;

  // Increase consumer profit directly by 10% when Rider Redress is selected
  if (riderRedress.checked) {
    consumerProfit = consumerProfit * 1.1;
  }

  // Increase developer profit directly by 10% when Driver Redress is selected
  if (driverRedress.checked) {
    developerProfit = developerProfit * 1.1;
  }

  if (Math.abs(opc - pc) < 0.001 && Math.abs(opd - pd) < 0.001) {
    chart1.data.datasets[1].backgroundColor = "rgba(132, 255, 99, 0.5)";
    chart1.data.datasets[1].label = "Rider Profit = Riders * Fees = (" + consumerProfit.toFixed(5) + ") ~ Optimal";

    chart2.data.datasets[1].backgroundColor = "rgba(132, 255, 99, 0.5)";
    chart2.data.datasets[1].label = "Driver Profit = Drivers * Fees = (" + developerProfit.toFixed(5) + ") ~ Optimal";
  } else {
    chart1.data.datasets[1].backgroundColor = "rgba(175, 122, 197, 0.5)"; // purple
    chart1.data.datasets[1].label = "Rider Profit = Riders * Fees = (" + consumerProfit.toFixed(5) + ")";

    chart2.data.datasets[1].backgroundColor = "rgba(84, 153, 199, 0.5)"; // light blue
    chart2.data.datasets[1].label = "Driver Profit = Drivers * Fees = (" + developerProfit.toFixed(5) + ")";
  }

  // Calculates the total profit from both consumers and developers
  // Total Profit = Price * Quantity

  console.log("Total Profit = " + consumerProfit + " + " + developerProfit + " - " + expenses + " = " + totalProfit2);

  totalProfit.innerHTML = "Total Profit = Rider Profit + Driver Profit - Expenses = " + totalProfit2.toFixed(5);

  chart1.data.datasets[0].data[0].y = yc;
  chart1.data.datasets[0].data[1].x = qc;
  chart1.data.datasets[0].data[1].y = pc;
  chart1.data.datasets[1].data[0].y = pc;
  chart1.data.datasets[1].data[1].y = pc;
  chart1.data.datasets[1].data[1].x = qc;
  chart1.data.datasets[2].data[0].x = qc;
  chart1.data.datasets[2].data[0].y = pc;
  chart1.data.datasets[2].data[1].x = xc;
  chart1.data.datasets[2].data[1].y = 0;

  chart2.data.datasets[0].data[0].y = yd;
  chart2.data.datasets[0].data[1].x = qd;
  chart2.data.datasets[0].data[1].y = pd;
  chart2.data.datasets[1].data[0].y = pd;
  chart2.data.datasets[1].data[1].y = pd;
  chart2.data.datasets[1].data[1].x = qd;
  chart2.data.datasets[2].data[0].x = qd;
  chart2.data.datasets[2].data[0].y = pd;
  chart2.data.datasets[2].data[1].x = xd;
  chart2.data.datasets[2].data[1].y = 0;

  // Rider/Driver Satisfactions are inversly Proportional to Profits
  var driverSatisfaction = 0.5 / developerProfit;
  var riderSatisfaction = 0.5 / consumerProfit;

  chart3.data.datasets[0].data[0] = consumerProfit;
  chart3.data.datasets[1].data[0] = developerProfit;
  chart3.data.datasets[2].data[0] = riderSatisfaction;
  chart3.data.datasets[3].data[0] = driverSatisfaction;

  // Update animation shown
  document.getElementById("img").src = animationShown;

  // When the "Save Chnages" button is pressed, addData to Chart 3
  // var change = document.getElementById("addPoint");
  // if (change.value == "true") {
  //   addData(chart3, "", consumerProfit, developerProfit, riderSatisfaction, driverSatisfaction);
  //   change.value = "false";
  // }

  chart1.update();
  chart2.update();
  chart3.update();
}

// Onclick event for Rider/Driver Redress, updates the Dashboard's values
function redress() {
  const pc = document.getElementById("consumerPrice");
  const pd = document.getElementById("developerPrice");
  calcUpdate(
    Qc,
    Qd,
    Vc,
    Vd,
    expenses,
    parseFloat(pc.value),
    parseFloat(pd.value),
    ecd,
    edc,
    parseFloat(surgePricing.value),
    parseFloat(crimePricing.value),
    parseFloat(riderStars.value),
    parseFloat(driverStars.value),
    parseFloat(lowBattery.value),
    parseFloat(riderRating.value),
    parseFloat(driverRating.value),
    parseFloat(driverAds.value),
    parseFloat(riderAds.value),
    true
  );
}

function addData(chart, label, riderData, driverData, riderSatisfaction, driverSatisfaction) {
  chart.data.labels.push(label);
  // Adding new rider Profit
  chart.data.datasets[0].data.push(riderData);
  // Adding new driver Profit
  chart.data.datasets[1].data.push(driverData);
  // Adding new rider satisfaction
  chart.data.datasets[2].data.push(riderSatisfaction);
  // Adding new driver satisfaction
  chart.data.datasets[3].data.push(driverSatisfaction);
  chart.update();
}

function saveChanges() {
  var change = document.getElementById("addPoint");
  change.value = "true";
  // change names later
  // const Qc = document.getElementById();
  // const Qd = document.getElementById();
  // const Vc = document.getElementById();
  // const Vd = document.getElementById();
  const pc = document.getElementById("consumerPrice");
  const pd = document.getElementById("developerPrice");
  // const ecd = document.getElementById();
  // const edc = document.getElementById();
  // const left = document.getElementById();

  calcUpdate(
    Qc,
    Qd,
    Vc,
    Vd,
    expenses,
    parseFloat(pc.value),
    parseFloat(pd.value),
    ecd,
    edc,
    parseFloat(surgePricing.value),
    parseFloat(crimePricing.value),
    parseFloat(riderStars.value),
    parseFloat(driverStars.value),
    parseFloat(lowBattery.value),
    parseFloat(riderRating.value),
    parseFloat(driverRating.value),
    parseFloat(driverAds.value),
    parseFloat(riderAds.value),
    true
  );

  document.getElementById("img").src = animationShown;
}

consumerPriceSlider.oninput = function () {
  calcUpdate(
    Qc,
    Qd,
    Vc,
    Vd,
    expenses,
    this.value,
    developerPrice.value,
    ecd,
    edc,
    surgePricing.value,
    crimePricing.value,
    riderStars.value,
    driverStars.value,
    lowBattery.value,
    riderRating.value,
    driverRating.value,
    driverAds.value,
    riderAds.value,
    true
  );
};

consumerPrice.oninput = function () {
  calcUpdate(
    Qc,
    Qd,
    Vc,
    Vd,
    expenses,
    this.value,
    developerPrice.value,
    ecd,
    edc,
    surgePricing.value,
    crimePricing.value,
    riderStars.value,
    driverStars.value,
    lowBattery.value,
    riderRating.value,
    driverRating.value,
    driverAds.value,
    riderAds.value,
    true
  );
};

developerPriceSlider.oninput = function () {
  calcUpdate(
    Qc,
    Qd,
    Vc,
    Vd,
    expenses,
    consumerPrice.value,
    this.value,
    ecd,
    edc,
    surgePricing.value,
    crimePricing.value,
    riderStars.value,
    driverStars.value,
    lowBattery.value,
    riderRating.value,
    driverRating.value,
    driverAds.value,
    riderAds.value,
    false
  );
};

developerPrice.oninput = function () {
  calcUpdate(
    Qc,
    Qd,
    Vc,
    Vd,
    expenses,
    consumerPrice.value,
    this.value,
    ecd,
    edc,
    surgePricing.value,
    crimePricing.value,
    riderStars.value,
    driverStars.value,
    lowBattery.value,
    riderRating.value,
    driverRating.value,
    driverAds.value,
    riderAds.value,
    false
  );
};

surgePricingSlider.oninput = function () {
  calcUpdate(
    Qc,
    Qd,
    Vc,
    Vd,
    expenses,
    consumerPrice.value,
    developerPrice.value,
    ecd,
    edc,
    this.value,
    crimePricing.value,
    riderStars.value,
    driverStars.value,
    lowBattery.value,
    riderRating.value,
    driverRating.value,
    driverAds.value,
    riderAds.value
  );
};

surgePricing.oninput = function () {
  calcUpdate(
    Qc,
    Qd,
    Vc,
    Vd,
    expenses,
    consumerPrice.value,
    developerPrice.value,
    ecd,
    edc,
    this.value,
    crimePricing.value,
    riderStars.value,
    driverStars.value,
    lowBattery.value,
    riderRating.value,
    driverRating.value,
    driverAds.value,
    riderAds.value
  );
};

crimePricingSlider.oninput = function () {
  calcUpdate(
    Qc,
    Qd,
    Vc,
    Vd,
    expenses,
    consumerPrice.value,
    developerPrice.value,
    ecd,
    edc,
    surgePricing.value,
    this.value,
    riderStars.value,
    driverStars.value,
    lowBattery.value,
    riderRating.value,
    driverRating.value,
    driverAds.value,
    riderAds.value
  );
};

crimePricing.oninput = function () {
  calcUpdate(
    Qc,
    Qd,
    Vc,
    Vd,
    expenses,
    consumerPrice.value,
    developerPrice.value,
    ecd,
    edc,
    surgePricing.value,
    this.value,
    riderStars.value,
    driverStars.value,
    lowBattery.value,
    riderRating.value,
    driverRating.value,
    driverAds.value,
    riderAds.value
  );
};

riderStarsSlider.oninput = function () {
  calcUpdate(
    Qc,
    Qd,
    Vc,
    Vd,
    expenses,
    consumerPrice.value,
    developerPrice.value,
    ecd,
    edc,
    surgePricing.value,
    crimePricing.value,
    this.value,
    driverStars.value,
    lowBattery.value,
    riderRating.value,
    driverRating.value,
    driverAds.value,
    riderAds.value
  );
};

riderStars.oninput = function () {
  calcUpdate(
    Qc,
    Qd,
    Vc,
    Vd,
    expenses,
    consumerPrice.value,
    developerPrice.value,
    ecd,
    edc,
    surgePricing.value,
    crimePricing.value,
    this.value,
    driverStars.value,
    lowBattery.value,
    riderRating.value,
    driverRating.value,
    driverAds.value,
    riderAds.value
  );
};

driverStarsSlider.oninput = function () {
  calcUpdate(
    Qc,
    Qd,
    Vc,
    Vd,
    expenses,
    consumerPrice.value,
    developerPrice.value,
    ecd,
    edc,
    surgePricing.value,
    crimePricing.value,
    riderStars.value,
    this.value,
    lowBattery.value,
    riderRating.value,
    driverRating.value,
    driverAds.value,
    riderAds.value
  );
};

driverStars.oninput = function () {
  calcUpdate(
    Qc,
    Qd,
    Vc,
    Vd,
    expenses,
    consumerPrice.value,
    developerPrice.value,
    ecd,
    edc,
    surgePricing.value,
    crimePricing.value,
    riderStars.value,
    this.value,
    lowBattery.value,
    riderRating.value,
    driverRating.value,
    driverAds.value,
    riderAds.value
  );
};

lowBatterySlider.oninput = function () {
  calcUpdate(
    Qc,
    Qd,
    Vc,
    Vd,
    expenses,
    consumerPrice.value,
    developerPrice.value,
    ecd,
    edc,
    surgePricing.value,
    crimePricing.value,
    riderStars.value,
    driverStars.value,
    this.value,
    riderRating.value,
    driverRating.value,
    driverAds.value,
    riderAds.value
  );
};

lowBattery.oninput = function () {
  calcUpdate(
    Qc,
    Qd,
    Vc,
    Vd,
    expenses,
    consumerPrice.value,
    developerPrice.value,
    ecd,
    edc,
    surgePricing.value,
    crimePricing.value,
    riderStars.value,
    driverStars.value,
    this.value,
    riderRating.value,
    driverRating.value,
    driverAds.value,
    riderAds.value
  );
};

riderRatingSlider.oninput = function () {
  calcUpdate(
    Qc,
    Qd,
    Vc,
    Vd,
    expenses,
    consumerPrice.value,
    developerPrice.value,
    ecd,
    edc,
    surgePricing.value,
    crimePricing.value,
    riderStars.value,
    driverStars.value,
    lowBattery.value,
    this.value,
    driverRating.value,
    driverAds.value,
    riderAds.value
  );
};

riderRating.oninput = function () {
  calcUpdate(
    Qc,
    Qd,
    Vc,
    Vd,
    expenses,
    consumerPrice.value,
    developerPrice.value,
    ecd,
    edc,
    surgePricing.value,
    crimePricing.value,
    riderStars.value,
    driverStars.value,
    lowBattery.value,
    this.value,
    driverRating.value,
    driverAds.value,
    riderAds.value
  );
};

driverRatingSlider.oninput = function () {
  calcUpdate(
    Qc,
    Qd,
    Vc,
    Vd,
    expenses,
    consumerPrice.value,
    developerPrice.value,
    ecd,
    edc,
    surgePricing.value,
    crimePricing.value,
    riderStars.value,
    driverStars.value,
    lowBattery.value,
    riderRating.value,
    this.value,
    driverAds.value,
    riderAds.value
  );
};

driverRating.oninput = function () {
  calcUpdate(
    Qc,
    Qd,
    Vc,
    Vd,
    expenses,
    consumerPrice.value,
    developerPrice.value,
    ecd,
    edc,
    surgePricing.value,
    crimePricing.value,
    riderStars.value,
    driverStars.value,
    lowBattery.value,
    riderRating.value,
    this.value,
    driverAds.value,
    riderAds.value
  );
};

driverAdsSlider.oninput = function () {
  calcUpdate(
    Qc,
    Qd,
    Vc,
    Vd,
    expenses,
    consumerPrice.value,
    developerPrice.value,
    ecd,
    edc,
    surgePricing.value,
    crimePricing.value,
    riderStars.value,
    driverStars.value,
    lowBattery.value,
    riderRating.value,
    driverRating.value,
    this.value,
    riderAds.value
  );
};

driverAds.oninput = function () {
  calcUpdate(
    Qc,
    Qd,
    Vc,
    Vd,
    expenses,
    consumerPrice.value,
    developerPrice.value,
    ecd,
    edc,
    surgePricing.value,
    crimePricing.value,
    riderStars.value,
    driverStars.value,
    lowBattery.value,
    riderRating.value,
    driverRating.value,
    this.value,
    riderAds.value
  );
};

riderAdsSlider.oninput = function () {
  calcUpdate(
    Qc,
    Qd,
    Vc,
    Vd,
    expenses,
    consumerPrice.value,
    developerPrice.value,
    ecd,
    edc,
    surgePricing.value,
    crimePricing.value,
    riderStars.value,
    driverStars.value,
    lowBattery.value,
    riderRating.value,
    driverRating.value,
    driverAds.value,
    this.value
  );
};

riderAds.oninput = function () {
  calcUpdate(
    Qc,
    Qd,
    Vc,
    Vd,
    expenses,
    consumerPrice.value,
    developerPrice.value,
    ecd,
    edc,
    surgePricing.value,
    crimePricing.value,
    riderStars.value,
    driverStars.value,
    lowBattery.value,
    riderRating.value,
    driverRating.value,
    driverAds.value,
    this.value
  );
};
