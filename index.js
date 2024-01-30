const express = require("express")
const app = express();
const Web3 = require("web3");
const url = require("url");
const port = process.env.port || 6000;

const web3test = new Web3("https://data-seed-prebsc-1-s1.binance.org:8545/"); //test bscscan
const web3main = new Web3("https://bsc-dataseed.binance.org/"); // bscscan
var web3 = 0;

const cors = require('cors');
app.use(cors());




const pancakeRouter = "0x10ED43C718714eb63d5aA57B78B54704E256024E";

const pancakeAbi = [{ "inputs": [{ "internalType": "address", "name": "_factory", "type": "address" }, { "internalType": "address", "name": "_WETH", "type": "address" }], "stateMutability": "nonpayable", "type": "constructor" }, { "inputs": [], "name": "WETH", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "tokenA", "type": "address" }, { "internalType": "address", "name": "tokenB", "type": "address" }, { "internalType": "uint256", "name": "amountADesired", "type": "uint256" }, { "internalType": "uint256", "name": "amountBDesired", "type": "uint256" }, { "internalType": "uint256", "name": "amountAMin", "type": "uint256" }, { "internalType": "uint256", "name": "amountBMin", "type": "uint256" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "deadline", "type": "uint256" }], "name": "addLiquidity", "outputs": [{ "internalType": "uint256", "name": "amountA", "type": "uint256" }, { "internalType": "uint256", "name": "amountB", "type": "uint256" }, { "internalType": "uint256", "name": "liquidity", "type": "uint256" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "token", "type": "address" }, { "internalType": "uint256", "name": "amountTokenDesired", "type": "uint256" }, { "internalType": "uint256", "name": "amountTokenMin", "type": "uint256" }, { "internalType": "uint256", "name": "amountETHMin", "type": "uint256" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "deadline", "type": "uint256" }], "name": "addLiquidityETH", "outputs": [{ "internalType": "uint256", "name": "amountToken", "type": "uint256" }, { "internalType": "uint256", "name": "amountETH", "type": "uint256" }, { "internalType": "uint256", "name": "liquidity", "type": "uint256" }], "stateMutability": "payable", "type": "function" }, { "inputs": [], "name": "factory", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "amountOut", "type": "uint256" }, { "internalType": "uint256", "name": "reserveIn", "type": "uint256" }, { "internalType": "uint256", "name": "reserveOut", "type": "uint256" }], "name": "getAmountIn", "outputs": [{ "internalType": "uint256", "name": "amountIn", "type": "uint256" }], "stateMutability": "pure", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "amountIn", "type": "uint256" }, { "internalType": "uint256", "name": "reserveIn", "type": "uint256" }, { "internalType": "uint256", "name": "reserveOut", "type": "uint256" }], "name": "getAmountOut", "outputs": [{ "internalType": "uint256", "name": "amountOut", "type": "uint256" }], "stateMutability": "pure", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "amountOut", "type": "uint256" }, { "internalType": "address[]", "name": "path", "type": "address[]" }], "name": "getAmountsIn", "outputs": [{ "internalType": "uint256[]", "name": "amounts", "type": "uint256[]" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "amountIn", "type": "uint256" }, { "internalType": "address[]", "name": "path", "type": "address[]" }], "name": "getAmountsOut", "outputs": [{ "internalType": "uint256[]", "name": "amounts", "type": "uint256[]" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "amountA", "type": "uint256" }, { "internalType": "uint256", "name": "reserveA", "type": "uint256" }, { "internalType": "uint256", "name": "reserveB", "type": "uint256" }], "name": "quote", "outputs": [{ "internalType": "uint256", "name": "amountB", "type": "uint256" }], "stateMutability": "pure", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "tokenA", "type": "address" }, { "internalType": "address", "name": "tokenB", "type": "address" }, { "internalType": "uint256", "name": "liquidity", "type": "uint256" }, { "internalType": "uint256", "name": "amountAMin", "type": "uint256" }, { "internalType": "uint256", "name": "amountBMin", "type": "uint256" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "deadline", "type": "uint256" }], "name": "removeLiquidity", "outputs": [{ "internalType": "uint256", "name": "amountA", "type": "uint256" }, { "internalType": "uint256", "name": "amountB", "type": "uint256" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "token", "type": "address" }, { "internalType": "uint256", "name": "liquidity", "type": "uint256" }, { "internalType": "uint256", "name": "amountTokenMin", "type": "uint256" }, { "internalType": "uint256", "name": "amountETHMin", "type": "uint256" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "deadline", "type": "uint256" }], "name": "removeLiquidityETH", "outputs": [{ "internalType": "uint256", "name": "amountToken", "type": "uint256" }, { "internalType": "uint256", "name": "amountETH", "type": "uint256" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "token", "type": "address" }, { "internalType": "uint256", "name": "liquidity", "type": "uint256" }, { "internalType": "uint256", "name": "amountTokenMin", "type": "uint256" }, { "internalType": "uint256", "name": "amountETHMin", "type": "uint256" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "deadline", "type": "uint256" }], "name": "removeLiquidityETHSupportingFeeOnTransferTokens", "outputs": [{ "internalType": "uint256", "name": "amountETH", "type": "uint256" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "token", "type": "address" }, { "internalType": "uint256", "name": "liquidity", "type": "uint256" }, { "internalType": "uint256", "name": "amountTokenMin", "type": "uint256" }, { "internalType": "uint256", "name": "amountETHMin", "type": "uint256" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "deadline", "type": "uint256" }, { "internalType": "bool", "name": "approveMax", "type": "bool" }, { "internalType": "uint8", "name": "v", "type": "uint8" }, { "internalType": "bytes32", "name": "r", "type": "bytes32" }, { "internalType": "bytes32", "name": "s", "type": "bytes32" }], "name": "removeLiquidityETHWithPermit", "outputs": [{ "internalType": "uint256", "name": "amountToken", "type": "uint256" }, { "internalType": "uint256", "name": "amountETH", "type": "uint256" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "token", "type": "address" }, { "internalType": "uint256", "name": "liquidity", "type": "uint256" }, { "internalType": "uint256", "name": "amountTokenMin", "type": "uint256" }, { "internalType": "uint256", "name": "amountETHMin", "type": "uint256" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "deadline", "type": "uint256" }, { "internalType": "bool", "name": "approveMax", "type": "bool" }, { "internalType": "uint8", "name": "v", "type": "uint8" }, { "internalType": "bytes32", "name": "r", "type": "bytes32" }, { "internalType": "bytes32", "name": "s", "type": "bytes32" }], "name": "removeLiquidityETHWithPermitSupportingFeeOnTransferTokens", "outputs": [{ "internalType": "uint256", "name": "amountETH", "type": "uint256" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "tokenA", "type": "address" }, { "internalType": "address", "name": "tokenB", "type": "address" }, { "internalType": "uint256", "name": "liquidity", "type": "uint256" }, { "internalType": "uint256", "name": "amountAMin", "type": "uint256" }, { "internalType": "uint256", "name": "amountBMin", "type": "uint256" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "deadline", "type": "uint256" }, { "internalType": "bool", "name": "approveMax", "type": "bool" }, { "internalType": "uint8", "name": "v", "type": "uint8" }, { "internalType": "bytes32", "name": "r", "type": "bytes32" }, { "internalType": "bytes32", "name": "s", "type": "bytes32" }], "name": "removeLiquidityWithPermit", "outputs": [{ "internalType": "uint256", "name": "amountA", "type": "uint256" }, { "internalType": "uint256", "name": "amountB", "type": "uint256" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "amountOut", "type": "uint256" }, { "internalType": "address[]", "name": "path", "type": "address[]" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "deadline", "type": "uint256" }], "name": "swapETHForExactTokens", "outputs": [{ "internalType": "uint256[]", "name": "amounts", "type": "uint256[]" }], "stateMutability": "payable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "amountOutMin", "type": "uint256" }, { "internalType": "address[]", "name": "path", "type": "address[]" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "deadline", "type": "uint256" }], "name": "swapExactETHForTokens", "outputs": [{ "internalType": "uint256[]", "name": "amounts", "type": "uint256[]" }], "stateMutability": "payable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "amountOutMin", "type": "uint256" }, { "internalType": "address[]", "name": "path", "type": "address[]" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "deadline", "type": "uint256" }], "name": "swapExactETHForTokensSupportingFeeOnTransferTokens", "outputs": [], "stateMutability": "payable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "amountIn", "type": "uint256" }, { "internalType": "uint256", "name": "amountOutMin", "type": "uint256" }, { "internalType": "address[]", "name": "path", "type": "address[]" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "deadline", "type": "uint256" }], "name": "swapExactTokensForETH", "outputs": [{ "internalType": "uint256[]", "name": "amounts", "type": "uint256[]" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "amountIn", "type": "uint256" }, { "internalType": "uint256", "name": "amountOutMin", "type": "uint256" }, { "internalType": "address[]", "name": "path", "type": "address[]" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "deadline", "type": "uint256" }], "name": "swapExactTokensForETHSupportingFeeOnTransferTokens", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "amountIn", "type": "uint256" }, { "internalType": "uint256", "name": "amountOutMin", "type": "uint256" }, { "internalType": "address[]", "name": "path", "type": "address[]" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "deadline", "type": "uint256" }], "name": "swapExactTokensForTokens", "outputs": [{ "internalType": "uint256[]", "name": "amounts", "type": "uint256[]" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "amountIn", "type": "uint256" }, { "internalType": "uint256", "name": "amountOutMin", "type": "uint256" }, { "internalType": "address[]", "name": "path", "type": "address[]" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "deadline", "type": "uint256" }], "name": "swapExactTokensForTokensSupportingFeeOnTransferTokens", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "amountOut", "type": "uint256" }, { "internalType": "uint256", "name": "amountInMax", "type": "uint256" }, { "internalType": "address[]", "name": "path", "type": "address[]" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "deadline", "type": "uint256" }], "name": "swapTokensForExactETH", "outputs": [{ "internalType": "uint256[]", "name": "amounts", "type": "uint256[]" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "amountOut", "type": "uint256" }, { "internalType": "uint256", "name": "amountInMax", "type": "uint256" }, { "internalType": "address[]", "name": "path", "type": "address[]" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "deadline", "type": "uint256" }], "name": "swapTokensForExactTokens", "outputs": [{ "internalType": "uint256[]", "name": "amounts", "type": "uint256[]" }], "stateMutability": "nonpayable", "type": "function" }, { "stateMutability": "payable", "type": "receive" }];//main


