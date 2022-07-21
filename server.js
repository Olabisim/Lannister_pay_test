import app from './app.js'
const port = process.env.PORT || 7000;


app.listen(port, () => {
        console.log("server is listening on port 7000")
})
