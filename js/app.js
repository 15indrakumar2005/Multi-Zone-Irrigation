// ============================================================
// MULTI-ZONE IRRIGATION & CROP PREDICTION SYSTEM
// MOCK IoT STATE
// ============================================================
//
// IMPORTANT:
// The values in this file are SIMULATED.
// They will later be replaced with Firebase/ESP32 data.
//
// NPK is intentionally software-simulated because there is
// no physical NPK sensor in this project.
// ============================================================


// ============================================================
// 1. MOCK IoT STATE
// ============================================================

const systemState = {

    // Soil Moisture
    soil1: 62,
    soil2: 38,

    // Environmental Sensors
    temperature: 28.4,
    humidity: 64,

    // Water Level
    waterLevel: "NORMAL",

    // Rain Information
    rainDetected: false,
    rainExpected: false,

    // SIMULATED NPK
    nitrogen: 65,
    phosphorus: 42,
    potassium: 58,

    // Actuators
    pump: false,
    valve1: false,
    valve2: false,

    // Operating Mode
    mode: "AUTO",

    // Alert History
    alerts: []

};


// ============================================================
// 2. SYSTEM SETTINGS
// ============================================================

const SETTINGS = {

    // Current mock target.
    // Crop-specific values will be added later.
    moistureThreshold: 40,
    moistureTarget: 60,

    // Mock sensor update interval
    sensorUpdateInterval: 5000

};


// ============================================================
// 3. DOM ELEMENTS
// ============================================================

const elements = {

    soil1Value: document.getElementById("soil1-value"),
    soil2Value: document.getElementById("soil2-value"),

    soil1Progress: document.getElementById("soil1-progress"),
    soil2Progress: document.getElementById("soil2-progress"),

    valve1Status: document.getElementById("valve1-status"),
    valve2Status: document.getElementById("valve2-status"),

    zone1Status: document.getElementById("zone1-status"),
    zone2Status: document.getElementById("zone2-status"),

    pumpStatus: document.getElementById("pump-status"),

    waterLevel: document.getElementById("water-level"),

    temperature: document.getElementById("temperature"),
    humidity: document.getElementById("humidity"),

    rainStatus: document.getElementById("rain-status"),
    rainForecast: document.getElementById("rain-forecast"),

    nitrogen: document.getElementById("nitrogen"),
    phosphorus: document.getElementById("phosphorus"),
    potassium: document.getElementById("potassium"),

    modeDisplay: document.getElementById("mode-display"),

    autoMode: document.getElementById("auto-mode"),
    manualMode: document.getElementById("manual-mode"),

    pumpControl: document.getElementById("pump-control"),
    valve1Control: document.getElementById("valve1-control"),
    valve2Control: document.getElementById("valve2-control"),

    alertHistory: document.getElementById("alert-history"),
    clearAlerts: document.getElementById("clear-alerts")

};


// ============================================================
// 4. GET ZONE BADGES
// ============================================================

const zoneCards = document.querySelectorAll(".zone-card");

const zone1Badge =
    zoneCards[0]?.querySelector(".badge");

const zone2Badge =
    zoneCards[1]?.querySelector(".badge");


// ============================================================
// 5. UTILITY FUNCTION
// ============================================================

function getCurrentTime() {

    return new Date().toLocaleTimeString();

}


// ============================================================
// 6. ALERT SYSTEM
// ============================================================

function addAlert(message, type = "info") {

    const alert = {

        message: message,
        type: type,
        time: getCurrentTime()

    };

    systemState.alerts.unshift(alert);

    // Keep only latest 10 alerts

    if (systemState.alerts.length > 10) {

        systemState.alerts.pop();

    }

    renderAlerts();

}


// ============================================================
// 7. DISPLAY ALERT HISTORY
// ============================================================

function renderAlerts() {

    if (!elements.alertHistory) {

        return;

    }


    if (systemState.alerts.length === 0) {

        elements.alertHistory.innerHTML = `
            <div class="empty-alert">
                No alerts available.
            </div>
        `;

        return;

    }


    elements.alertHistory.innerHTML =
        systemState.alerts.map(alert => {

            return `
                <div class="alert-item">

                    <span class="alert-time">
                        ${alert.time}
                    </span>

                    <span class="alert-message">
                        ${alert.message}
                    </span>

                </div>
            `;

        }).join("");

}


