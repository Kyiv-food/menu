const menu = {

pelmeni:[
{n:"Пельмені (курка та свинина)",p:400,t:"kg"},
{n:"Пельмені (свинина та телятина)",p:450,t:"kg"},
{n:"Пельмені (яловичина)",p:430,t:"kg"},
{n:"Ліниві вареники",p:150,t:"kg"},
{n:"Вареники з капустою",p:150,t:"kg"},
{n:"Вареники з картоплею",p:150,t:"kg"},
{n:"Вареники з картоплею та грибами",p:200,t:"kg"},
{n:"Вареники з вишнею",p:300,t:"kg"},
{n:"Вареники з м’ясом",p:450,t:"kg"},
{n:"Вареники з сиром",p:250,t:"kg"}
],

zrazy:[
{n:"Зраза з капустою",p:30,t:"pcs"},
{n:"Зраза з м’ясом",p:35,t:"pcs"},
{n:"Смажений мінтай",p:350,t:"kg"}
],

kotlety:[
{n:"Котлети зі свинини",p:400,t:"kg"},
{n:"Котлети зі свинини та яловичини",p:450,t:"kg"},
{n:"Котлета рибна",p:350,t:"kg"},
{n:"Котлета по київськи",p:50,t:"pcs"},
{n:"Котлети з курятини",p:350,t:"kg"},
{n:"Котлети зі свинини та курятини",p:450,t:"kg"}
],

salaty:[
{n:"Олів'є",p:350,t:"kg"},
{n:"Вінегрет",p:250,t:"kg"},
{n:"Крабовий",p:350,t:"kg"},
{n:"Шуба",p:350,t:"kg"},
{n:"Мемоза",p:350,t:"kg"},
{n:"Цезарь",p:350,t:"kg"}
],

golubci:[
{n:"Голубці зі свининою",p:400,t:"kg"},
{n:"Голубці з телятиною",p:450,t:"kg"},
{n:"Перець фарширований",p:400,t:"kg"}
],

tartaletky:[
{n:"Тарталетки жульєн",p:695,t:"pack"},
{n:"Тарталетки ікра",p:1020,t:"pack"},
{n:"Тарталетки сьомга",p:1080,t:"pack"},
{n:"Печінковий торт",p:400,t:"kg"}
],

chebureky:[
{n:"Чебуреки м’ясо",p:50,t:"pcs"},
{n:"Чебуреки сир",p:50,t:"pcs"},
{n:"Бендерики",p:350,t:"kg"}
],

keksy:[
{n:"Кекс згущене",p:400,t:"kg"},
{n:"Кекси родзинки",p:400,t:"kg"},
{n:"Творожні кекси",p:450,t:"kg"}
],

syrnyky:[
{n:"Сирники родзинки",p:310,t:"kg"},
{n:"Сирники",p:300,t:"kg"},
{n:"Запіканка",p:450,t:"kg"}
],

mlynci:[
{n:"Млинці сир",p:250,t:"kg"},
{n:"Млинці жульєн",p:300,t:"kg"},
{n:"Млинці сьомга",p:350,t:"kg"},
{n:"Млинці курка",p:300,t:"kg"},
{n:"Млинці свинина",p:300,t:"kg"},
{n:"Млинці печінка",p:300,t:"kg"}
],

deserty:[
{n:"Наполеон",p:300,t:"kg"},
{n:"Чізкейк",p:680,t:"kg"},
{n:"Медовик",p:500,t:"kg"},
{n:"Ангельські сльози",p:850,t:"kg"},
{n:"Паска 500г",p:180,t:"pack"},
{n:"Паска 120г",p:110,t:"pack"},
{n:"Паска 550г",p:150,t:"pack"},
{n:"Червоний бархат",p:130,t:"pack"}
]

};


const cart=[];
let sum=0;


function typeLabel(t){

if(t==="kg") return "кг";
if(t==="pcs") return "шт";
if(t==="pack") return "набір";

return "";

}

function stepValue(t){

if(t==="kg") return 0.5;
if(t==="pcs") return 1;
if(t==="pack") return 1;

return 1;

}

function render(){

const ul=document.getElementById("cart");

ul.innerHTML="";

cart.forEach(i=>{

let li=document.createElement("li");

li.textContent=i.name+" x"+i.qty;

ul.appendChild(li);

});

document.getElementById("sum").textContent=sum;
document.getElementById("count").textContent=cart.length;

}

