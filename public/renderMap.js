let url = "http://localhost:5000/api/getMap"
let headers = {
    // "Content-Type": "application/json",
    "method": "GET"
}

let MAP

fetch(
    url,
    headers
)
.catch(
    (error) => {
        console.error(error)
    }
)
.then(
    (response) => {
        return response.json()
    }
)
.then(
    (map) => {
        MAP = JSON.parse(map)
        MAP.map(
            (column, y) => {
                column.map(
                    (tile, x) => {
                        const div = document.createElement('div')
                        div.textContent = `${tile.type} (${x}, ${y})`
                        div.style.border = "solid black 1px"
                        div.style.width = "50px"
                        div.style.height = "50px"
                        div.style.display = "inline-block"
                        document.body.appendChild(div)
                    }
                )
            }
        )
    }
)