const pancakeContract = new web3main.eth.Contract(pancakeAbi, pancakeRouter);

//example http://localhost:3001/txinfo/?txid=0x5dfe.....&net=1   net = 1 for mainnet 2 for test.
app.get("/txinfo", async (req, res) => {

  const requrl = req.url;
  console.log(requrl);

  var queryObject = url.parse(requrl, true);
  console.log(queryObject)
  console.log(queryObject.pathname)


  if (queryObject.pathname == "/txinfo/") {

    var queryobjectquery = queryObject.query;
    console.log(queryobjectquery);

    if (queryobjectquery) {

      var txid = 0;
      var network = 0;

      if (queryobjectquery.txid) {

        txid = queryobjectquery.txid;
        console.log(txid);

        if (txid.length == 66) {
        } else {
          res.write("txidlengthissue");
          res.end();
          return false;
        }

      } else {
        res.write("txidissue");
        res.end();
        return false;

      }

      if (queryobjectquery.net) {

        network = queryobjectquery.net;
        network = network.toString();
        console.log(network);

        if (network == "1" || network == "2") {

          if (network == 1) {
            web3 = web3main;
          } else if (network == 2) {
            web3 = web3test;
          }

        } else {
          res.write("netnumissue");
          res.end();
          return false;
        }

      } else {
        res.write("netissue");
        res.end();
        return false;
      }

      var txdetails = await getTx(txid);

      console.log(111);
      console.log(txdetails);
      if (txdetails == null) {
        res.write("txdetailissue");
        res.end();
        return false;
      }

      console.log(121);


      if (typeof (txdetails.input) != "undefined" || typeof (txdetails.input) != 'object') {

        var data = JSON.stringify({
          contract: txdetails.to,
          from: txdetails.from,
          value: txdetails.value,
          txstatus: txdetails.status
        })

        console.log(data);
        res.send(data);
        return false;



      } else {
        res.write("input not found");
        res.end();
        return false;
      }



    } else {
      res.write("urlqueryissue");
      res.end();
      return false;

    }

  }

  res.write("endtxinfo");
  res.end();
  return false;

});


