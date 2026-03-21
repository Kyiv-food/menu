// ==================== МЕНЮ ====================
const menu = {
  pelmeni:[
    {n:"Пельмені (курка та свинина)",p:400,t:"кг"},
    {n:"Пельмені (свинина та телятина)",p:450,t:"кг"},
    {n:"Пельмені (яловичина)",p:450,t:"кг"},
    {n:"Ліниві вареники",p:200,t:"кг"},
    {n:"Вареники з капустою",p:200,t:"кг"},
    {n:"Вареники з картоплею",p:200,t:"кг"},
    {n:"Вареники з картоплею та грибами",p:200,t:"кг"},
    {n:"Вареники з вишнею",p:300,t:"кг"},
    {n:"Вареники з м’ясом",p:450,t:"кг"},
    {n:"Вареники з сиром",p:250,t:"кг"}
  ],
  zrazy:[
    {n:"Зраза з капустою",p:30,t:"шт"},
    {n:"Зраза з м’ясом",p:35,t:"шт"},
    {n:"Смажений мінтай",p:350,t:"кг"}
  ],
  kotlety:[
    {n:"Котлети зі свинини",p:400,t:"кг"},
    {n:"Котлети зі свинини та яловичини",p:450,t:"кг"},
    {n:"Котлети рибні",p:350,t:"кг"},
    {n:"Котлета по київськи",p:50,t:"шт"},
    {n:"Котлети з курятини",p:350,t:"кг"},
    {n:"Котлети зі свинини та курятини",p:450,t:"кг"}
  ],
  salaty:[
    {n:"Олів'є",p:350,t:"кг"},
    {n:"Вінегрет",p:250,t:"кг"},
    {n:"Крабовий",p:350,t:"кг"},
    {n:"Шуба",p:350,t:"кг"},
    {n:"Мемоза",p:350,t:"кг"},
    {n:"Цезарь",p:350,t:"кг"}
  ],
  golubci:[
    {n:"Голубці зі свининою",p:400,t:"кг"},
    {n:"Голубці з телятиною",p:450,t:"кг"},
    {n:"Перець фарширований",p:400,t:"кг"}
  ],
  tartaletky:[
    {n:"Тарталетки з жульєном",p:695,t:"650 г"},
    {n:"Тарталетки з червоною ікрою",p:1020,t:"450 г"},
    {n:"Тарталетки з сьомгою",p:1080,t:"600 г"},
    {n:"Печінковий торт",p:400,t:"кг"}
  ],
  chebureky:[
    {n:"Чебуреки з м’ясом",p:50,t:"шт"},
    {n:"Чебуреки з сиром",p:50,t:"шт"},
    {n:"Бендерики",p:350,t:"кг"}
  ],
  keksy:[
    {n:"Кекс з згущеного молока",p:400,t:"кг"},
    {n:"Кекс з родзинками",p:400,t:"кг"},
    {n:"Творожний кекс",p:450,t:"кг"}
  ],
  syrnyky:[
    {n:"Сирники з родзинками",p:310,t:"кг"},
    {n:"Сирники",p:300,t:"кг"},
    {n:"Запіканка",p:450,t:"кг"}
  ],
  mlynci:[
    {n:"Млинці з сиром",p:250,t:"кг"},
    {n:"Млинці з жульєном",p:300,t:"кг"},
    {n:"Млинці з сьомгою",p:350,t:"кг"},
    {n:"Млинці з куркою",p:300,t:"кг"},
    {n:"Млинці з свининою",p:300,t:"кг"},
    {n:"Млинці з печінкою",p:300,t:"кг"}
  ],
  deserty:[
    {n:"Наполеон",p:300,t:"кг"},
    {n:"Чізкейк",p:680,t:"кг"},
    {n:"Медовик",p:500,t:"кг"},
    {n:"Ангельські сльози",p:850,t:"кг"}
  ],
  pasky:[
    {n:"Пасха творожна",p:220,t:"550 г"},
    {n:"Пасха дріжджова",p:180,t:"550 г"},
    {n:"Пасха творожна",p:80,t:"120 г"}
  ]
};

// ==================== КОШИК ====================
const cart=[];
let sum=0;

function typeLabel(t){ if(t==="kg") return "кг"; if(t==="pcs") return "шт"; if(t==="pack") return "набір"; return ""; }
function stepValue(t){ if(t==="kg") return 0.5; if(t==="pcs") return 1; if(t==="pack") return 1; return 1; }

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

function clearCart(){ cart.length=0; sum=0; render(); }

// ==================== СТВОРЕННЯ КАРТОК ====================
const cards=document.querySelectorAll(".menu-card");

cards.forEach(card=>{
  let key=card.dataset.menu;
  let drop=document.createElement("div");
  drop.className="dropdown";

  menu[key].forEach(item=>{
    let row=document.createElement("div");
    row.className="item";

    let span=document.createElement("span");
    span.textContent = item.n + " - " + item.p + " грн" + (item.t ? " / " + item.t : "");

    let controls=document.createElement("div");
    let minus=document.createElement("button"); minus.textContent="-";
    let qty=document.createElement("span"); qty.textContent="1";
    let plus=document.createElement("button"); plus.textContent="+";
    let add=document.createElement("button"); add.textContent="🛒";
    let count=1;

    plus.onclick=e=>{ e.stopPropagation(); count+=stepValue(item.t); qty.textContent=count; };
    minus.onclick=e=>{ e.stopPropagation(); if(count>stepValue(item.t)){count-=stepValue(item.t); qty.textContent=count;} };
    add.onclick=e=>{
      e.stopPropagation();
      cart.push({ name:item.n, price:item.p, qty:count });
      sum+=item.p*count;
      render();
      document.querySelector(".cart").style.background="#d4ffd4";
      setTimeout(()=>{ document.querySelector(".cart").style.background="white"; },300);
    };

    controls.append(minus,qty,plus,add);
    row.append(span,controls);
    drop.append(row);
  });

  card.append(drop);
});

