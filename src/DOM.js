/*
  В функцию appendToBody передаются 3 параметра:
  tag - имя тега, content - содержимое тега и count - количество вставок.
  Необходимо, чтобы функция осуществила вставку на страницу указанный тег с указанным содержимым указанное число раз.
  Считаем, что всегда передается тег, допускающий вставку текста в качестве своего содержимого (P, DIV, I и пр.).
*/
export function appendToBody(tag, content, count) {
    for (let i = 0; i < count; i++) {
        document.body.insertAdjacentHTML(
            'afterbegin',
            `<${tag}>${content}</${tag}>`,
        );
    }
}

/*
  Создайте дерево вложенных тегов DIV.
  Каждый узел дерева должен содержать childrenCount узлов.
  Глубина дерева задается параметром level.
  Каждый элемент должен иметь класс вида item_n, где n - глубина вложенности элемента. (Нумерацию ведем с единицы).
  Сформированное дерево верните в качестве результата работы функции.
*/
export function generateTree(childrenCount, level) {
    document.body.insertAdjacentHTML('beforeend', '<div class="item_1"></div>');
    insertElements(childrenCount, 1, level);
    return document.getElementsByClassName('item_1')[0];
}

/**
 * Осуществляет рекурсивную послойную вставку элементов
 * @param {Number} childrenCount число элементов на каждом узле
 * @param {Number} currentLevel текущих уровень корневых элементов
 * @param {Number} maxLevel максимальный уровень вложености дерева
 */
function insertElements(childrenCount, currentLevel, maxLevel) {
    const nextLevel = currentLevel + 1;

    if (nextLevel > maxLevel) return;

    const elements = document.getElementsByClassName(`item_${currentLevel}`);
    for (const element of elements) {
        for (let i = 0; i < childrenCount; i++) {
            element.insertAdjacentHTML(
                'beforeend',
                `<div class='item_${nextLevel}'></div>`,
            );
        }
    }
    insertElements(childrenCount, nextLevel, maxLevel);
}

/*
  Используйте функцию для создания дерева тегов DIV из предыдущего задания.
  Создайте дерево с вложенностью 3 и числом элементов в каждом узле 2.
  Далее замените все узлы второго уровня (т.е. имеющие класс item_2) на теги SECTION.
  Остальную структуру дерева сохраните неизменной, включая классы и те элементы,
  которые находились внутри переписанных тегов.
  Сформированное дерево верните в качестве результата работы функции.
*/
export function replaceNodes() {
    const tree = generateTree(2, 3);
    const firstChilds = tree.getElementsByClassName('item_2');

    for (const child of firstChilds) {
        const newChild = document.createElement('section');
        newChild.innerHTML = child.innerHTML;

        for (const attribute of child.attributes) {
            newChild.setAttribute(attribute.name, attribute.value);
        }

        child.before(newChild);
        child.remove();
    }

    return tree;
}