const getTx = async (_getId) => {

  try {
    console.log(13);
    var meta = await web3.eth.getTransactionReceipt(_getId);
    console.log(meta);
    // return meta;

  } catch (err) {
    console.log(err);

  }

  try {

    if (meta == null) {

      return meta;

    }
    console.log(12 + "-" + _getId);
    var getTxInfo = await web3.eth.getTransaction(_getId);
    console.log(getTxInfo);

    console.log(getTxInfo.status = meta.status);

    return (getTxInfo);

  } catch (err) {
    console.log(err);
    return "error";
  }
}


////////////////token info
//http://localhost:3001/txinfotoken/?txid=0xb81ba87225ff8dcd715808426d4525956a5e1ba877d65696c09062d7fc6381bc&net=1

app.get("/txinfotoken", async (req, res) => {

  const requrl = req.url;
  console.log(requrl);

  var queryObject = url.parse(requrl, true);
  console.log(queryObject)
  console.log(queryObject.pathname)


  if (queryObject.pathname == "/txinfotoken/") {

    var queryobjectquery = queryObject.query;
    console.log(queryobjectquery);

    if (queryobjectquery) {

      var txid = 0;
      var network = 0;

      if (queryobjectquery.txid) {

        txid = queryobjectquery.txid;
        console.log(txid);

        if (txid.length == 66) {
        } else {
          res.write("txidtokenlengthissue");
          res.end();
          return false;
        }

      } else {
        res.write("txidtokenissue");
        res.end();
        return false;

      }

      if (queryobjectquery.net) {

        network = queryobjectquery.net;
        network = network.toString();
        console.log(network);

        if (network == "1" || network == "2") {

          if (network == 1) {
            web3 = web3main;
          } else if (network == 2) {
            web3 = web3test;
          }

        } else {
          res.write("nettokennumissue");
          res.end();
          return false;
        }

      } else {
        res.write("nettokenissue");
        res.end();
        return false;
      }

      var txdetails = await getTxToken(txid);

      console.log(111);
      console.log(txdetails);
      if (txdetails == null) {
        res.write("txtokendetailissue");
        res.end();
        return false;
      }

      console.log(1211);
      console.log(221);




      //just only for transfer function not sendtoall transfer
      if (typeof (txdetails.input) != "undefined" || typeof (txdetails.input) != 'object' || (txdetails.input).length > 2) {

        console.log(44);

        const erc20TransferABI = [
          {
            type: "address",
            name: "receiver",
          },
          {
            type: "uint256",
            name: "amount",
          },
        ];

        var meta = await web3.eth.abi.decodeParameters(
          erc20TransferABI,
          txdetails.input.slice(10)
        );
        console.log(55);
        console.log(meta);

        var data = JSON.stringify({
          contract: txdetails.to,
          from: txdetails.from,
          to: meta.receiver,
          toAmount: meta.amount,
          value: txdetails.value,
          status: txdetails.status
        })
        console.log(66);
        console.log(data);
        res.send(data);
        return false;



      } else {
        res.write("token input not found");
        res.end();
        return false;
      }



    } else {
      res.write("urlquerytokenissue");
      res.end();
      return false;

    }

  }

  res.write("endtxinfotoken");
  res.end();
  return false;

});


