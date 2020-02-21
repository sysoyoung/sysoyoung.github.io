function createMap() {
    let height = document.documentElement.clientHeight;
    let width = document.documentElement.clientWidth;


    if ((width <= 823 && height <= 600) || (width <= 500)) {
        height = document.documentElement.clientHeight * 0.9;
        width = document.documentElement.clientWidth;
    } else {
        height = document.documentElement.clientHeight * 0.6;
        width = document.documentElement.clientWidth * 0.5;
    }

    let setting = {
        "height": height,
        "width": width,
        "zoom": 17,
        "queryString": "ул. Евгения Коновальца, 15/2, Киев, Украина",
        "place_id": "EknRg9C7LiDQldCy0LPQtdC90LjRjyDQmtC-0L3QvtCy0LDQu9GM0YbQsCwgMTUvMiwg0JrQuNC10LIsINCj0LrRgNCw0LjQvdCwIjASLgoUChIJnwcPFBrP1EARFeS0FVYpUhgQDyoUChIJh6seFRrP1EARUF7Vs3jGvZQ",
        "satellite": false,
        "centerCoord": [50.4253197950438, 30.526772157147242],
        "cid": "0x3a9954f6abcca55c",
        "lang": "ru",
        "cityUrl": "/ukraine/kiev",
        "id": "map-9cd199b9cc5410cd3b1ad21cab2e54d3",
        "embed_id": "153409"
    };
    let d = document;
    let s = d.createElement('script');
    s.src = 'https://1map.com/js/script-for-user.js?embed_id=153409';
    s.async = true;
    s.onload = function(e) {
        window.OneMap.initMap(setting)
    };
    let to = d.getElementsByTagName('script')[0];
    to.parentNode.insertBefore(s, to);
}
// изменение размера карты при изменении екрана
function recreateMap() {

    let height = document.documentElement.clientHeight;
    let width = document.documentElement.clientWidth;

    setInterval(function() {
        if (height != document.documentElement.clientHeight || width != document.documentElement.clientWidth) {
            let oldMap = document.querySelector('iframe');
            if (oldMap) {
                oldMap.remove();
                createMap();
            }
            height = document.documentElement.clientHeight;
            width = document.documentElement.clientWidth;
        }
    }, 1000);
}