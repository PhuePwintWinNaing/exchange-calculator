let input = document.getElementById("input");
let from = document.getElementById("from");
let to = document.getElementById("to");
let result = document.getElementById("result");
let historyList = document.getElementById("historyList");

function createOption(x,y,z){
    let o = document.createElement("option");
    let t = document.createTextNode(y);
    o.appendChild(t);
    x.appendChild(o);
    o.setAttribute("value",toNum(z));
}

function toNum(x){
    return Number(x.replace(",",""));
}

for(x in data.rates){
    createOption(from,x,data.rates[x]);
    createOption(to,x,data.rates[x]);
    // console.log(x,data.rates[x]);
}

function createTr(x){
    let rowSpacer = document.getElementById("rowSpacer");
    if(rowSpacer){
        rowSpacer.remove();
    }
    let tr = document.createElement("tr");
    x.map(function(el){
        let td = document.createElement("td");
        let text = document.createTextNode(el);
        td.appendChild(text);
        tr.appendChild(td);
    })
   historyList.appendChild(tr);
}

function store(){
    localStorage.setItem("record",historyList.innerHTML);
}

document.getElementById("calc").addEventListener("submit",function(e){
    e.preventDefault();
    // get state
    let x = input.value;
    let y = from.value;
    let z = to.value;
    console.log(x,y,z);

    //process state
    let fromText = x +" "+ from.options[from.selectedIndex].innerText;
    let toText = to.options[to.selectedIndex].innerText;
    let first = x*y;
    console.log(first);
    let second = first/z;
    let resultNum = second.toFixed(2);
    console.log(second.toFixed(2));
    let date = new Date().toLocaleString();
    let arr = [date,fromText,toText,resultNum];
    createTr(arr);
    store();

    //set state
    result.innerHTML = resultNum;
    input.value="";
    input.focus();
    from.value="";
    to.value="1";//MMK  
});

(function(){
    if(localStorage.getItem("record")){
        historyList.innerHTML = localStorage.getItem("record");
    }else{
        historyList.innerHTML = 
        `<tr id="rowSpacer">
            <td colspan="4">There is no record</td>
         </tr>
        `
    }
})();

function test(){
    console.log(from.options[from.selectedIndex].innerText);
}