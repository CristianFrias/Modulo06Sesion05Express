// import express from "express" // importamos cuando creamos type: module en package, no funciona con el servidor para este ejercicio, hay que dejarlo como const

// Creamos const app
const express = require("express")
const app = express()

// Levantamos un puerto
const port = 3_000

// Levantamos app
app.listen(port, () => console.log(`Aplicación ejecutándose por el puerto ${port}`))

app.get("/", (request, response) => { // esa funcion es string, definimos callback
    // Objeto de respuesta
    // response.send("Esta es la ruta raíz")
    response.sendFile(`${__dirname}/views/index.html`)
}) 

app.get("/curso", (req, resp) => { // primer parametro objeto de peticion y segundo parametro de respuesta
    resp.sendFile(`${__dirname}/views/curso.html`)
})

// Ruta por defecto, se ejecuta cuando nos solicitan una ruta no definida
app.get("*", (req, resp) => {
    // resp.send("Ruta no definida en la aplicación.")
    resp.sendFile(`${__dirname}/views/error.html`)
})