// ============================================================
// 8. UPDATE SOIL MOISTURE
// ============================================================

function updateSoilMoisture() {

    elements.soil1Value.textContent =
        Math.round(systemState.soil1);

    elements.soil2Value.textContent =
        Math.round(systemState.soil2);


    elements.soil1Progress.style.width =
        `${systemState.soil1}%`;

    elements.soil2Progress.style.width =
        `${systemState.soil2}%`;

}


// ============================================================
// 9. UPDATE ZONE STATUS
// ============================================================

function updateZoneStatus() {

    // -------------------------
    // Zone 1
    // -------------------------

    elements.valve1Status.textContent =
        systemState.valve1 ? "ON" : "OFF";

    elements.zone1Status.textContent =
        systemState.valve1 && systemState.pump
            ? "Watering"
            : "Inactive";


    if (zone1Badge) {

        zone1Badge.textContent =
            systemState.valve1 ? "ON" : "OFF";

        zone1Badge.className =
            systemState.valve1
                ? "badge badge-on"
                : "badge badge-off";

    }


    // -------------------------
    // Zone 2
    // -------------------------

    elements.valve2Status.textContent =
        systemState.valve2 ? "ON" : "OFF";

    elements.zone2Status.textContent =
        systemState.valve2 && systemState.pump
            ? "Watering"
            : "Inactive";


    if (zone2Badge) {

        zone2Badge.textContent =
            systemState.valve2 ? "ON" : "OFF";

        zone2Badge.className =
            systemState.valve2
                ? "badge badge-on"
                : "badge badge-off";

    }

}


// ============================================================
// 10. UPDATE SYSTEM STATUS
// ============================================================

function updateSystemStatus() {

    elements.pumpStatus.textContent =
        systemState.pump ? "ON" : "OFF";


    elements.waterLevel.textContent =
        systemState.waterLevel;


    elements.temperature.textContent =
        systemState.temperature.toFixed(1);


    elements.humidity.textContent =
        Math.round(systemState.humidity);


    elements.rainStatus.textContent =
        systemState.rainDetected
            ? "Rain Detected"
            : "No Rain";


    elements.rainForecast.textContent =
        systemState.rainExpected
            ? "Rain Expected"
            : "No Rain Expected";

}


// ============================================================
// 11. UPDATE NPK
// ============================================================
//
// NPK IS SOFTWARE-SIMULATED.
// There is NO physical NPK sensor.
// ============================================================

function updateNPK() {

    elements.nitrogen.textContent =
        Math.round(systemState.nitrogen);

    elements.phosphorus.textContent =
        Math.round(systemState.phosphorus);

    elements.potassium.textContent =
        Math.round(systemState.potassium);

}


// ============================================================
// 12. UPDATE CONTROL BUTTONS
// ============================================================

function updateControls() {

    elements.modeDisplay.textContent =
        systemState.mode;


    // Mode buttons

    elements.autoMode.classList.toggle(
        "active",
        systemState.mode === "AUTO"
    );


    elements.manualMode.classList.toggle(
        "active",
        systemState.mode === "MANUAL"
    );


    // Manual controls

    const manualMode =
        systemState.mode === "MANUAL";


    elements.pumpControl.disabled =
        !manualMode;

    elements.valve1Control.disabled =
        !manualMode;

    elements.valve2Control.disabled =
        !manualMode;


    // Pump button

    elements.pumpControl.textContent =
        systemState.pump
            ? "💧 Pump ON"
            : "💧 Pump OFF";


    // Zone 1 button

    elements.valve1Control.textContent =
        systemState.valve1
            ? "🌱 Zone 1 Valve ON"
            : "🌱 Zone 1 Valve OFF";


    // Zone 2 button

    elements.valve2Control.textContent =
        systemState.valve2
            ? "🌿 Zone 2 Valve ON"
            : "🌿 Zone 2 Valve OFF";

}


// ============================================================
// 13. UPDATE COMPLETE DASHBOARD
// ============================================================

function updateDashboard() {

    updateSoilMoisture();

    updateZoneStatus();

    updateSystemStatus();

    updateNPK();

    updateControls();

}


