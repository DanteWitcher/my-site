export default class StrategyDrawing {
        render(data, target) {
            const area = document.querySelector('.show-area'),
            space = document.createElement('div');
            space.className = `show-area-${target.className}`;

        if (data) {
            const ul = document.createElement('ul');

            data.forEach((item) => {
                const li = document.createElement('li'),
                      img = document.createElement('img');
                img.src = item.url; 
                li.appendChild(img);
                ul.appendChild(li);
            })
            space.appendChild(ul);
            area.appendChild(space);
            new Viewer(ul, {
                toolbar: {
                  zoomIn: 4,
                  zoomOut: 4,
                  oneToOne: 4,
                  reset: 4,
                  prev: 4,
                  play: {
                    show: 4,
                    size: 'large',
                  },
                  next: 4,
                  rotateLeft: 4,
                  rotateRight: 4,
                  flipHorizontal: 4,
                  flipVertical: 4,
                },
              });
        } else
            throw new Error("don't have data");
    }
}