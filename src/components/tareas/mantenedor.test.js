import React from "react"
import "@testing-library/jest-dom/extend-expect" 
import {render} from "@testing-library/react" 
import MantenedorTarea from "./mantenedorTarea"

test('renders content', () => {
    const mantenedor = {
        content : "Crear nueva tarea",
        important: true 
    }

    const component = render(<MantenedorTarea />)

    console.log(component);
})