// ============================================================
// 14. PUMP CONTROL
// ============================================================
//
// SAFETY RULE:
//
// PUMP CAN ONLY TURN ON IF AT LEAST ONE VALVE IS ALREADY ON.
//
// Correct:
// VALVE ON → PUMP ON
//
// Incorrect:
// PUMP ON → VALVE ON
//
// ============================================================

function setPump(state, reason = null) {

    const previousState =
        systemState.pump;


    // --------------------------------------------------------
    // SAFETY: Pump cannot start with both valves OFF.
    // --------------------------------------------------------

    if (
        state === true &&
        !systemState.valve1 &&
        !systemState.valve2
    ) {

        addAlert(
            "⚠️ Pump cannot start: Turn ON Zone 1 or Zone 2 valve first.",
            "warning"
        );

        updateDashboard();

        return false;

    }


    // --------------------------------------------------------
    // Set pump state
    // --------------------------------------------------------

    systemState.pump = state;


    if (
        previousState !== state &&
        reason
    ) {

        addAlert(reason);

    }


    updateDashboard();

    return true;

}


// ============================================================
// 15. VALVE 1 CONTROL
// ============================================================
//
// When closing the ONLY active valve:
//
// PUMP OFF → VALVE OFF
//
// ============================================================

function setValve1(state, reason = null) {

    const previousState =
        systemState.valve1;


    // --------------------------------------------------------
    // If Zone 1 is the only active valve and pump is ON,
    // pump must be turned OFF BEFORE closing the valve.
    // --------------------------------------------------------

    if (
        state === false &&
        previousState === true &&
        systemState.pump &&
        !systemState.valve2
    ) {

        setPump(
            false,
            "💧 Pump turned OFF before closing Zone 1 valve."
        );

    }


    systemState.valve1 = state;


    if (
        previousState !== state &&
        reason
    ) {

        addAlert(reason);

    }


    updateDashboard();

}


// ============================================================
// 16. VALVE 2 CONTROL
// ============================================================
//
// When closing the ONLY active valve:
//
// PUMP OFF → VALVE OFF
//
// ============================================================

function setValve2(state, reason = null) {

    const previousState =
        systemState.valve2;


    // --------------------------------------------------------
    // If Zone 2 is the only active valve and pump is ON,
    // pump must be turned OFF BEFORE closing the valve.
    // --------------------------------------------------------

    if (
        state === false &&
        previousState === true &&
        systemState.pump &&
        !systemState.valve1
    ) {

        setPump(
            false,
            "💧 Pump turned OFF before closing Zone 2 valve."
        );

    }


    systemState.valve2 = state;


    if (
        previousState !== state &&
        reason
    ) {

        addAlert(reason);

    }


    updateDashboard();

}


// ============================================================
// 17. SAFETY CHECK
// ============================================================

function safetyCheck() {

    // ========================================================
    // LOW WATER LEVEL
    // ========================================================

    if (
        systemState.waterLevel === "LOW"
    ) {

        // IMPORTANT:
        // Pump OFF first.

        if (systemState.pump) {

            systemState.pump = false;

            addAlert(
                "⚠️ Pump stopped: Low water level.",
                "warning"
            );

        }


        // Then close Zone 1

        if (systemState.valve1) {

            systemState.valve1 = false;

        }


        // Then close Zone 2

        if (systemState.valve2) {

            systemState.valve2 = false;

        }

    }


    // ========================================================
    // RAIN DETECTED
    // ========================================================

    if (
        systemState.rainDetected
    ) {

        // Pump OFF first.

        if (systemState.pump) {

            systemState.pump = false;

            addAlert(
                "🌧️ Irrigation stopped: Rain detected.",
                "warning"
            );

        }


        // Then close Zone 1

        if (systemState.valve1) {

            systemState.valve1 = false;

        }


        // Then close Zone 2

        if (systemState.valve2) {

            systemState.valve2 = false;

        }

    }

}


