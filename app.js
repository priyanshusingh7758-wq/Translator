// Switch sections
function showSection(sectionId) {
    document.querySelectorAll('.section').forEach(sec => {
        sec.classList.remove('active');
    });

    document.getElementById(sectionId).classList.add('active');
}

// Save API settings
function saveSettings() {
    const key = document.getElementById("apiKey").value;
    const region = document.getElementById("region").value;

    localStorage.setItem("azureKey", key);
    localStorage.setItem("azureRegion", region);

    alert("Settings Saved ✅");
}

// Load settings on start
window.onload = function () {
    document.getElementById("apiKey").value =
        localStorage.getItem("azureKey") || "";

    document.getElementById("region").value =
        localStorage.getItem("azureRegion") || "";
};

// Translate Function
async function translateText() {

    const key = localStorage.getItem("azureKey");
    const region = localStorage.getItem("azureRegion");

    if (!key || !region) {
        alert("Please set API Key & Region first!");
        return;
    }

    const text = document.getElementById("inputText").value;
    const lang = document.getElementById("language").value;

    const endpoint =
        `https://api.cognitive.microsofttranslator.com/translate?api-version=3.0&to=${lang}`;

    try {
        const response = await fetch(endpoint, {
            method: "POST",
            headers: {
                "Ocp-Apim-Subscription-Key": key,
                "Ocp-Apim-Subscription-Region": region,
                "Content-Type": "application/json"
            },
            body: JSON.stringify([{ Text: text }])
        });

        const data = await response.json();

        document.getElementById("outputText").value =
            data[0].translations[0].text;

    } catch (error) {
        alert("Error: " + error.message);
    }
}