function clearCart(){
cart.length=0;
sum=0;
render();
}



const cards=document.querySelectorAll(".menu-card");

cards.forEach(card=>{

let key=card.dataset.menu;

let drop=document.createElement("div");

drop.className="dropdown";

menu[key].forEach(item=>{

let row=document.createElement("div");

row.className="item";

let span=document.createElement("span");

span.textContent=item.n+" - "+item.p+" грн / "+typeLabel(item.t);

let controls=document.createElement("div");

let minus=document.createElement("button");
minus.textContent="-";

let qty=document.createElement("span");
qty.textContent="1";

let plus=document.createElement("button");
plus.textContent="+";

let add=document.createElement("button");
add.textContent="🛒";

let count=1;

plus.onclick=e=>{
e.stopPropagation();
count+=stepValue(item.t);
qty.textContent=count;
};

minus.onclick=e=>{
e.stopPropagation();
if(count>stepValue(item.t)){
count-=stepValue(item.t);
qty.textContent=count;
}
};

add.onclick=e=>{
e.stopPropagation();

cart.push({
name:item.n,
price:item.p,
qty:count
});

sum+=item.p*count;

render();

document.querySelector(".cart").style.background="#d4ffd4";

setTimeout(()=>{
document.querySelector(".cart").style.background="white";
},300);

};

controls.append(minus,qty,plus,add);

row.append(span,controls);

drop.append(row);

});

card.append(drop);

});



document.querySelectorAll(".menu-card").forEach(card=>{

// ПК — при наведенні
card.addEventListener("mouseenter",()=>{

if(window.innerWidth > 700){

document.querySelectorAll(".menu-card").forEach(c=>{
c.classList.remove("open");
});

card.classList.add("open");

}

});

// ПК — прибрали мишу → закрити
card.addEventListener("mouseleave",()=>{

if(window.innerWidth > 700){
card.classList.remove("open");
}

});


// Мобільний — по кліку
card.addEventListener("click",()=>{

if(window.innerWidth <= 700){

if(card.classList.contains("open")){
card.classList.remove("open");
}else{

document.querySelectorAll(".menu-card").forEach(c=>{
c.classList.remove("open");
});

card.classList.add("open");

}

}

});

});



function buildOrderText(){

if(cart.length===0){
alert("Кошик пустий");
return null;
}

let text="Добрий день.%0AЗамовлення:%0A";

cart.forEach(i=>{
text+=i.name+" x"+i.qty+"%0A";
});

text+="Сума: "+sum+" грн";

return text;

}


function orderViber(){

let phone="380634095249";

let text=buildOrderText();

if(!text) return;

// відкриває додаток Viber
window.location.href =
"viber://chat?number=%2B"+phone+"&text="+text;

}


function orderTelegram(){

let text=buildOrderText();

if(!text) return;

// відкриває додаток Telegram
window.location.href =
"tg://msg?text="+text;

}

const TOKEN="8635234132:AAGBzmT3hYi1MrguAz_anmQUclN_z32gmwQ";

const CHAT_ID="702168527";

function openOrder(){

if(cart.length===0){
alert("Кошик пустий");
return;
}

document.getElementById("orderPopup").style.display="flex";

let list="";

cart.forEach(i=>{
list+=i.name+" x"+i.qty+"<br>";
});

document.getElementById("orderList").innerHTML=list;

document.getElementById("orderSum").textContent=sum;

}



function closeOrder(){

document.getElementById("orderPopup").style.display="none";

}



const phoneInput=document.getElementById("phone");

const confirmBtn=document.getElementById("confirmBtn");

phoneInput.oninput=()=>{

let v=phoneInput.value;

if(/^0\d{9}$/.test(v)){
confirmBtn.disabled=false;
}else{
confirmBtn.disabled=true;
}

};



confirmBtn.onclick=()=>{

let text="Замовлення%0A";

text+="Телефон: "+phoneInput.value+"%0A%0A";

cart.forEach(i=>{
text+=i.name+" x"+i.qty+"%0A";
});

text+="%0AСума: "+sum+" грн";


fetch(
"https://api.telegram.org/bot"+TOKEN+
"/sendMessage?chat_id="+CHAT_ID+
"&text="+text
);

document.getElementById("okMsg").textContent=
"Ваше замовлення прийнято";

cart.length=0;
sum=0;
render();

};