// ============================================================
// 18. AUTOMATIC IRRIGATION LOGIC
// ============================================================
//
// AUTOMATIC SEQUENCE:
//
// START:
// VALVE ON → PUMP ON
//
// STOP:
// PUMP OFF → VALVE OFF
//
// SWITCH ZONE:
// PUMP OFF
// ↓
// OLD VALVE OFF
// ↓
// NEW VALVE ON
// ↓
// PUMP ON
//
// Only ONE zone can operate at a time.
// ============================================================

function automaticIrrigation() {

    if (
        systemState.mode !== "AUTO"
    ) {

        return;

    }


    // --------------------------------------------------------
    // Safety conditions
    // --------------------------------------------------------

    if (
        systemState.waterLevel === "LOW"
    ) {

        safetyCheck();

        return;

    }


    if (
        systemState.rainDetected
    ) {

        safetyCheck();

        return;

    }


    // --------------------------------------------------------
    // Check which zones need water
    // --------------------------------------------------------

    const zone1NeedsWater =
        systemState.soil1 <
        SETTINGS.moistureTarget;


    const zone2NeedsWater =
        systemState.soil2 <
        SETTINGS.moistureTarget;


    // --------------------------------------------------------
    // BOTH ZONES HAVE ENOUGH WATER
    // --------------------------------------------------------

    if (
        !zone1NeedsWater &&
        !zone2NeedsWater
    ) {

        // IMPORTANT:
        // Pump OFF FIRST.

        if (systemState.pump) {

            setPump(
                false,
                "💧 Pump stopped: Soil moisture sufficient."
            );

        }


        // Then close Zone 1

        if (systemState.valve1) {

            setValve1(
                false,
                "🌱 Zone 1 irrigation completed."
            );

        }


        // Then close Zone 2

        if (systemState.valve2) {

            setValve2(
                false,
                "🌿 Zone 2 irrigation completed."
            );

        }


        return;

    }


    // --------------------------------------------------------
    // SELECT DRIEST ZONE
    // --------------------------------------------------------

    let targetZone = 2;


    if (
        zone1NeedsWater &&
        (
            !zone2NeedsWater ||
            systemState.soil1 <= systemState.soil2
        )
    ) {

        targetZone = 1;

    }


    // ========================================================
    // TARGET ZONE 1
    // ========================================================

    if (
        targetZone === 1
    ) {

        // ----------------------------------------------------
        // If Zone 2 is currently active:
        //
        // PUMP OFF
        // ↓
        // ZONE 2 OFF
        // ----------------------------------------------------

        if (
            systemState.valve2
        ) {

            if (systemState.pump) {

                setPump(
                    false,
                    "💧 Pump OFF before switching to Zone 1."
                );

            }


            setValve2(
                false,
                "🌿 Zone 2 valve OFF before switching to Zone 1."
            );

        }


        // ----------------------------------------------------
        // Open Zone 1 FIRST
        // ----------------------------------------------------

        if (
            !systemState.valve1
        ) {

            setValve1(
                true,
                "🌱 Automatic irrigation started for Zone 1."
            );

        }


        // ----------------------------------------------------
        // ONLY AFTER VALVE 1 IS ON:
        // TURN PUMP ON
        // ----------------------------------------------------

        if (
            !systemState.pump &&
            systemState.valve1
        ) {

            setPump(
                true,
                "💧 Pump turned ON after Zone 1 valve opened."
            );

        }

    }


    // ========================================================
    // TARGET ZONE 2
    // ========================================================

    else {

        // ----------------------------------------------------
        // If Zone 1 is currently active:
        //
        // PUMP OFF
        // ↓
        // ZONE 1 OFF
        // ----------------------------------------------------

        if (
            systemState.valve1
        ) {

            if (systemState.pump) {

                setPump(
                    false,
                    "💧 Pump OFF before switching to Zone 2."
                );

            }


            setValve1(
                false,
                "🌱 Zone 1 valve OFF before switching to Zone 2."
            );

        }


        // ----------------------------------------------------
        // Open Zone 2 FIRST
        // ----------------------------------------------------

        if (
            !systemState.valve2
        ) {

            setValve2(
                true,
                "🌿 Automatic irrigation started for Zone 2."
            );

        }


        // ----------------------------------------------------
        // ONLY AFTER VALVE 2 IS ON:
        // TURN PUMP ON
        // ----------------------------------------------------

        if (
            !systemState.pump &&
            systemState.valve2
        ) {

            setPump(
                true,
                "💧 Pump turned ON after Zone 2 valve opened."
            );

        }

    }

}