const getTxToken = async (_getId) => {

  try {
    console.log(13);
    var meta = await web3.eth.getTransactionReceipt(_getId);
    console.log(meta);
    console.log(1313);
    console.log(meta.logs);
    // return meta;

  } catch (err) {
    console.log(err);

  }

  try {

    if (meta == null) {

      return meta;

    }
    console.log(12 + "-" + _getId);
    var getTxInfo = await web3.eth.getTransaction(_getId);
    console.log(getTxInfo);

    console.log(getTxInfo.status = meta.status);

    return (getTxInfo);

  } catch (err) {
    console.log(err);
    return "error";
  }
}


/////////////////token info end


// http://localhost:3001/pricepancake/?adda=0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56&addb=0xCA1aCAB14e85F30996aC83c64fF93Ded7586977C
app.get("/pricepancake", async (req, res) => {


  const requrl = req.url;
  console.log(requrl);

  var queryObject = url.parse(requrl, true);
  console.log(queryObject)
  console.log(queryObject.pathname)


  if (queryObject.pathname == "/pricepancake/") {

    var queryobjectquery = queryObject.query;
    console.log(queryobjectquery);

    if (queryobjectquery) {

      var add1 = 0;
      var add2 = 0;

      if (queryobjectquery.adda && queryobjectquery.addb) {

        add1 = queryobjectquery.adda;
        console.log(add1);
        add2 = queryobjectquery.addb;
        console.log(add2);

        if (add1.length == 42) {
        } else {
          res.write("addalengthissue");
          res.end();
          return false;
        }

        if (add2.length == 42) {
        } else {
          res.write("addblengthissue");
          res.end();
          return false;
        }

      } else {
        res.write("addissue");
        res.end();
        return false;

      }

      var priceOnly = await getPricePancake(add1, add2);

      console.log(123);
      console.log(priceOnly);

      if (priceOnly == null) {
        res.write("priceOnlyissue");
        res.end();
        return false;
      }

      if (priceOnly[1] && priceOnly[1] > 0) {

       var valueether = await web3main.utils.fromWei(priceOnly[1], 'ether');



        var data = JSON.stringify({
          price: priceOnly[1],
          priceineth: valueether,
          currency: "1000000000000000000"
        })

        console.log(data);
        res.send(data);
        return false;
      }else{

        console.log(priceOnly[1]);
        res.write("pricepancakeissue");
        res.end();
        return false;
      }







      console.log("we3");


    }
  }
  res.write("endpricepancake");
  res.end();
  return false;

});


