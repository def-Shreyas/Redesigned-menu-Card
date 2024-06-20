function shareOnWhatsApp(peopleCount, comments, menuIds, menuTitles, selectedItems) {
    let content = "New Order Received\n\n";
    content += `People Count:${peopleCount}\n\n`;
    content += `Suggestions:${comments}\n\n`;

    selectedItems.forEach((items, index) => {
        content += `\n${menuTitles[index]}: \n${items.join('\n')}\n\n`;
    });

    let whatsappUrl = "whatsapp://send?text=" + encodeURIComponent(content);
    window.location.href = whatsappUrl;
    alert("Extra items chargeable");
}



function submitOrder() {
    let peopleCount = document.getElementById("people").value;
    let comments = document.getElementById("comments").value;
    let menuIds = ["lunch", "additional", "evening", "hightea", "starters", "dinner"];
    let menuTitles = menuIds.map(id => document.getElementById(id).textContent);
    let selectedItems = menuIds.map(id => getSelectedItems(`#${id}menu input:checked`));

    console.log('People Count: ', peopleCount);
    console.log('Suggestions: ', comments);
    console.log('Selected Items:', selectedItems);

    for (let i = 0; i < menuIds.length; i++) {
        if (!selectedItems[i] || selectedItems[i].length === 0) {
            console.error(`Selected items for ${menuTitles[i]} is empty or undefined.`);
            // You might want to handle this error case gracefully.
        }
    }

    let whatsappButton = document.getElementById("whatsapp-btn");
    if (whatsappButton) {
        whatsappButton.addEventListener("click", () => {
            shareOnWhatsApp(peopleCount, comments, menuIds, menuTitles, selectedItems);
        });
    } else {
        console.error("Button with ID 'whatsapp-btn' not found.");
    }
}


function getSelectedItems(selector) {
    let items = document.querySelectorAll(selector);
    return Array.from(items).map(item => item.nextElementSibling.textContent);
}