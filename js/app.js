// ============================================
// MULTI-ZONE IRRIGATION SYSTEM
// Frontend Dashboard
// ============================================

console.log("Smart Irrigation Dashboard loaded successfully.");


// Display current time
function updateTime() {

    const now = new Date();

    const time = now.toLocaleTimeString();

    const lastUpdate =
        document.querySelector(".last-update strong");

    if (lastUpdate) {
        lastUpdate.textContent = time;
    }
}


// Update clock every second
setInterval(updateTime, 1000);

updateTime();