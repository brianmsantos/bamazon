const fs = require("fs");
var mysql = require("mysql");
var inquirer = require('inquirer');

var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: "root",
    password: "",
    database: "bamazon"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    afterConnection();
});

function afterConnection() {
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        console.log(res);

        // var inquirer = require('inquirer');

        inquirer.prompt([{
                    type: "rawlist",
                    name: "item_id",
                    choices: function() {
                        let choiceArray = [];
                        for (let i = 0; i < res.length; i++) {
                            choiceArray.push(res[i].product_name);
                        }
                        return choiceArray;
                    },
                    message: "What is the item of the id you would like to buy?"
                },
                {
                    type: "input",
                    name: "quantity",
                    message: "How many units of the product would you like to buy?"
                }
            ])
            .then(function(answer) {
                let chosenItem;
                for (let i = 0; i < res.length; i++) {
                    if (res[i].product_name === answer.choice) {
                        chosenItem = results[i];
                    }
                }
                if (chosenItem.stock_quantity < parseInt(answer.quantity)) {
                    connection.query(
                        "UPDATE products SET ? WHERE ?", [{
                                stock_quantity: answer.quantity
                            },
                            {
                                item_id: chosenItem.item_id
                            }
                        ],
                        function(error) {
                            if (error) throw err;
                            console.log("Congrats on your purchase");
                            start();
                        }
                    );
                } else {
                    //insufficient quantity message
                    console.log("Insufficient quantity");
                    start();
                }

            })
        connection.end();
    });
}