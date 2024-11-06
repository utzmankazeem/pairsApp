import express from 'express'
import flash from 'connect-flash'
import session from 'express-session'
import mongoose from 'mongoose'
import connectDB from './config/dbConn.js'
import rootRoute from './routes/rootRoute.js'
import passRoute from './routes/passRoute.js'

const PORT = process.env.PORT || 2000;
const app = express();

connectDB();

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

//Session Middleware
app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true
}))
//Connect Flash             
app.use(flash());
//Globall VArs
app.use((req, res, next) => {
    res.locals.success = req.flash('success')
    res.locals.er_msg = req.flash('er_msg')
    next()
});
//Route
app.use('/', passRoute)
app.use('/', rootRoute)

mongoose.connection.once('open', () => {
    console.log('server connected to DB')
    app.listen(process.env.PORT ||PORT, () => console.log(`server started on http://localhost:${PORT}`))
})