// ==================== Ховер / клік меню ====================
document.querySelectorAll(".menu-card").forEach(card=>{
  card.addEventListener("mouseenter",()=>{
    if(window.innerWidth>700){
      document.querySelectorAll(".menu-card").forEach(c=>c.classList.remove("open"));
      card.classList.add("open");
    }
  });
  card.addEventListener("mouseleave",()=>{ if(window.innerWidth>700) card.classList.remove("open"); });
  card.addEventListener("click",()=>{
    if(window.innerWidth<=700){
      if(card.classList.contains("open")) card.classList.remove("open");
      else{
        document.querySelectorAll(".menu-card").forEach(c=>c.classList.remove("open"));
        card.classList.add("open");
      }
    }
  });
});

// ==================== ОФОРМЛЕННЯ ЗАМОВЛЕННЯ ====================
const TOKEN="8635234132:AAGBzmT3hYi1MrguAz_anmQUclN_z32gmwQ";
const CHAT_ID="702168527";

function buildOrderText(){
  if(cart.length===0){ alert("Кошик пустий"); return null; }
  let text="Добрий день.%0AЗамовлення:%0A";
  cart.forEach(i=>{ text+=i.name+" x"+i.qty+"%0A"; });
  text+="Сума: "+sum+" грн";
  return text;
}

function openOrder(){
  if(cart.length===0){ alert("Кошик пустий"); return; }
  document.getElementById("orderPopup").style.display="flex";
  let list=""; cart.forEach(i=>{ list+=i.name+" x"+i.qty+"<br>"; });
  document.getElementById("orderList").innerHTML=list;
  document.getElementById("orderSum").textContent=sum;

  if(window.innerWidth<=700){
    const cartBox=document.querySelector(".cart");
    if(cartBox.classList.contains("open")){
      cartBox.style.height=cartBox.offsetHeight+"px";
      cartBox.offsetHeight;
      cartBox.style.transition="height 0.3s ease";
      cartBox.classList.remove("open");
      setTimeout(()=>{ cartBox.style.height="60px"; },10);
    }
  }
}

function closeOrder() {
  // Ховаємо popup замовлення
  document.getElementById("orderPopup").style.display = "none";

  if (window.innerWidth <= 700) {
    const cartBox = document.querySelector(".cart");

    // Прибираємо клас open і inline стилі
    cartBox.classList.remove("open");
    cartBox.style.transition = "";
    cartBox.style.height = "";

    // Відновлюємо елементи всередині кошика для мобільного
    const cartList = cartBox.querySelector("ul");
    const cartSum = cartBox.querySelector("p");
    const cartButtons = cartBox.querySelector(".buttons");

    if (cartList) cartList.style.display = "block";
    if (cartSum) cartSum.style.display = "block";
    if (cartButtons) cartButtons.style.display = "block";

    // Перемалювати список замовлення
    render();
  }
}

function checkPhone(){
  let phoneInput=document.getElementById("phone");
  let confirmBtn=document.getElementById("confirmBtn");
  confirmBtn.disabled=!(/^0\d{9}$/.test(phoneInput.value));
}

function confirmOrder(){
  let phoneInput=document.getElementById("phone");
  let text="Замовлення%0AТелефон: "+phoneInput.value+"%0A%0A";
  cart.forEach(i=>{ text+=i.name+" x"+i.qty+"%0A"; });
  text+="%0AСума: "+sum+" грн";
  fetch("https://api.telegram.org/bot"+TOKEN+"/sendMessage?chat_id="+CHAT_ID+"&text="+text);
  document.getElementById("okMsg").textContent="Ваше замовлення прийнято";
  cart.length=0; sum=0; render();
}

const confirmBtn=document.getElementById("confirmBtn");
if(confirmBtn) confirmBtn.onclick=confirmOrder;

// ==================== МІНІ КОШИК МОВІЛ ====================
window.addEventListener("load", function(){
  const cartBox=document.querySelector(".cart");
  if(!cartBox) return;
  cartBox.addEventListener("click", function(e){
    if(window.innerWidth>700) return;
    if(["BUTTON","A","INPUT"].includes(e.target.tagName)) return;
    cartBox.classList.toggle("open");
  });
});

// ==================== ДОСТАВКА І ОПЛАТА ====================
function openDelivery(){
  const popup=document.getElementById("deliveryPopup");
  popup.style.display="flex";
  if(window.innerWidth<=700){
    const cartBox=document.querySelector(".cart");
    cartBox.style.height=cartBox.offsetHeight+"px";
    cartBox.offsetHeight;
    cartBox.style.transition="height 0.3s ease";
    cartBox.classList.remove("open");
    setTimeout(()=>{ cartBox.style.height="60px"; },10);
  }
}

function closeDelivery(){
  document.getElementById("deliveryPopup").style.display="none";
  if(window.innerWidth<=700){
    const cartBox=document.querySelector(".cart");
    cartBox.style.transition="";
    cartBox.style.height="";
    cartBox.classList.remove("open");
  }
}

const deliveryBtn=document.getElementById("deliveryBtn");
if(deliveryBtn) deliveryBtn.onclick=openDelivery;