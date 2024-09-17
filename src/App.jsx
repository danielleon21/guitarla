import Header from "./components/Header"
import Guitar from "./components/Guitar"
import { useState } from "react"
import { db } from "./data/db"

/* 
    Reto 01 - Boton decrementar cantidades.
    Crear funcion y pasarse via props
    Identificar elemento, añadirse al state
    Limite minimo de 1.
*/

function App() {
    const [data, setData] = useState(db)
    const [cart, setCart] = useState([])

    const MAX_ITEMS = 5
    const MIN_ITEMS = 1

    function addToCart(item) {
        const itemExists = cart.findIndex((itemCopy) => itemCopy.id == item.id)
        if (itemExists >= 0) {
            const updatedCart = [...cart]
            updatedCart[itemExists].quantity++
            setCart(updatedCart)
        } else {
            item.quantity = 1
            setCart([...cart, item])
        }
    }

    function removeFromCart(id) {
        setCart((prevCart) => prevCart.filter((item) => item.id !== id))
    }

    function increaseQuantity(id) {
        const updatedCart = cart.map((item) => {
            if (item.id === id && item.quantity <= MAX_ITEMS) {
                return {
                    ...item,
                    quantity: item.quantity + 1,
                }
            }
            return item
        })
        setCart(updatedCart)
    }

    function decreaseQuantity(id) {
        const updatedCart = cart.map( (item) => {
            if(item.id === id && item.quantity > MIN_ITEMS){
                return {
                    ...item,
                    quantity: item.quantity - 1
                }
            }
            return item
        })
        setCart(updatedCart)
    }

    function cleanCart(){
        setCart([])
    }

    return (
        <>
            <Header
                cart={cart}
                removeFromCart={removeFromCart}
                increaseQuantity={increaseQuantity}
                decreaseQuantity={decreaseQuantity}
                cleanCart={cleanCart}
            />
            <main className="container-xl mt-5">
                <h2 className="text-center">Nuestra Colección</h2>

                <div className="row mt-5">
                    {data.map((item) => (
                        <Guitar
                            key={item.id}
                            item={item}
                            setCart={setCart}
                            addToCart={addToCart}
                        />
                    ))}
                </div>
            </main>

            <footer className="bg-dark mt-5 py-5">
                <div className="container-xl">
                    <p className="text-white text-center fs-4 mt-4 m-md-0">
                        GuitarLA - Todos los derechos Reservados
                    </p>
                </div>
            </footer>
        </>
    )
}

export default App
