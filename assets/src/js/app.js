/**
 * Verify if the DOM is ready
 * @param {function} fn
 * @return {void}
 */
function domReady(fn) {
  // If we're early to the party
  document.addEventListener("DOMContentLoaded", fn);
  // If late; I mean on time.
  if (
    document.readyState === "interactive" ||
    document.readyState === "complete"
  ) {
    fn();
  }
}

/**
 * Application entrypoint
 */
domReady(() => {
  console.log("The DOM is ready! 🚀");
  var slider = document.getElementById("slideRange");
  var output = document.getElementById("stake");

  // Set initial background color
  updateSliderBackground();

  output.value = slider.value;

  slider.oninput = function () {
    output.value = this.value;
    updateSliderBackground();
    calculateValues();
  };

  // Event listener for input value changes
  output.addEventListener("input", function () {
    var value = parseFloat(output.value);

    // Check if the entered value is within the slider range
    if (value >= parseFloat(slider.min) && value <= parseFloat(slider.max)) {
      slider.value = value;
      updateSliderBackground();
      calculateValues();
    }
  });

  function updateSliderBackground() {
    // Calculate the percentage of the slider value
    var percent =
      ((slider.value - slider.min) / (slider.max - slider.min)) * 100;

    // Calculate the remaining percentage
    var remainingPercent = 100 - percent;

    // Set the background color based on the percentage
    slider.style.background =
      "linear-gradient(to right, #000000 " +
      percent +
      "%, #f1f1f5 " +
      percent +
      "%, #f1f1f5 " +
      remainingPercent +
      "%)";
  }

  /**odds slider */

  // Get references to the input field and the slider for americanOdds
  let americanOddsInput = document.getElementById("americanOdds");
  let rangeValue = document.getElementById("rangeValue");

  // Add event listeners to both elements
  americanOddsInput.addEventListener("input", function () {
    updateRangeValue();
    calculateValues();
  });
  rangeValue.addEventListener("input", function () {
    updateAmericanOdds();
    calculateValues();
  });

  // Function to update the slider based on the input field value
  function updateRangeValue() {
    // Update the value of the slider
    rangeValue.value = americanOddsInput.value;
  }

  // Function to update the input field based on the slider value
  function updateAmericanOdds() {
    // Update the value of the input field
    americanOddsInput.value = rangeValue.value;
  }

  /** Payout calculation */

  let payoutInput = document.getElementById("payout_value");
  let impliedOddInput = document.getElementById("implied_odd");
  let decimalOddInput = document.getElementById("decimal_odd");
  let fractionInput = document.getElementById("fraction");
  let profitInput = document.getElementById("profit");
  let betAmountInput = document.getElementById("stake"); // Updated ID for bet amount

  // Function to simplify fractions
  function simplifyFraction(numerator, denominator) {
    function gcd(a, b) {
      return b ? gcd(b, a % b) : a;
    }
    let gcdValue = gcd(numerator, denominator);
    return `${numerator / gcdValue}/${denominator / gcdValue}`;
  }

  // Function to calculate and update the values
  function calculateValues() {
    let americanOddsValue = parseFloat(americanOddsInput.value);
    let betAmount = parseFloat(betAmountInput.value);

    // Check if the input is a valid number
    if (!isNaN(americanOddsValue) && !isNaN(betAmount)) {
      if (americanOddsValue > 0) {
        // Conversion for positive American odds
        let decimalOdds = (americanOddsValue / 100 + 1).toFixed(2);
        decimalOddInput.innerHTML = decimalOdds;

        // Fractional odds for positive American odds
        let numerator = americanOddsValue;
        let denominator = 100;
        fractionInput.innerHTML = simplifyFraction(numerator, denominator);

        // Implied probability for positive American odds
        let impliedProbability = (
          (100 / (americanOddsValue + 100)) *
          100
        ).toFixed(2);
        impliedOddInput.innerHTML = `${impliedProbability}%`;

        // Payout and profit for positive American odds
        let payout = (betAmount * decimalOdds).toFixed(2);
        let profit = (betAmount * (decimalOdds - 1)).toFixed(2);
        payoutInput.innerHTML = `$${payout}`;
        profitInput.innerHTML = `$${profit}`;
      } else {
        // Conversion for negative American odds
        let decimalOdds = (100 / Math.abs(americanOddsValue) + 1).toFixed(2);
        decimalOddInput.innerHTML = decimalOdds;

        // Fractional odds for negative American odds
        let numerator = 100;
        let denominator = Math.abs(americanOddsValue);
        fractionInput.innerHTML = simplifyFraction(numerator, denominator);

        // Implied probability for negative American odds
        let impliedProbability = (
          (Math.abs(americanOddsValue) / (Math.abs(americanOddsValue) + 100)) *
          100
        ).toFixed(2);
        impliedOddInput.innerHTML = `${impliedProbability}%`;

        // Payout and profit for negative American odds
        let payout = (betAmount * decimalOdds).toFixed(2);
        let profit = (betAmount * (decimalOdds - 1)).toFixed(2);
        payoutInput.innerHTML = `$${payout}`;
        profitInput.innerHTML = `$${profit}`;
      }
    } else {
      // Handle the case where the input is not a valid number
      decimalOddInput.innerHTML = "Invalid input";
      fractionInput.innerHTML = "Invalid input";
      impliedOddInput.innerHTML = "Invalid input";
      payoutInput.innerHTML = "Invalid input";
      profitInput.innerHTML = "Invalid input";
    }
  }

  // Initial calculation
  calculateValues();

  // Add event listeners to input fields
  americanOddsInput.addEventListener("input", calculateValues);
  betAmountInput.addEventListener("input", calculateValues);

  // Get reference to the reset button
  const resetBtn = document.getElementById("resetBtn");

  // Add event listener to the reset button
  resetBtn.addEventListener("click", function () {
    // Set default values for input fields
    americanOddsInput.value = "105"; // Set to your default value
    betAmountInput.value = "100"; // Set to your default value

    // Reset the bet amount slider to its default value
    slider.value = betAmountInput.value; // Ensure this matches the default bet amount
    updateSliderBackground();

    // Reset the odds slider to its default value
    rangeValue.value = americanOddsInput.value; // Ensure this matches the default odds value

    // Trigger the calculateValues function to update the values
    calculateValues();
  });

  /**
   *
   *
   *
   *
   *
   * Parlay Calculator Starts here
   *
   *
   *
   *
   */

  var parlaySlider = document.getElementById("parlaySlideRange");
  var parlayOutput = document.getElementById("parlayStake");

  // Set initial background color
  updateParlaySliderBackground();

  parlayOutput.value = parlaySlider.value;

  parlaySlider.oninput = function () {
    parlayOutput.value = this.value;
    updateParlaySliderBackground();
    calculateParlayMetrics();
  };

  document.getElementById("parlayStake").addEventListener("input", function () {
    calculateParlayMetrics();
  });

  // Event listener for parlay input value changes
  parlayOutput.addEventListener("input", function () {
    var value = parseFloat(parlayOutput.value);

    // Check if the entered value is within the slider range
    if (
      value >= parseFloat(parlaySlider.min) &&
      value <= parseFloat(parlaySlider.max)
    ) {
      parlaySlider.value = value;
      updateParlaySliderBackground();
      calculateValues();
    }
  });

  function updateParlaySliderBackground() {
    // Calculate the percentage of the slider value
    var percent =
      ((parlaySlider.value - parlaySlider.min) /
        (parlaySlider.max - parlaySlider.min)) *
      100;

    // Calculate the remaining percentage
    var remainingPercent = 100 - percent;

    // Set the background color based on the percentage
    parlaySlider.style.background =
      "linear-gradient(to right, #000000 " +
      percent +
      "%, #f1f1f5 " +
      percent +
      "%, #f1f1f5 " +
      remainingPercent +
      "%)";
  }

  document
    .getElementById("parlayAmericanOdds")
    .addEventListener("keypress", function (event) {
      if (event.key === "Enter") {
        event.preventDefault();
        addBetToList();
      }
    });

  document.getElementById("addBet").addEventListener("click", function () {
    addBetToList();
  });

  document
    .getElementById("betsContainer")
    .addEventListener("click", function (event) {
      if (event.target.dataset.icon === "close") {
        removeBet(event.target.closest(".betdiv"));
      }
    });

  function addBetToList() {
    const oddsInput = document.getElementById("parlayAmericanOdds");
    const betValue = oddsInput.value.trim();
    const errorMessage = document.getElementById("errorMessage");

    // Clear previous error message
    if (errorMessage) {
      errorMessage.remove();
    }

    // Validate that the input is a number and within the range -100000 to +100000
    if (
      !isNaN(betValue) &&
      betValue !== "" &&
      betValue >= -100000 &&
      betValue <= 100000
    ) {
      const betsList = document.getElementById("betsList");
      const betDiv = document.createElement("div");
      betDiv.className =
        "betdiv flex bg-neutral-200 rounded my-1.5 pl-1.5 py-0 ml-2.5 h-[70%]";
      betDiv.innerHTML = `
            <div class="flex items-center flex-grow-[2] pr-1">
                <div class="text-fuji-grey text-lg font-extrabold americanOddValue">${betValue}</div>
            </div>
            <div class="flex flex-grow items-center px-2 rounded-sm" role="button" tabindex="0">
                <svg
                class="hover:opacity-80 cursor-pointer"
                width="18"
                style="fill: #232a31; stroke: #232a31; stroke-width: 0; vertical-align: bottom;"
                height="18"
                viewBox="0 0 48 48"
                data-icon="close"
                >
                <path
                    d="M37.98 34.827l-9.9-9.9 9.9-9.898c.78-.782.78-2.05 0-2.83-.78-.78-2.047-.78-2.828 0l-9.9 9.9-9.898-9.9c-.78-.78-2.048-.78-2.828 0-.78.78-.78 2.047 0 2.828l9.9 9.9-9.9 9.898c-.78.78-.78 2.047 0 2.828.78.78 2.047.78 2.828 0l9.9-9.9 9.898 9.9c.78.78 2.048.78 2.828 0 .782-.78.782-2.047 0-2.827z"
                ></path>
                </svg>
            </div>
        `;
      betsList.insertBefore(betDiv, oddsInput.parentElement);
      oddsInput.value = "";
      oddsInput.focus();
      calculateParlayMetrics(); // Recalculate metrics after adding a bet
    } else {
      // Show error message
      const errorDiv = document.createElement("div");
      errorDiv.id = "errorMessage";
      errorDiv.className = "text-red-500 text-xs mt-1";
      errorDiv.textContent =
        "Please enter a valid number between -100000 and +100000";
      oddsInput.parentElement.appendChild(errorDiv);
      oddsInput.focus();
    }
  }

  function removeBet(element) {
    if (element) {
      element.remove();
      calculateParlayMetrics(); // Recalculate metrics after removing a bet
    }
  }

  function clearBets() {
    const betsList = document.getElementById("betsList");
    betsList.querySelectorAll(".betdiv").forEach((bet) => bet.remove());
    calculateParlayMetrics(); // Recalculate metrics after clearing bets
  }

  document
    .getElementById("clearBetsButton")
    .addEventListener("click", function () {
      clearBets();
    });

  function calculateParlayMetrics() {
    // Get the bet amount
    const betAmount = parseFloat(document.getElementById("parlayStake").value);
    if (isNaN(betAmount) || betAmount < 0) {
      console.error("Invalid bet amount");
      return;
    }

    // Get all odds elements
    const oddsElements = document.querySelectorAll(".americanOddValue");

    // Initialize variables for calculations
    let totalDecimalOdds = 1;

    // Calculate the combined decimal odds if odds are added
    if (oddsElements.length > 0) {
      oddsElements.forEach(function (element) {
        const americanOdds = parseFloat(element.textContent);
        if (!isNaN(americanOdds)) {
          const decimalOdds =
            americanOdds >= 0
              ? americanOdds / 100 + 1
              : 100 / Math.abs(americanOdds) + 1;
          totalDecimalOdds *= decimalOdds;
        }
      });
    }

    // Calculate the payout amount
    const payoutAmount = betAmount * totalDecimalOdds;
    const winAmount = payoutAmount - betAmount;
    const impliedProbability = (1 / totalDecimalOdds) * 100;

    // Display the calculated values in the DOM
    document.getElementById("parlayPayout").innerHTML =
      "$" + payoutAmount.toFixed(2);
    document.getElementById("parlayProfit").innerHTML =
      "$" + winAmount.toFixed(2);
    document.getElementById("parlayImplied").innerHTML =
      impliedProbability.toFixed(2) + "%";

    // Log results for debugging
    console.log({
      betAmount,
      totalDecimalOdds,
      payoutAmount,
      winAmount,
      impliedProbability,
    });
  }

  // Add event listeners to trigger the calculations
  document
    .getElementById("parlayStake")
    .addEventListener("keyup", calculateParlayMetrics);
  document
    .getElementById("addBet")
    .addEventListener("click", calculateParlayMetrics);
  document
    .getElementById("betsContainer")
    .addEventListener("click", function (event) {
      if (event.target.dataset.icon === "close") {
        removeBet(event.target.closest(".betdiv"));
        calculateParlayMetrics(); // Recalculate metrics when removing a bet
      }
    });
  document
    .getElementById("clearBetsButton")
    .addEventListener("click", function () {
      clearBets();
      calculateParlayMetrics(); // Recalculate metrics when clearing bets
    });

  document
    .getElementById("parlayResetBtn")
    .addEventListener("click", function () {
      // Reset the parlay stake input field
      document.getElementById("parlayStake").value = "";

      // Remove all bets from the list
      clearBets();

      // Reset the payout, profit, and implied probability fields
      document.getElementById("parlayPayout").innerHTML = "$100.00";
      document.getElementById("parlayProfit").innerHTML = "$0.00";
      document.getElementById("parlayImplied").innerHTML = "0.00%";

      // Reset the slider
      var parlaySlider = document.getElementById("parlaySlideRange");
      var parlayOutput = document.getElementById("parlayStake");
      parlaySlider.value = parlaySlider.defaultValue;
      parlayOutput.value = parlayOutput.defaultValue;
      updateParlaySliderBackground();
    });

  /**
   *
   * make all the imput types to select number only
   */
  // Select all inputs with a specific class
  const numberInputs = document.querySelectorAll(".number-only");

  // Add input event listener to each selected input
  numberInputs.forEach((input) => {
    input.addEventListener("input", validateNumberInput);
  });

  function validateNumberInput(event) {
    const input = event.target;
    input.value = input.value.replace(/[^0-9]/g, "");
  }
});
