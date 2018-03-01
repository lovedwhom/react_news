function createElement(node) {
    if(typeof node ==='string'){
        return document.createTextNode(node)
    }

    const $el = document.createElement(node.type);
    $el.children.map(createElement).forEach($el.appendChild.bind($el));
    return $el
}
const list = (
    <ul class="list">
        <li>苹果</li>
        <li>西瓜</li>
    </ul>
);

const $root =document.getElementById('root');
$root.appendChi(createElement(list));