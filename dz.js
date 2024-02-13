

//! Full Code:
const http = require('http');

const PORT = 4000;

const server = http.createServer();

const friends = [
    {
        id: 0,
        name: 'Nikola Tesla',
        email: 'teslakolya@mail.ri'
    },
    {
        id: 1,
        name: 'Isaak Newton',
        email: 'tesakjiv@mail.ru'
    },
    {
        id: 2,
        name: 'Albert Einstein',
        email: "privetalbert@mail.ru"
    }
]

class addFriends{
    constructor(id,name,email){
        this.id = id;
        this.name = name;
        this.email = email;
    }
}

server.on('request', (req, res) => {
    const items = req.url.split('/');
    if (req.method === 'POST' && items[1] === 'friends') {
        req.on('data', (data) => {
            const friend = new addFriends(`${friends[friends.length -1].id+1}`,"fromCodeName","FromCodeEmail")
            //! Тут чуток не понял как сделать что бы ид автоматом прибавлялся на 1(выше строка)

                // id: friends[friends.length - 1].id + 1,
                // name: JSON.parse(data.toString()).name
            friends.push(friend);

            // res.end(JSON.stringify(friend));
        })
        req.pipe(res);
    } else if (req.method === 'GET' && items[1] === 'friends') {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json')
        if (items.length === 3) {
            const friendNumber = Number(items[2])
            res.end(JSON.stringify(friends[friendNumber]))
        } else {
            res.end(JSON.stringify(friends));
        }
    } else if (req.method === 'GET' && items[1] === 'messages') {
        res.setHeader('Content-Type', 'text/html')
        res.write('<html>');
        res.write('<body>');
        res.write('<ul>');
        res.write('<li>First msg</li>')
        res.write('<li>Second msg</li>')
        res.write('</ul>');
        res.write('</body>');
        res.write('<html>');
        res.end();
    }
    else if (req.method === 'DELETE' && items[1] === 'friends') {
    // res.setHeader('Content-Type', 'text/html')
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json')
    let find = friends.find(items => items.id)
    //! Далее идёт код Нейроонки ) -- Тот что с комментами
    // Функция удаления друга по ID
    function deleteFriend(id) {
    // Поиск друга по ID в списке
    const friendIndex = friends.findIndex((friend) => friend.id === id);
  
    // Если друг не найден
    if (friendIndex === -1) {
      console.error(`Friend with ID ${id} not found`);
      return;
    }
  
    // Удаление друга из списка
    friends.splice(friendIndex, 1);
    res.end();
    }
}
    else {
        res.statusCode = 404;
        res.end();
    }
})

server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
});