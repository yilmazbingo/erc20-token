import Web3 from "web3";

function loadWeb3() {
  if (window.ethreum) {
    try {
      window.web3 = new Web3(window.ethreum);
      return window.web3;
    } catch (error) {
      if (error.code === 4001) {
        window.alert("Permission denied!");
      }
    }
  } else if (window.web3) {
    window.web3 = new Web3(window.web3.currentProvider);
    return window.web3;
  } else {
    window.alert(
      "Non-Ethreum browser detected. Please add chrome Metamask extension"
    );
  }
}
const web3 = loadWeb3();
// window.web3.currentProvider.enable();

export default web3;
