'use strict';

import Context from "./context.js";
import Drawing from "./drawingRender.js";
import Plast from "./plastRender.js";

(() => {
    document.querySelector('.works').addEventListener('click', getData);

    function hideAll(elem) {
        let childrens = document.querySelector(`.show-area`).children;
        childrens = Array.prototype.slice.apply(childrens);
        childrens.forEach((el) => {
            if (el != elem) {
                el.style.display = "none";
            }
        })
    } 

    async function getData(event) {
        const name = event.target.className;
        
        if ((name === 'works') || !name || name.includes('li')) {
            return;
        } 

        const elem = document.querySelector(`.show-area-${name}`);
        hideAll(elem);
        if (elem) {
            if (elem.style.display === "none") {
                elem.style.display = "block";
            } else {
                elem.style.display = "none";
            }
            return;
        } 

        try {
            const response = await fetch(`./portfolio/${name}/data.json`);
            const data = await interceptor(response);
            await renderFactory(data, event.target);
        }
        catch (error) {
            console.log((`${error} - get data error`));
        } 
    };

    function interceptor(response) {
        if (response.status === 200) {
            return response.json();
        } else {
            new Error('bad response status');
        }
    }

    function renderFactory(data, target) {
        const stategyDrawing = new Drawing();
        const stategyPlast = new Plast();

        const context = new Context(stategyDrawing);
        switch (target.className) {
            case 'drawings':
                context.execute(data, target);
                break;
            case 'plasts':
                context.setStrategy(stategyPlast);
                context.execute(data, target);
                break;
            case 'projects':
                render.projectRender(data);
                break;
            default:
                break;
        }
    }
})();