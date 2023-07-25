var text;

chrome.storage.sync.get(["customText"], (result) => {
    text = result.customText || "change me!\nclick on the custom text button in your extensions list!";
    console.log("Custom text loaded! " + result.customText);
});


// load at first time
let done_first_load = false;

// Function to set the text in the div
function setFace() {
    const anchor = document.querySelector('a[aria-label="Twitter"][href="/home"]');
    if (anchor) {
        const div = anchor.querySelector('div');
        if (div) {
            if (!done_first_load) {
                done_first_load = true;
            }

            // Update the div's innerHTML with the text
            div.innerHTML = text;
        }
    }
}

// MutationObserver callback function
const observerCallback = function (mutationsList) {
    if (!done_first_load) {
        setFace();
    } else {
        for (const mutation of mutationsList) {
            if (mutation.type === 'childList') {
                for (const addedNode of mutation.addedNodes) {
                    if (addedNode.nodeType === Node.ELEMENT_NODE && addedNode.tagName === 'A') {
                        const anchor = addedNode;
                        if (anchor.getAttribute('aria-label') === 'Twitter' && anchor.getAttribute('href') === '/home') {
                            setFace();
                        }
                    }
                }
            }
        }
    }
};

// Create a new MutationObserver instance
const observer = new MutationObserver(observerCallback);

// Start the observer on the document body, and only observe anchor elements and their descendants
observer.observe(document.body, { childList: true, subtree: true });