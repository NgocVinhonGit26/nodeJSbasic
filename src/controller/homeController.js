import { json } from 'body-parser'
import connection from '../configs/connectDB'

let getHomepage = (req, res) => {
    let data = []

    connection.query(
        'SELECT * FROM `users` ',
        function (err, results, fields) {
            console.log('>>> check mysql')
            console.log(results); // results contains rows returned by server
            results.map((row) => {
                data.push({
                    id: row.id,
                    firstName: row.firstName,
                    lastName: row.lastName,
                    email: row.email,
                    address: row.address
                })
            });
            return res.render('index.ejs', { dataUser: JSON.stringify(data) })

        })
}

module.exports = {
    getHomepage
}