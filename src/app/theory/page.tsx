import './styles.scss';

export default function Page() {
    return (
        <div className="theory">
            <p className="title">Теория JavaScript</p>
            <div className="theories">
                <div>
                    <span className="bold">Введение</span>
                    <ul className="list">
                        <li className="elem">Введение в JavaScript</li>
                        <li className="elem">Справочники и спецификации</li>
                        <li className="elem">Редакторы кода</li>
                        <li className="elem">Консоль разработчика</li>
                    </ul>
                </div>
                <div>
                    <span className="bold">Основы JavaScript</span>
                    <ul className="list">
                        <li className="elem">Привет, мир!</li>
                        <li className="elem">Структура кода</li>
                        <li className="elem">Строгий режим — "use strict"</li>
                        <li className="elem">Переменные</li>
                        <li className="elem">Типы данных</li>
                        <li className="elem">Взаимодействие: alert, prompt, confirm</li>
                        <li className="elem">Преобразование типов</li>
                        <li className="elem">Базовые операторы, математика</li>
                        <li className="elem">Операторы сравнения</li>
                        <li className="elem">Условное ветвление: if, '?'</li>
                        <li className="elem">Логические операторы</li>
                        <li className="elem">
                            Операторы нулевого слияния и присваивания: '??', '??='
                        </li>
                        <li className="elem">Циклы while и for</li>
                        <li className="elem">Конструкция "switch"</li>
                        <li className="elem">Функции</li>
                        <li className="elem">Function Expression</li>
                        <li className="elem">Стрелочные функции, основы</li>
                        <li className="elem">Особенности JavaScript</li>
                    </ul>
                </div>
                <div>
                    <span className="bold">Объекты: основы</span>
                    <ul className="list">
                        <li className="elem">Объекты</li>
                        <li className="elem">Копирование объектов и ссылки</li>
                        <li className="elem">Сборка мусора</li>
                        <li className="elem">Методы объекта, "this"</li>
                        <li className="elem">Конструктор, оператор "new"</li>
                        <li className="elem">Опциональная цепочка '?.'</li>
                        <li className="elem">Тип данных Symbol</li>
                        <li className="elem">Преобразование объектов в примитивы</li>
                    </ul>
                </div>
                <div>
                    <span className="bold">Типы данных</span>
                    <ul className="list">
                        <li className="elem">Типы данных</li>
                        <li className="elem"> Методы примитивов</li>
                        <li className="elem"> Числа</li>
                        <li className="elem"> Строки</li>
                        <li className="elem"> Массивы</li>
                        <li className="elem"> Методы массивов</li>
                        <li className="elem"> Перебираемые объекты</li>
                        <li className="elem"> Map и Set</li>
                        <li className="elem"> WeakMap и WeakSet</li>
                        <li className="elem"> Object.keys, values, entries</li>
                        <li className="elem"> Деструктурирующее присваивание</li>
                        <li className="elem"> Дата и время</li>
                        <li className="elem"> Формат JSON, метод toJSON</li>
                    </ul>
                </div>
                <div>
                    <span className="bold">Продвинутая работа с функциями</span>
                    <ul className="list">
                        <li className="elem">Рекурсия и стек</li>
                        <li className="elem"> Остаточные параметры и оператор расширения</li>
                        <li className="elem"> Область видимости переменных, замыкание</li>
                        <li className="elem"> Устаревшее ключевое слово "var"</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
