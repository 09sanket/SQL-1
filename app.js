const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
const db = require('./util/database');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

// db.execute('SELECT * FROM products')
const getConnection = require('./util/database');

// Usage example
(async () => {
    try {
        const connection = await getConnection();

        // Execute a SELECT query on the "products" table
        connection.query('SELECT * FROM products', (err, results, title) => {
            if (err) {
                console.error('Error executing query:', err);
                return;
            }

            // Process the results (results)
            for (const column of results) {
                console.log('Products:', column.product_name);
            }

            // Don't forget to release the connection when done
            connection.release();
        });
    } catch (error) {
        console.error('Error getting data from the database:', error);
    }
})();



app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

app.listen(3000);
