// utils
function getCurrentURL() {
  return window.location.href;
}

// actions for pages
const handleSelectItemFromListing = () => {
  const element = document.querySelector("div.css-1s9lo10.e1v1ep7c8 > button");
  if (element) {
    console.log(element.innerHTML);
    console.log("The element with the text Buy was found.");
    element.click();
  } else {
    console.log("The element with with the text Buy was not found.");
  }
};

const handleCartPage = () => {
  const element = document.querySelector(
    "#__next > div > div.css-19byfay.e7sp7bl1 > div > footer > button"
  );
  if (element) {
    console.log(element.innerHTML);
    console.log("The element with the text Continute was found.");
    element.click();
  } else {
    console.log("The element with with the text Continute was not found.");
  }
};

const selectAbnAmro = () => {
  const element = document.querySelector("#abn_amro");

  if (element) {
    element.click();
    const continuteElement = document.querySelector(
      "#__next > div > div.css-19byfay.e7sp7bl1 > div > nav > div.css-x6zytz.e7fmnlx1 > button"
    );
    continuteElement.click();
  } else {
    console.log(
      "The element with with the text Credit or debit card was not found."
    );
  }
  element.click();
};

const handleSelectPaymentMethodPage = () => {
  const element = document.querySelector("#STRIPE_MONEY_MACHINE_IDEAL");
  if (element) {
    element.click();
    //
    selectAbnAmro();
  } else {
    console.log(
      "The element with with the text Credit or debit card was not found."
    );
  }
};

// Listen for messages from the background script
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  // root acion dispatcher
  setTimeout(() => {
    const url = getCurrentURL();

    if (url.includes("ticketswap.com/listing/")) {
      handleSelectItemFromListing();
    }
    if (url.includes("ticketswap.com/cart")) {
      handleCartPage();
    }
    if (url.includes("ticketswap.com/checkout/payment/method")) {
      handleSelectPaymentMethodPage();
    }
  }, 100);
});
