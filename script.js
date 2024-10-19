let price = 19.5;
let cid = [
  ['PENNY', 0.5],
  ['NICKEL', 0 ],
  ['DIME', 0],
  ['QUARTER', 0],
  ['ONE', 0],
  ['FIVE', 0],
  ['TEN', 0],
  ['TWENTY', 0],
  ['ONE HUNDRED', 0]
];


const cash = document.getElementById("cash");
const purchaseBtn = document.getElementById("purchase-btn");
const changeDue = document.getElementById("change-due");
const availableChange = document.getElementById("available-change");
const priceText = document.getElementById("price");

priceText.innerText = `Price: ${price}`;

cid.forEach(change => {
    availableChange.innerHTML += `<p>${change[0]}: $${change[1]}</p>`
})

const pennyChange = (change) => {
    let changeUsed = 0;
    while (change.toFixed(2) > 0 && cid[0][1] > 0) {
        cid[0][1] -= 0.01;
        change -= 0.01;
        changeUsed += 0.01;
    }
    if (changeUsed > 0) {
        changeDue.innerHTML += `<p>PENNY: $${changeUsed.toFixed(2)}</p>`
    }
    return change;
}

const nickelChange = (change) => {
    let changeUsed = 0;
    while (change.toFixed(2) >= 0.05 && cid[1][1] > 0) {
        cid[1][1] -= 0.05;
        change -= 0.05;
        changeUsed += 0.05;
    }
    if (changeUsed > 0) {
        changeDue.innerHTML += `<p>NICKEL: $${changeUsed.toFixed(2)}</p>`
    }
    return change;
}

const dimeChange = (change) => {
    let changeUsed = 0;
    while (change.toFixed(2) >= 0.10 && cid[2][1] > 0) {
        cid[2][1] -= 0.10;
        change -= 0.10;
        changeUsed += 0.10;
    }
    if (changeUsed > 0) {
        changeDue.innerHTML += `<p>DIME: $${changeUsed.toFixed(2)}</p>`
    }
    return change;
}

const quarterChange = (change) => {
    let changeUsed = 0;
    while (change.toFixed(2) >= 0.25 && cid[3][1] > 0) {
        cid[3][1] -= 0.25;
        change -= 0.25;
        changeUsed += 0.25;
    }
    if (changeUsed > 0) {
        changeDue.innerHTML += `<p>QUARTER: $${changeUsed.toFixed(2)}</p>`
    }
    return change;
}

const oneChange = (change) => {
    let changeUsed = 0;
    while (change.toFixed(2) >= 1.00 && cid[4][1] > 0) {
        cid[4][1] -= 1.00;
        change -= 1.00;
        changeUsed += 1.00;
    }
    if (changeUsed > 0) {
        changeDue.innerHTML += `<p>ONE: $${changeUsed.toFixed(2)}</p>`
    }
    return change;
}

const fiveChange = (change) => {
    let changeUsed = 0;
    while (change.toFixed(2) >= 5.00 && cid[5][1] > 0) {
        cid[5][1] -= 5.00;
        change -= 5.00;
        changeUsed += 5.00;
    }
    if (changeUsed > 0) {
        changeDue.innerHTML += `<p>FIVE: $${changeUsed.toFixed(2)}</p>`
    }
    return change;
}

const tenChange = (change) => {
    let changeUsed = 0;
    while (change.toFixed(2) >= 10.00 && cid[6][1] > 0) {
        cid[6][1] -= 10.00;
        change -= 10.00;
        changeUsed += 10.00;
    }
    if (changeUsed > 0) {
        changeDue.innerHTML += `<p>TEN: $${changeUsed.toFixed(2)}</p>`
    }
    return change;
}

const twentyChange = (change) => {
    let changeUsed = 0;
    while (change.toFixed(2) >= 20.00 && cid[7][1] > 0) {
        cid[7][1] -= 20.00;
        change -= 20.00;
        changeUsed += 20.00;
    }
    if (changeUsed > 0) {
        changeDue.innerHTML += `<p>TWENTY: $${changeUsed.toFixed(2)}</p>`
    }
    return change;
}

const hundredChange = (change) => {
    let changeUsed = 0;
    while (change.toFixed(2) >= 100.00 && cid[8][1] > 0) {
        cid[8][1] -= 100.00;
        change -= 100.00;
        changeUsed += 100.00;
    }
    if (changeUsed > 0) {
        changeDue.innerHTML += `<p>HUNDRED: $${changeUsed.toFixed(2)}</p>`
    }
    return change;
}

const calculateChange = (cash) => {
    let change = cash - price;
    let finalChange = pennyChange(nickelChange(dimeChange(quarterChange(oneChange(fiveChange(tenChange(twentyChange(hundredChange(change)))))))));
    if (finalChange.toFixed(2) == 0.00) {
        const statusText = document.createElement("p");
        if (cid.every(change => change[1].toFixed(2) == 0)) {
            statusText.textContent = "Status: CLOSED";
        } else {
            statusText.textContent = "Status: OPEN";
        }     
        changeDue.insertBefore(statusText, changeDue.firstChild);
    } else if (finalChange.toFixed(2) > 0.00) {
        const statusText = document.createElement("p");
        changeDue.innerHTML = "<p>Status: INSUFFICIENT_FUNDS</p>"
    }
}



purchaseBtn.addEventListener("click", () => {
    changeDue.innerHTML = ""
    let cashNum = Number(cash.value);
    if (cashNum < price) {
        alert("Customer does not have enough money to purchase the item")
    } else if (cashNum === price) {
        changeDue.style.display = "block";
        changeDue.innerText = "No change due - customer paid with exact cash"
    } else {
        calculateChange(cashNum);
    }
    
    availableChange.innerHTML = ""
    cid.forEach(change => {
        availableChange.innerHTML += `<p>${change[0]}: $${change[1].toFixed(2)}</p>`
    })
})