// ============================================================
// 19. FINAL PUMP / VALVE SAFETY INTERLOCK
// ============================================================
//
// This is the FINAL protection layer.
//
// Rule 1:
// Pump ON + both valves OFF = NEVER ALLOWED
//
// Rule 2:
// Both valves ON simultaneously = NEVER ALLOWED
//
// ============================================================

function enforcePumpValveSafety() {

    // --------------------------------------------------------
    // PUMP ON WITH NO VALVE
    // --------------------------------------------------------

    if (
        systemState.pump &&
        !systemState.valve1 &&
        !systemState.valve2
    ) {

        systemState.pump = false;

        addAlert(
            "⚠️ Safety interlock: Pump stopped because no zone valve is open.",
            "warning"
        );

    }


    // --------------------------------------------------------
    // BOTH VALVES ON
    // --------------------------------------------------------

    if (
        systemState.valve1 &&
        systemState.valve2
    ) {

        // Pump OFF FIRST.

        if (systemState.pump) {

            systemState.pump = false;

            addAlert(
                "⚠️ Safety interlock: Pump stopped before changing zones.",
                "warning"
            );

        }


        // Turn Zone 2 OFF.

        systemState.valve2 = false;

        addAlert(
            "⚠️ Zone 2 valve turned OFF: only one zone may be active at a time.",
            "warning"
        );

    }

}


function simulateWatering() {

    // ========================================================
    // ZONE 1
    // ========================================================

    if (
        systemState.valve1 &&
        systemState.pump
    ) {

        systemState.soil1 += 2;


        // ----------------------------------------------------
        // AUTOMATIC MODE
        // Stop increasing at the automatic target.
        // ----------------------------------------------------

        if (
            systemState.mode === "AUTO" &&
            systemState.soil1 > SETTINGS.moistureTarget
        ) {

            systemState.soil1 =
                SETTINGS.moistureTarget;

        }


        // ----------------------------------------------------
        // MANUAL MODE
        // Do NOT stop at 60%.
        //
        // This allows us to demonstrate overwatering.
        // Maximum simulated sensor value = 100%.
        // ----------------------------------------------------

        if (
            systemState.mode === "MANUAL" &&
            systemState.soil1 > 100
        ) {

            systemState.soil1 = 100;

        }

    }


    // ========================================================
    // ZONE 2
    // ========================================================

    if (
        systemState.valve2 &&
        systemState.pump
    ) {

        systemState.soil2 += 2;


        // ----------------------------------------------------
        // AUTOMATIC MODE
        // Stop increasing at the automatic target.
        // ----------------------------------------------------

        if (
            systemState.mode === "AUTO" &&
            systemState.soil2 > SETTINGS.moistureTarget
        ) {

            systemState.soil2 =
                SETTINGS.moistureTarget;

        }


        // ----------------------------------------------------
        // MANUAL MODE
        // Do NOT stop at 60%.
        //
        // This allows us to demonstrate overwatering.
        // Maximum simulated sensor value = 100%.
        // ----------------------------------------------------

        if (
            systemState.mode === "MANUAL" &&
            systemState.soil2 > 100
        ) {

            systemState.soil2 = 100;

        }

    }

}

// ============================================================
// 21. SIMULATE ENVIRONMENTAL SENSOR CHANGES
// ============================================================

function simulateSensors() {

    // --------------------------------------------------------
    // Temperature variation
    // --------------------------------------------------------

    const temperatureChange =
        (Math.random() - 0.5) * 0.6;


    systemState.temperature +=
        temperatureChange;


    systemState.temperature =
        Math.max(
            20,
            Math.min(
                40,
                systemState.temperature
            )
        );


    // --------------------------------------------------------
    // Humidity variation
    // --------------------------------------------------------

    const humidityChange =
        (Math.random() - 0.5) * 2;


    systemState.humidity +=
        humidityChange;


    systemState.humidity =
        Math.max(
            30,
            Math.min(
                90,
                systemState.humidity
            )
        );


    // --------------------------------------------------------
    // NPK simulated variation
    // --------------------------------------------------------

    systemState.nitrogen =
        randomValue(
            50,
            80
        );


    systemState.phosphorus =
        randomValue(
            30,
            60
        );


    systemState.potassium =
        randomValue(
            40,
            70
        );

}


