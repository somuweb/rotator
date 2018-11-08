var s=[
"http://moonbit.co.in/?ref=184f6026e9f6",
"http://fieldbitcoins.com/?ref=bfhzs0rf540357",
"http://tomygame.com/?ref=AlaaSaad",
"http://bonusbitcoin.co/?ref=35C152AA43D9",
"https://bitcoinker.com/?r=1Lctts6ZH4sSWQjgDq7UjC926dUccRGFwD",
"http://getyourbitco.in/488919",
"http://worldofbitco.in/187411",
"http://timeforbitco.in/313133",
"http://weatherx.co.in/229496",
"http://elenafaucets.com/freebitcoin01/?ref=1Lctts6ZH4sSWQjgDq7UjC926dUccRGFwD",
"http://elenafaucets.com/freebitcoin02/?ref=1Lctts6ZH4sSWQjgDq7UjC926dUccRGFwD",
"http://elenafaucets.com/freebitcoin03/?ref=1Lctts6ZH4sSWQjgDq7UjC926dUccRGFwD",
"http://elenafaucets.com/freebitcoin04/?ref=1Lctts6ZH4sSWQjgDq7UjC926dUccRGFwD",
];

var finfo=[
"Payment : Direct to your wallet\nType : Automatic / on Saturday or Sunday / no fee\nThreshold : 25,000 satioshi",
"Payment : Direct to your wallet\nType : Automatic / on Saturday or Sunday / no fee\nThreshold : 25,000 satioshi",
"Payment : Through FaucetHub\nType : Manual / instant / fees applied\nThreshold : 100 satioshi",
"Payment : Direct to your wallet\nType : Manual / within 48 hours / fees applied\nThreshold : 10,000 satioshi",
"Payment : Direct to your wallet\nType : Automatic / on Sunday / no fee\nThreshold : 20,000 satioshi",
"Payment : Through FaucetHub\nType : Manual / instant / no fee\nThreshold : 0 satioshi",
"Payment : Through FaucetHub\nType : Manual / instant / no fee\nThreshold : 0 satioshi",
"Payment : Through FaucetHub\nType : Manual / instant / no fee\nThreshold : 20,000 satioshi",
"Payment : Through FaucetHub\nType : Manual / instant / no fee\nThreshold : 10,000 satioshi",
"Payment : Through FaucetHub\nType : Manual / instant / no fee\nThreshold : 20,000 satioshi",
"Payment : Through FaucetHub\nType : Manual / instant / no fee\nThreshold : 20,000 satioshi",
"Payment : Through FaucetHub\nType : Manual / instant / no fee\nThreshold : 20,000 satioshi",
"Payment : Through FaucetHub\nType : Manual / instant / no fee\nThreshold : 20,000 satioshi",
]

var cursmb=[
"../images/USD_Symbol.png",
"../images/EUR_Symbol.png",
"../images/GBP_Symbol.png",
"../images/JPY_Symbol.png",
"../images/CAD_Symbol.png",
"../images/AUD_Symbol.png",
"../images/CNY_Symbol.png",
"../images/CHF_Symbol.png",
"../images/RUB_Symbol.png"
]

var claimtime=[
new Date(), 
new Date(),
new Date(),
new Date(),
new Date(),
new Date(),
new Date(),
new Date(),
new Date(),
new Date(),
new Date(),
new Date(),
new Date(),
];

var claimafter=[
1800,
1800,
1800,
900,
300,
300,
300,
300,
300,
300,
300,
300,
300,
];

var i=0,x=0,c=s.length,hh=0,mm=0,ss=0,currentTime="",myTimer;

function setSymbol(){
var i=0;
if (document.getElementById("curselect").value < 120){
i = document.getElementById("curselect").value-1;
} else {
i = 8;
}
document.getElementById("cursmb").src = cursmb[i];
}

function getavailable(){
var av=0;
var d1 = new Date();

for (i=0; i<c; i++) {
  if (claimtime[i].getTime()<=d1.getTime()){
    av=av+1;
  }
}
document.getElementById("avfaucets").innerHTML=av;
setTimeout(arguments.callee, 1000);
}

function getPrice(){
var url="https://bitpay.com/api/rates";
var request = new XMLHttpRequest();

request.open("GET", url, false);
request.setRequestHeader("Cache-Control", "no-cache");
request.send();
if (request.status >= 200 && request.status < 400){
    var data = JSON.parse(request.responseText);
    document.getElementById("btcprice").innerHTML=data[document.getElementById("curselect").value]["rate"].toFixed(2);
  } else {
    alert('Unable to get current Bitcoin price!\nPlease reload this page.');
  }
setTimeout(arguments.callee, 60000);
}

function selectAddress(){
document.querySelector("#btcadd").select();
}

function resetTimer(){
clearInterval(myTimer);
hh=0;
mm=0;
ss=0;
timer();
}

function timer(){
var hhh,mmm,sss;
myTimer=setInterval(function(){
if (ss<59){
  ss=ss+1;
} else {
  ss=0;
  if (mm<59){
    mm=mm+1;
  } else {
    mm=0;
    hh=hh+1;
         }
       }
if (hh<10){ hhh="0"+hh;} else { hhh=hh; }
if (mm<10){ mmm="0"+mm;} else { mmm=mm; }
if (ss<10){ sss="0"+ss;} else { sss=ss; }
currentTime=hhh+":"+mmm+":"+sss;
document.getElementById("rtimer").innerHTML=currentTime;
}, 1000);
}

function pendingposs(){
document.getElementById("startbt").disabled = false;
document.getElementById("reloadbt").disabled = true;
document.getElementById("nextbt").disabled = true;
document.getElementById("skipbt").disabled = true;
document.getElementById("info").title = "Faucet info";
document.getElementById("fm").src="";
}

function StartRotator(){
document.getElementById("startbt").disabled = true;
document.getElementById("reloadbt").disabled = false;
document.getElementById("nextbt").disabled = false;
document.getElementById("skipbt").disabled = false;
if (!SearchAvailableFaucet()){
  pendingposs();
  alert('There are no available faucets now!\nPlease try again later.');
} else {
    changeSrc();
}
}

function NextFaucet(){
SetNextClaimTime(0);
if (!SearchAvailableFaucet()){
  pendingposs();
  alert('There are no available faucets now!\nPlease try again later.');
} else {
    changeSrc();
}
}

function SkipFaucet(){
var sp = document.getElementById("skipselect").value * 60;
SetNextClaimTime(sp);
if (!SearchAvailableFaucet()){
    pendingposs();
    alert('There are no available faucets now!\nPlease try again later.');
} else {
    changeSrc();
}
}

function SetNextClaimTime(sspp){
var timeObject = new Date();
if (sspp>0){
    timeObject.setSeconds(timeObject.getSeconds() + sspp);
} else {
    timeObject.setSeconds(timeObject.getSeconds() + claimafter[x]);
}
claimtime[x]=timeObject;
}

function SearchAvailableFaucet(){
var d1 = new Date();

for (i=0; i<c; i++) {
  if (claimtime[i].getTime()<=d1.getTime()){
    x=i;
    return true;
    break;
  }
}
return false;
}

function changeSrc() {
document.getElementById("info").title = finfo[x];
document.getElementById("fm").src=s[x];
}