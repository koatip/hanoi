let towerHeight;
let disks = [];
let tower = [0, 0, 0];
const colors = ['#f600f6', '#e200e2', '#ce00ce', '#bb00bb', '#a700a7', '#940094', '#800080', '#6c006c'];
const container = document.querySelector('.container');
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
const offset = 300;

class Disk {
    base = 80;
    constructor(sn) {
        this.sn = sn;
        this.id = 'disk' + sn;
        const element = document.createElement('div');
        element.id = this.id;
        element.className = 'disk';
        element.style.backgroundColor = colors[sn - 1];
        element.style.bottom = this.px(tower[0] * 20 + this.base);
        element.style.left = this.px(offset - this.width / 2);
        element.style.width = this.px(this.width);
        container.appendChild(element);
        tower[0]++;
    }
    get width() {
        return this.sn * 30 + 40;
    }
    px(x) {
        return x + 'px';
    }
    get element() {
        return document.getElementById(this.id);
    }
    set bottom(y) {
        this.element.style.bottom = this.px(y * 20 + this.base);
    }
    set left(x) {
        this.element.style.left = this.px(offset * (x + 1) - this.width / 2);
    }
}

function init() {
    disks.forEach(disk => disk.element.remove());
    disks = [];
    tower = [0, 0, 0];
    for (let i = towerHeight; i > 0; i--) {
        disks[i] = new Disk(i);
    }
}

async function hanoi(disk, source, dest, aux) {
    if (disk === 1)
        return move(disk, source, dest);
    await delay(500);
    await hanoi(disk - 1, source, aux, dest);
    await delay(500);
    await move(disk, source, dest);
    await delay(500);
    await hanoi(disk - 1, aux, dest, source);
}

async function move(disk, source, dest) {
    await delay(500);
    disks[disk].bottom = 20;
    disks[disk].left = dest;
    await delay(500);
    disks[disk].bottom = tower[dest];
    tower[source]--;
    tower[dest]++;
}

document.querySelector('.btn-container').addEventListener('click', (e) => {
    towerHeight = +e.target.innerText;
    init();
    hanoi(towerHeight, 0, 1, 2);
})
