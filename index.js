let myLeads = []
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")
const leadsFromLocalStorage = JSON.parse( localStorage.getItem("myLeads") )
const tabBtn = document.getElementById("tab-btn")

if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage
    render(myLeads)
}

tabBtn.addEventListener("click", function(){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        saveLead(tabs[0].url)    
    })

})
function saveLead(lead){
    myLeads.push(lead)
    localStorage.setItem("myLeads", JSON.stringify(myLeads) )
    render()
}

function render(arrayList) {
    let listItems = ""
    for (let i = 0; i < arrayList.length; i++) {
        listItems += `
            <li>
                <a target='_blank' href='${arrayList[i]}'>
                    ${arrayList[i]}
                </a>
            </li>
        `
    }
    ulEl.innerHTML = listItems
}

deleteBtn.addEventListener("dblclick", function() {
    localStorage.clear()
    myLeads = []
    render()
})

inputBtn.addEventListener("click", function() {
    saveLead(inputEl.value)
    inputEl.value = ""

})