// ============================================================
// 22. RANDOM VALUE FUNCTION
// ============================================================

function randomValue(min, max) {

    return Math.floor(
        Math.random() *
        (max - min + 1)
    ) + min;

}


// ============================================================
// 23. AUTOMATIC SYSTEM CYCLE
// ============================================================

function runSystemCycle() {

    // First simulate watering

    simulateWatering();


    // Simulate sensor values

    simulateSensors();


    // Check safety conditions

    safetyCheck();


    // Run automatic irrigation

    automaticIrrigation();


    // Final safety protection

    enforcePumpValveSafety();


    // Update dashboard

    updateDashboard();

}


// ============================================================
// 24. AUTO MODE BUTTON
// ============================================================

elements.autoMode.addEventListener(
    "click",
    function () {

        if (
            systemState.mode === "AUTO"
        ) {

            return;

        }


        systemState.mode = "AUTO";


        addAlert(
            "🤖 Automatic irrigation mode enabled."
        );


        automaticIrrigation();

        updateDashboard();

    }
);


// ============================================================
// 25. MANUAL MODE BUTTON
// ============================================================

elements.manualMode.addEventListener(
    "click",
    function () {

        if (
            systemState.mode === "MANUAL"
        ) {

            return;

        }


        systemState.mode = "MANUAL";


        // ----------------------------------------------------
        // SAFE STOP:
        //
        // PUMP OFF FIRST
        // ↓
        // VALVES OFF
        // ----------------------------------------------------

        if (
            systemState.pump
        ) {

            setPump(
                false,
                "💧 Pump stopped before entering Manual mode."
            );

        }


        if (
            systemState.valve1
        ) {

            setValve1(
                false,
                "🌱 Zone 1 valve turned OFF."
            );

        }


        if (
            systemState.valve2
        ) {

            setValve2(
                false,
                "🌿 Zone 2 valve turned OFF."
            );

        }


        addAlert(
            "🖐️ Manual irrigation mode enabled."
        );


        updateDashboard();

    }
);


// ============================================================
// 26. MANUAL PUMP BUTTON
// ============================================================
//
// Pump can ONLY be switched ON when a zone valve is already ON.
//
// ============================================================

elements.pumpControl.addEventListener(
    "click",
    function () {

        if (
            systemState.mode !== "MANUAL"
        ) {

            return;

        }


        // ----------------------------------------------------
        // LOW WATER
        // ----------------------------------------------------

        if (
            systemState.waterLevel === "LOW"
        ) {

            addAlert(
                "⚠️ Pump cannot start: Low water level.",
                "warning"
            );

            return;

        }


        // ----------------------------------------------------
        // RAIN
        // ----------------------------------------------------

        if (
            systemState.rainDetected
        ) {

            addAlert(
                "🌧️ Pump cannot start: Rain detected.",
                "warning"
            );

            return;

        }


        // ----------------------------------------------------
        // TURN PUMP OFF
        //
        // This is always safe.
        // ----------------------------------------------------

        if (
            systemState.pump
        ) {

            setPump(
                false,
                "💧 Manual pump turned OFF."
            );

            return;

        }


        // ----------------------------------------------------
        // TURN PUMP ON
        //
        // VALVE MUST ALREADY BE ON.
        // ----------------------------------------------------

        if (
            !systemState.valve1 &&
            !systemState.valve2
        ) {

            addAlert(
                "⚠️ Pump cannot start: Turn ON Zone 1 or Zone 2 valve first.",
                "warning"
            );

            return;

        }


        setPump(
            true,
            "💧 Manual pump turned ON after zone valve was opened."
        );

    }
);


// ============================================================
// 27. MANUAL ZONE 1 VALVE
// ============================================================

