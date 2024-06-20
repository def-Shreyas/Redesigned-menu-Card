function shareOnEmail(peopleCount, comments, menuIds, menuTitles, selectedItems) {
    let emailContent = "New Order Received\n\n";
    emailContent += `People Count: ${peopleCount}\n\n`;
    emailContent += `Suggestions: ${comments}\n\n`;

    selectedItems.forEach((items, index) => {
        emailContent += `\n${menuTitles[index]}: \n${items.join('\n')}\n\n`;
    });

    let recipientEmail = 'shreyasmoolya2003@gmail.com'; // Replace with the recipient's email address
    let subject = 'New Order Received';

    let mailtoLink = `mailto:${recipientEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailContent)}`;
    window.location.href = mailtoLink;
}



function submitOrder() {
    let peopleCount = document.getElementById("people").value;
    let comments = document.getElementById("comments").value;
    let menuIds = ["lunch", "additional", "evening", "hightea", "starters", "dinner"]
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

    let emailButton = document.getElementById("whatsapp-btn");
    if (emailButton) {
        emailButton.onclick = function () {
            shareOnEmail(peopleCount, comments, menuIds, menuTitles, selectedItems);
        };
    } else {
        console.error("Button with ID 'email-btn' not found.");
    }
}

function getSelectedItems(selector) {
    let items = document.querySelectorAll(selector);
    return Array.from(items).map(item => item.nextElementSibling.textContent);
}