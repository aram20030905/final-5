import { useEffect, useReducer } from "react";
import "./admin.css";

function Admin() {
    const initialState = {
        productData: [],
        image: ""
    };

    function reducer(state, action) {
        switch (action.type) {
            case "setImage":
                return { ...state, image: action.payload }

            case "resetImage":

                return { ...state, image: "" }

            case "setProductData":

                return { ...state, productData: action.payload }

            case "addProduct":
                return { ...state, productData: [...state.productData, action.payload] }
            case "delete":
                return {...state,productData:state.productData.filter(el=>el.id !==action.payload)}
            default:
                return state;

        }

    }
    const [state, dispatch] = useReducer(reducer, initialState)


    function createImage(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                dispatch({
                    type: "setImage", payload:
                        reader.result
                });
            };
            reader.readAsDataURL(file);
        }
    }

    useEffect(() => {
        fetch("http://localhost:8000/productData")
            .then(response => response.json())
            .then(data => dispatch({ type: "setProductData", payload: data }))
            .catch(error => console.error("Error fetching data:", error));
    }, []);


    function send(e) {
        e.preventDefault();
        const { title, price, description } = e.target.elements;

        const obj = {
            id: new Date().getTime().toString(),
            title: title.value,
            price: price.value,
            description: description.value,
            image: state.image
        };

        fetch("http://localhost:8000/productData", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(obj)
        })
            .then(response => response.json())
            .then(newProduct => {
                dispatch({ type: "addProduct", payload: newProduct });
                e.target.reset();
                dispatch({ type: "resetImage" });
            })
            .catch(error => console.error("Error posting data:", error));
    }
    function handledelete(id){
        fetch(`http://localhost:8000/productData/${id}`, {
            method: "DELETE"
    })
    .then(()=>{
        dispatch({type:"delete",payload:id})
    })
    }

    return (
        <div className="product">
            <form onSubmit={send} className="admin">
                <input type="text" name="title" placeholder="Enter product title" required />
                <input type="number" name="price" placeholder="Enter product price" required />
                <input type="text" name="description" placeholder="Enter product description" required />
                <input onChange={createImage} type="file" name="image" />
                <button type="submit">Send</button>
            </form>
            <div>

                <table className="product-table">
                    <thead>

                        <tr>
                            <th>title</th>
                            <th>description</th>
                            <th>price</th>
                            <th>image</th>
                            <th>actions</th>


                        </tr>
                    </thead>

                    <tbody>
                        {state.productData.map(el => (
                            <tr key={el.id} className="data">


                                <td>{el.title}</td>
                                <td>{el.description}</td>
                                <td>{el.price}</td>
                                <td><img src={el.image} alt={el.title} /></td>
                                <td>
                                    <button onClick={()=>handledelete(el.id)}>Delete</button>
                                    <button>Update</button>
                                </td>

                            </tr>

                        ))}
                    </tbody>

                </table>


            </div>
        </div>
    );
}

export default Admin;
