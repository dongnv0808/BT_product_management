const http = require('http');
const fs = require('fs');

let server = http.createServer((req, res) => {
    let display = '';

    fs.readFile('data.json', (err, data) => {
        if(err){
            console.log(err);
        }
        data = JSON.parse(data);
        data.forEach(value => {
            display += `<tr>
                <td>${value.id}</td>
                <td>${value.name}</td>
                <td>${value.price}</td>
            </tr>`
        })
    })
    fs.readFile('readfile.html', 'utf-8', (err, datahtml) => {
        if(err){
            console.log(err);
            return res.end();
        }
        res.writeHead(200, {'Content-Type': 'text/html'});
        datahtml = datahtml.replace('{result}', display);
        res.write(datahtml);
        return res.end();
    })
})
server.listen(8080, () => {
    console.log('Running localhost:8080');
})