console.log("social-staking.js");

const microSocialStakingCheckbox = document.getElementById(
  "micro-social-staking"
);
const stakeAmountInput = document.getElementById("stake-amount");

// Add an event listener to the checkbox
microSocialStakingCheckbox.addEventListener("change", function () {
  if (microSocialStakingCheckbox.checked) {
    stakeAmountInput.disabled = false;
  } else {
    stakeAmountInput.disabled = true;
  }
});
