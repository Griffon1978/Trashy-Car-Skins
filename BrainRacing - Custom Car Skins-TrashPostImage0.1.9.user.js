// ==UserScript==
// @name         Trashy Car Skins
// @namespace    https://github.com/Griffon1978/Trashy-Car-Skins
// @version      0.1.10
// @description  Allows you to set custom car skins as decoration, sets the old skins by default
// @author       Brainslug [2323221] original Trashonymous [3259948] updated
// @match        https://www.torn.com/page.php?sid=racing*
// @match        https://www.torn.com/loader.php?sid=racing*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=torn.com
// @updateURL    https://github.com/Griffon1978/Trashy-Car-Skins/raw/main/BrainRacing%20-%20Custom%20Car%20Skins-TrashPostImage0.1.9.user.js
// @downloadURL  https://github.com/Griffon1978/Trashy-Car-Skins/raw/main/BrainRacing%20-%20Custom%20Car%20Skins-TrashPostImage0.1.9.user.js
// @grant        none
// ==/UserScript==

// All A/E Class cars.
// B/C/D Class cars are a work in progress.
const cars = {
    "Limoen Saxon": "https://i.postimg.cc/HsJZFgpV/Limoen_Saxon_Citroen_Saxo.png",
    "Nano Pioneer": "https://i.postimg.cc/xjN67844/Nano_Pioneer_Mini_Cooper.png",
    "Colina Tanprice": "https://i.postimg.cc/3RGwR09f/Colina_Tanprice_Sierra_Cosworth_Rally.png",
    "Weston Marlin 177": "https://i.postimg.cc/YCP4JrVG/Weston_Marlin177_Aston_Martin177.png.png",
    "Echo R8": "https://i.postimg.cc/k4S54RwH/Echo_R8_Audi_R8.png",
    "Stormatti Casteon": "https://i.postimg.cc/kMWFSgXY/Stormatti_Casteon_Bugatti_Veyron.png",
    "Lolo 458": "https://i.postimg.cc/xTJ3x169/Lolo458_Ferrari458.png",
    "Lambrini Torobravo": "https://i.postimg.cc/GpwfcLJm/Lambrini_Torobravo_Lambo_Gallardo.png",
    "Veloria LFA": "https://i.postimg.cc/vBnmBxXJ/Veloria_LFA_Lexus_LFA.png",
    "Mercia SLR": "https://i.postimg.cc/43k0Jfbd/Mercia_SLR_Mercedes_SLR.png",
    "Zaibatsu GT-R": "https://i.postimg.cc/5tdrx4qt/Zaibatsu_GTR_Nissan_GTR.png",
    "Edomondo NSX": "https://i.postimg.cc/JnXhnHK6/Edmondo_NSX_Honda_NSX.png",
    "Volt GT": "https://i.postimg.cc/bNkFTyVK/Volt_GT40.png",
    "Edomondo Localé": "https://i.postimg.cc/vmT1KFDd/Edmondo_Locale_Honda_Civic.png",
    "Volt MNG": "https://i.postimg.cc/25yqtR3Y/Volt_GT_Ford_Mustang.png",
    "Çagoutte 10-6": "https://i.postimg.cc/mZ1mqk5m/Çagoutte106_Peugeot106.png",
    "Papani Colé": "https://i.postimg.cc/mZ1mqk56/Papani_Colé_Renault_Clio.png",
    "Tabata RM2": "https://i.postimg.cc/MTCN4QbJ/Tabata_RM2_Toyota_RM2.png",
    "Lolo 458": "https://i.postimg.cc/xTJ3x169/Lolo458_Ferrari458.png",
    "Chevalier CZ06": "https://i.postimg.cc/fyWyqN15/Chevalier_Z06_Chevy_Vette_Z06.png",
    "Bedford Racer": "https://i.postimg.cc/HkvPNkMQ/Bedford_Racer_Vauxhall_Corsa.png",
    "Stålhög 860": "https://i.postimg.cc/3w7WP3HC/Stålhög860_Volvo850.png",
    "Trident": "https://i.postimg.cc/ZKMM7qpf/Trident_Reliant_Robin.png",
    "Vita Bravo": "https://i.postimg.cc/9XDBJHtT/Vita_Bravo_Fiat_Punto.png",
    "Zaibatsu Macro": "https://i.postimg.cc/xTKp3Sn4/Zaibatsu_Macro_Nissan_Micra.png",
    "Chevalier CVR": "https://i.postimg.cc/1XSw922G/Chevalier_CVR_Chevy_Cavalier.png",
    "Edomondo ACD": "https://i.postimg.cc/85099dYQ/Edmondo_ACD_Honda_Accord.png",
    "Alpha Milano 156": "https://i.postimg.cc/YC0nKLQs/Apha_Milano156_Alfa_Romeo156.png",
    "Verpestung Insecta": "https://i.postimg.cc/9FyVwM0F/Verpestung_Insecta_VWBeetle.png",
    "Bavaria Z8": "https://i.postimg.cc/C1DnQ8SD/Bavaria_Z8_BMWZ8.png"
}

const matchCar = (name) => $([
    `span.img[title="${name}"] > img:not(.replaced)`, // active race big image
    `img[title="${name}"]:not(.replaced)`, // active race small image
    `img[title="\'${name}\'"]:not(.replaced)`, // your cars page
    `.car > img[title^="${name}"]:not(.replaced)`, // records page and past races
].join(','));

function updateImages() {
    for (const [name, img] of Object.entries(cars)) {
        const images = matchCar(name);
        if (images.length > 0) {
            images.each((i, image) => {
                image.removeAttribute('srcset');
                image.setAttribute('src', img);
                image.classList.add('replaced');
            });
        }
    }
}

const mainWindow = $('#racingMainContainer');
if (mainWindow.length > 0) {
    const observer = new MutationObserver(() => {
        updateImages();
    });

    observer.observe(mainWindow[0], { subtree: true, childList: true });
    updateImages();
}
