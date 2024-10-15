// import express from "express" // importamos cuando creamos type: module en package, no funciona con el servidor para este ejercicio, hay que dejarlo como const

// Creamos const app
const express = require("express")
const axios = require("axios")
const { readFile, readFileSync, writeFileSync} = require("fs")
const app = express()

// Levantamos un puerto
const port = 3_000

// Levantamos app
app.listen(port, () => console.log(`Aplicación ejecutándose por el puerto ${port}`))

const URL_BASE_STARWARS = "https://swapi.dev/api"


app.get("/", (request, response) => { // esa funcion es string, definimos callback
    // Objeto de respuesta
    // response.send("Esta es la ruta raíz")
    response.sendFile(`${__dirname}/views/index.html`)
}) 

app.get("/curso", (req, resp) => { // primer parametro objeto de peticion y segundo parametro de respuesta
    resp.sendFile(`${__dirname}/views/curso.html`)
})

// Lunes 14 Oct
// Definir rutas para mostrar personajes, como recibir parametros, capturar esos valores y tomarlos en la app
app.get("/agregar-personaje", async (req, resp) => {
    // resp.send("Agregando personaje...")
    const idPersonaje = req.query.id_personaje
    try {
        const contentFile = readFileSync(`${__dirname}/files/personajes.txt`, "utf-8")
        const contentJS = JSON.parse(contentFile)
        const busqueda = contentJS.find(item => item.id == idPersonaje)

        if (busqueda) {
            return resp.status(409).json({message: "Personaje registrado previamente"})
        }

        const { data } = await axios.get(`${URL_BASE_STARWARS}/people/${idPersonaje}`)
        const personaje = {id: idPersonaje, ...data}
        contentJS.push(personaje) // se añadió el id para tn
        writeFileSync(`${__dirname}/files/personajes.txt`, JSON.stringify(contentJS), "utf-8")
        resp.json({message: "Personaje agregado con éxito", data: personaje})
    } catch (error) {
        console.log(error);
        resp.status(500).json({message: "Hubo un error interno"})
    }
})

app.get("/listar-personajes", (req, resp) => {
    const contenido = readFileSync(`${__dirname}/files/personajes.txt`, "utf-8")
    const contentJS = JSON.parse(contenido) //convierte el objeto en string
     // contentJS.sort((a, b) => Number(b.id) - Number(a.id)) // Orden descendente
    contentJS.sort((a, b) => Number(a.id) - Number(b.id)) // Orden ascendente
    resp.json({"message": "Listado de personajes registrados", "data": contentJS})
})


// Ruta por defecto, se ejecuta cuando nos solicitan una ruta no definida
app.get("*", (req, resp) => {
    // resp.send("Ruta no definida en la aplicación.")
    resp.sendFile(`${__dirname}/views/error.html`)
})