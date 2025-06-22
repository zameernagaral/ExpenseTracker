document.addEventListener("DOMContentLoaded", function () {

    //reload the page to the top
    window.scrollTo(0, 0);
    let username = new URLSearchParams(window.location.search).get("username");
    let today = new Date();
    let today1 = today.toLocaleDateString("sv-SE", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit"
    });
    let arrowIconL = document.querySelector(".arrowIconL");
    let arrowIconR = document.querySelector(".arrowIconR");
    let addIcon = document.querySelector(".addIcon");
    


    let dateContent = document.querySelector(".date");
    let record = localStorage.getItem('record') ? JSON.parse(localStorage.getItem('record')) : [];

    let recordList = document.querySelector(".recordList");
    let expense = document.querySelector(".expense");
    let income = document.querySelector(".income");
    let total = document.querySelector(".total");
    let balanceTotal = document.querySelector(".balanceTotal");
    let rupees = document.querySelector(".rupees");
    let about = document.querySelector(".about");
    let categoryData = localStorage.getItem('categoryData') || [];
    let accountData = localStorage.getItem('accountData') || [];
    if (categoryData.length === 0) {
       const newCategory = {
        username: username,
           items: ["Food", "Groceries", "Clothes", "Entertainment", "Transport", "Health"]
       
       } 
       categoryData.push(newCategory);
        localStorage.setItem('categoryData', JSON.stringify(categoryData));
    }
    if (accountData.length === 0) {
       const newAccount = {
        username: username,
           items: ["Bank", "Cash", "Credit"]
       
       } 
       accountData.push(newAccount);
        localStorage.setItem('accountData', JSON.stringify(accountData));
    }




    dateContent.textContent = today.toLocaleDateString("sv-SE", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit"
    });

    let recordFind1 = record.find((item) => item.username === username && item.date === dateContent.textContent);


    // Example of working with an HTML date input
    // const dateInput = document.querySelector('#dateInput');
    // dateInput.addEventListener('change', (event) => {
    //     const dateValue = event.target.value; // Gets the value as a string (e.g., "2025-05-21")
    //     const dateObject = new Date(dateValue); // Converts the string to a Date object
    //     console.log(dateObject); // Outputs: Wed May 21 2025 00:00:00 GMT+0000 (UTC)
    // });

    function renderRecord(today1) {
        console.log(today1);
        recordList.innerHTML = "";


        let recordFind = record.find((item) => item.username === username && item.date === today1);
        let Logo = document.querySelector(".Logo");
        Logo.addEventListener("click", () => {
            window.location.href = `indexM.html?username=${username}`;
        })


        if (recordFind) {


            if (recordFind.username === null) {
                window.location.href = "unauthorized.html";
            }
            recordList.innerHTML = `
        <tr>
                        <th>SR.NO</th>
                        <th>Category</th>
                        <th>Account</th>
                        <th>Amount</th>
                        <th>Type</th>
                        <th></th>
                    </tr>`;

            for (let i = 0; i < recordFind.type.length; i++) {
                let tr = document.createElement("tr");
                let td = document.createElement("td");
                let td2 = document.createElement("td");
                let td3 = document.createElement("td");
                let td4 = document.createElement("td");
                let td5 = document.createElement("td");
                let td6 = document.createElement("td");

                let div = document.createElement("div");
                td3.classList.add("account");
                div.innerHTML = `
            <button class="editBtn" onclick="window.location.href='editRecord.html?username=${username}&index=${i}&date=${recordFind.date}'">Edit</button>
            <button class="deleteBtn">Delete</button>
            `;

                td.textContent = i + 1;


                td2.textContent = recordFind.category[i];
                td3.textContent = recordFind.account[i];
                td4.textContent = recordFind.amount[i];
                td5.textContent = recordFind.type[i];
                td6.appendChild(div);
                tr.appendChild(td);
                tr.appendChild(td2);
                tr.appendChild(td3);
                tr.appendChild(td4);
                tr.appendChild(td5);
                tr.appendChild(td6);
                div.style.display = "inline";
                recordList.appendChild(tr);
                let account = document.querySelectorAll(".account");
                account.forEach((btn, index) => {

                    btn.addEventListener("click", () => {

                        let td7 = document.createElement("td");
                        if (recordFind.description[index] === "") {

                        } else {

                            td7.textContent = recordFind.description[index];
                            tr.appendChild(td7);
                            setTimeout(() => {
                                td7.textContent = "";

                            }, 3000)
                        }

                    });
                })
            }

        }

        else {
            const newRecord = {
                username: username,
                date: today.toLocaleDateString("sv-SE", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit"
                }),
                type: [],
                account: [],
                category: [],
                description: [],
                amount: []
            }
            record.push(newRecord);
            localStorage.setItem('record', JSON.stringify(record));
            renderRecord(today1);

        }


    }
    renderRecord(today1);

    console.log(typeof dateContent.textContent);
    arrowIconL.addEventListener("click", function () {
        today.setDate(today.getDate() - 1);
        dateContent.textContent = today.toLocaleDateString("sv-SE", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit"
        })

        renderRecord(today.toLocaleDateString("sv-SE", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit"
        }));

        expensef(today.toLocaleDateString("sv-SE", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit"
        }))
        incomef(today.toLocaleDateString("sv-SE", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit"
        }))
        totalf(today.toLocaleDateString("sv-SE", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit"
        }))
    });
    arrowIconR.addEventListener("click", function () {
        today.setDate(today.getDate() + 1);
        dateContent.textContent = today.toLocaleDateString("sv-SE", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit"
        })

        renderRecord(today.toLocaleDateString("sv-SE", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit"
        }));

        expensef(today.toLocaleDateString("sv-SE", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit"
        }))
        incomef(today.toLocaleDateString("sv-SE", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit"
        }))
        totalf(today.toLocaleDateString("sv-SE", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit"
        }))
    });

    let deleteBtn = document.querySelectorAll(".deleteBtn");
    deleteBtn.forEach((btn, index) => {
        btn.addEventListener("click", () => {
            recordFind1.type.splice(index, 1);
            recordFind1.account.splice(index, 1);
            recordFind1.category.splice(index, 1);
            recordFind1.description.splice(index, 1);
            recordFind1.amount.splice(index, 1);
            localStorage.setItem('record', JSON.stringify(record));
            window.location.reload();
        });
    });


    addIcon.addEventListener("click", () => {
        window.location.href = `addRecord.html?username=${username}&date=${dateContent.textContent}`;
    })


    function expensef(date) {
        let expenses = 0;
        let recordFind2 = record.find((item) => item.username === username && item.date === date);
        for (let i = 0; i < recordFind2.type.length; i++) {
            if (recordFind2.type[i] === "expense") {
                let num = Number(recordFind2.amount[i]);
                expenses+= num;
                
            }
        }
        expense.textContent = expenses;
        
        
        
        
    }
    expensef(today1);

    function incomef(date) {
        let incomes = 0;
        let recordFind2 = record.find((item) => item.username === username && item.date === date);
        for (let i = 0; i < recordFind2.type.length; i++) {
            if (recordFind2.type[i] === "income") {
                let num = Number(recordFind2.amount[i]);
                incomes += num;
                
            }
        }
        income.textContent = incomes;
        
        
        
        
    }
    incomef(today1);

    function totalf() {
        total.textContent =  Number(income.textContent) - Number(expense.textContent);
        
        
    }
    totalf();
    if (total.textContent < 0) {
        total.style.color = "red";
        balanceTotal.style.color = "red";
        rupees.style.color = "red";

        
    } else {
        total.style.color = "green";
        balanceTotal.style.color = "green";
        rupees.style.color = "green";
        
    }


    about.addEventListener("click", () => {
        window.location.href = `aboutUs.html?username=${username}`;
    })
    let records = document.querySelector(".records");
    records.classList.add("active");
    records.addEventListener("click", () => {
        window.location.href = `indexM.html?username=${username}`;
    })
    let accounts = document.querySelector(".accounts");
    accounts.addEventListener("click", () => {
        window.location.href = `account.html?username=${username}`;
    })
    let categories = document.querySelector(".categories");
    categories.addEventListener("click", () => {
        window.location.href = `category.html?username=${username}`;
    })
    let settings = document.querySelector(".settings");
    settings.addEventListener("click", () => {
        window.location.href = `settings.html?username=${username}`;
    })
    let privacyPolicy = document.querySelector(".privacyPolicy");
    privacyPolicy.addEventListener("click", () => {
        window.location.href = `privacy.html?username=${username}`;
    })
    let terms = document.querySelector(".terms");
    terms.addEventListener("click", () => {
        window.location.href = `terms.html?username=${username}`;
    })
    if (localStorage.getItem("darkMode") === "on") {
        document.body.classList.add("dark");
    }
    else {
        document.body.classList.remove("dark");
    }
});