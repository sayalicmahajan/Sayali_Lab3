document.addEventListener("DOMContentLoaded", function () {
    const billTotalInput = document.getElementById("billTotal");
    const tipPercentageSlider = document.getElementById("tipPercentage");
    const tipPercentageDisplay = document.getElementById("tipPercentageDisplay");
    const currencySelector = document.getElementById("currency");
    const tipAmountInput = document.getElementById("tipAmount");
    const totalWithTipInput = document.getElementById("totalWithTip");
    const convertedTotalInput = document.getElementById("convertedTotal");

    // Function to calculate tip and total in selected currency
    function calculateTipAndTotal() {
        const billTotal = parseFloat(billTotalInput.value);
        const tipPercentage = parseFloat(tipPercentageSlider.value);
        const currencyRate = parseFloat(currencySelector.value);

        // Validate bill total
        if (isNaN(billTotal) || billTotal < 0) {
            tipAmountInput.value = "";
            totalWithTipInput.value = "";
            convertedTotalInput.value = "";
            alert("Please enter a valid positive number for the bill total.");
            return;
        }

        // Calculate Tip Amount and Total Bill with Tip in USD
        const tipAmountUSD = (billTotal * tipPercentage) / 100;
        const totalWithTipUSD = billTotal + tipAmountUSD;

        // Convert Tip Amount and Total Bill with Tip to selected currency
        const tipAmountConverted = tipAmountUSD * currencyRate;
        const totalWithTipConverted = totalWithTipUSD * currencyRate;

        // Display Tip Amount and Total Bill with Tip in the selected currency
        const currencySymbol = currencySelector.options[currencySelector.selectedIndex].text;
        tipAmountInput.value = `${currencySymbol} ${tipAmountConverted.toFixed(2)}`;
        totalWithTipInput.value = `${currencySymbol} ${totalWithTipConverted.toFixed(2)}`;

        // Also update the Converted Total Bill field
        convertedTotalInput.value = `${currencySymbol} ${totalWithTipConverted.toFixed(2)}`;
    }

    // Update displayed tip percentage when the slider is moved
    tipPercentageSlider.addEventListener("input", function () {
        tipPercentageDisplay.value = `${tipPercentageSlider.value}%`;
        calculateTipAndTotal();
    });

    // Recalculate when bill total or currency is changed
    billTotalInput.addEventListener("input", calculateTipAndTotal);
    currencySelector.addEventListener("change", calculateTipAndTotal);
});