const getPricePancake = async (ad1, ad2) => {


  try {


    console.log(12 + "-" + ad1 + " -- " + ad2);

    let myArray = [ad1, ad2];

    var getTxInfo = await pancakeContract.methods.getAmountsOut("1000000000000000000", myArray).call()

    console.log(323);
    console.log(getTxInfo);

    return (getTxInfo);


  } catch (err) {
    console.log(err);
    return "error";
  }
}

app.get('/checkbep20ad', function (req, res) {
  
  web3 = web3main;
  const requrl = req.url;
  var queryObject = url.parse(requrl, true);
  var data = JSON.stringify({
    status: false
  });
  if (queryObject.pathname == "/checkbep20ad/") {
      queryObject = url.parse(req.url, true).query;
      if (queryObject.get) {
        var getA = queryObject.get;
        if(web3.utils.isAddress(getA)){          
          data = JSON.stringify({
            status: true,
            ad:web3.utils.toChecksumAddress(getA)
          });
        }
      }
  }
  res.status(200).send(data);
})


// app.enable('trust proxy')
// app.use((req, res, next) => {
//     return res.status(404).send("File not found");
//     req.secure ? next() : res.redirect('https://' + req.headers.host + req.url)
// })

app.get('/ajay', (req, res) =>{
  res.send("AjAy from Backend")
})

// app.listen(port);
app.listen(port, () => {
  console.log(`server running on ${port}`)
}) 