elements.valve1Control.addEventListener(
    "click",
    function () {

        if (
            systemState.mode !== "MANUAL"
        ) {

            return;

        }


        // ----------------------------------------------------
        // LOW WATER
        // ----------------------------------------------------

        if (
            systemState.waterLevel === "LOW"
        ) {

            addAlert(
                "⚠️ Zone 1 cannot start: Low water level.",
                "warning"
            );

            return;

        }


        // ====================================================
        // TURN ZONE 1 OFF
        // ====================================================

        if (
            systemState.valve1
        ) {

            // If Zone 1 is the only active zone,
            // PUMP OFF FIRST.

            if (
                systemState.pump &&
                !systemState.valve2
            ) {

                setPump(
                    false,
                    "💧 Pump turned OFF before closing Zone 1 valve."
                );

            }


            setValve1(
                false,
                "🌱 Zone 1 valve turned OFF."
            );

            return;

        }


        // ====================================================
        // TURN ZONE 1 ON
        // ====================================================

        // If Zone 2 is currently active,
        // switch safely:
        //
        // PUMP OFF
        // ↓
        // ZONE 2 OFF
        // ↓
        // ZONE 1 ON

        if (
            systemState.valve2
        ) {

            if (
                systemState.pump
            ) {

                setPump(
                    false,
                    "💧 Pump OFF before switching to Zone 1."
                );

            }


            setValve2(
                false,
                "🌿 Zone 2 valve OFF before switching to Zone 1."
            );

        }


        // Open Zone 1.

        setValve1(
            true,
            "🌱 Zone 1 valve turned ON."
        );


        // IMPORTANT:
        // Pump does NOT automatically turn ON in Manual mode.
        //
        // User must press Pump ON after opening the valve.

    }
);


// ============================================================
// 28. MANUAL ZONE 2 VALVE
// ============================================================

elements.valve2Control.addEventListener(
    "click",
    function () {

        if (
            systemState.mode !== "MANUAL"
        ) {

            return;

        }


        // ----------------------------------------------------
        // LOW WATER
        // ----------------------------------------------------

        if (
            systemState.waterLevel === "LOW"
        ) {

            addAlert(
                "⚠️ Zone 2 cannot start: Low water level.",
                "warning"
            );

            return;

        }


        // ====================================================
        // TURN ZONE 2 OFF
        // ====================================================

        if (
            systemState.valve2
        ) {

            // If Zone 2 is the only active zone,
            // PUMP OFF FIRST.

            if (
                systemState.pump &&
                !systemState.valve1
            ) {

                setPump(
                    false,
                    "💧 Pump turned OFF before closing Zone 2 valve."
                );

            }


            setValve2(
                false,
                "🌿 Zone 2 valve turned OFF."
            );

            return;

        }


        // ====================================================
        // TURN ZONE 2 ON
        // ====================================================

        // If Zone 1 is currently active,
        // switch safely:
        //
        // PUMP OFF
        // ↓
        // ZONE 1 OFF
        // ↓
        // ZONE 2 ON

        if (
            systemState.valve1
        ) {

            if (
                systemState.pump
            ) {

                setPump(
                    false,
                    "💧 Pump OFF before switching to Zone 2."
                );

            }


            setValve1(
                false,
                "🌱 Zone 1 valve OFF before switching to Zone 2."
            );

        }


        // Open Zone 2.

        setValve2(
            true,
            "🌿 Zone 2 valve turned ON."
        );


        // Pump stays OFF.
        // User must press Pump ON.

    }
);


// ============================================================
// 29. CLEAR ALERT HISTORY
// ============================================================

elements.clearAlerts.addEventListener(
    "click",
    function () {

        systemState.alerts = [];

        renderAlerts();

    }
);


// ============================================================
// 30. INITIAL DASHBOARD
// ============================================================

updateDashboard();

renderAlerts();


// ============================================================
// 31. START MOCK IoT LOOP
// ============================================================

setInterval(
    runSystemCycle,
    SETTINGS.sensorUpdateInterval
);


// ============================================================
// 32. CONSOLE INFORMATION
// ============================================================

console.log(
    "======================================"
);

console.log(
    "Smart Irrigation Mock IoT System Started"
);

console.log(
    "NPK values are SOFTWARE SIMULATED."
);

console.log(
    "Pump/Valve Safety Interlock Enabled."
);

console.log(
    "Waiting for Firebase/ESP32 integration."
);

console.log(
    "======================================"
);