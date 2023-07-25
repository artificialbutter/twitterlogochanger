// Function to save the custom text in Chrome storage
function saveCustomImageURL() {
    const customText = document.getElementById("custom-text").value;
    document.getElementById("confirmation").style.display = "block";

    chrome.storage.sync.set({ customText });
    console.log("Custom text saved! " + customText)
}

document.getElementById("save-btn").addEventListener("click", saveCustomImageURL);
