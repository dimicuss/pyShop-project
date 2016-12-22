Инструкция по развертыванию приложения.

1. Установить node.js (https://nodejs.org/) не ниже 6.5.0 
2. В корневой папке запустить npm install (установятся все зависимости)
3. Установить клиент для gulp  - npm install gulp-cli -g
4. Установить елиент для bower - npm install bower -g
5. bower install (установятся все зависимости)
6. gulp (соберутся скрипты и стили)
6. Создать базу данных в firebase (https://firebase.google.com)
 Потом скопировать templates/config.json в корень проекта
 После нужно будет создать зкрытый ключ и перенести его содержимое в config.json в дерективу credentials (ключ можно добыть в "натройки проекта->сервисные аккаунты" )
 Потом в дерективу databaseUrl поместить адрес вашей дб (он находится в том же окне где вы брали ключ)
7. В папке находится структура и правила для дб их нужно будет импортировать в базу данных.
 Импортировать можно в "Raltime Database -> ... -> Импорт из файла JSON"
8. Запустить сервер - node app.js будет доступен на 8080 порту


На данный момент приложение доступпно по адресу http://pyaternikov.xyz:8080/

логин test1 пароль test1
логин test2 пароль test2
логин test3 пароль test3