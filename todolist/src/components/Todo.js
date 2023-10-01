import React , {useState,useEffect} from "react"
import "./style.css"

//get items to local storage..
const getLocalData=()=>{
    const item=localStorage.getItem("todolist")
    if(item){
        return JSON.parse(item);
    }
    else{
        return [];
    }
}
const Todo =()=>{
    const [Inputdata,setInputdata] = useState("")
    const [addItems,setaddItems]=useState(getLocalData())
    const [EditItem,setEditItem]=useState("")
    const [toggle,settoggle]=useState(false)

    const addButton=()=>{
        if(!Inputdata){
            alert("Please Fill The Data")
        }
        else if(Inputdata && toggle){
            setaddItems(
                addItems.map((element)=>{
                    if(element.id===EditItem){
                        return {...element, name:Inputdata}
                    }
                    else{
                        return element
                    }
                })
            )
            settoggle(false)
            setInputdata([])
            setEditItem(null)
        }
        else{
            const items={
                id: new Date().getTime().toString(),
                name: Inputdata
            }
            setaddItems([...new Set([...addItems,items])])
            // console.log(value,"valuedat")
            // setaddItems([...addItems,items])
            setInputdata("")
        }
    }

   
    const deleteitem=(id)=>{
        const updateItems= addItems.filter((element)=>{
            if(element.id!==id){
                return true
            }
        })
        setaddItems(updateItems)
    }

    //add items to local storage...
    useEffect(()=>{
        localStorage.setItem("todolist",JSON.stringify(addItems));
    },[addItems])

    const handleKeyDown=(event)=>{
        if (event.key==="Enter"){
            return addButton()
        }
    }

    const editItem=(index)=>{
        const updatedItem= addItems.find((element)=>{
            return element.id===index
        })
        setInputdata(updatedItem.name)
        setEditItem(index)
        settoggle(true)

    }
    return(
        <>
            <div className="main-div">
                 <div className="child-div">
                    <figure>
                        <img src="./images/Todo.png"></img>
                        <figcaption>Add Your List Here ✌</figcaption>
                    </figure>
                    <div className="addItems">
                        <input type="text" placeholder="✍ Add Item" className="form-control" onChange={(event)=> setInputdata(event.target.value)} onKeyDown={(event)=>handleKeyDown(event)} value={Inputdata}>
                        </input>
                                    {
                                        toggle ? <i className="far fa-edit add-btn" onClick={addButton}></i> : <i className="fa fa-plus add-btn" onClick={addButton}></i>
                                    }
                    </div>
                    
                    {/* add items */}
                    <div className="showItems">
                            {addItems.map((element)=>{
                                return (<div className="eachItem" key={element.id}>
                                    <h3>{element.name}</h3>
                                    <div className="todo-btn">
                                        <i className="far fa-edit add-btn" onClick={()=>editItem(element.id)}></i>
                                        <i className="far fa-trash-alt add-btn" onClick={()=>deleteitem(element.id)}></i>
                                    </div>
                                </div>)
                                })
                            }
                    </div>       
                    {/* remove Items */}

                    <div className="showItems">
                        <button className="btn effect04" data-sm-link-text="Remove All" onClick={()=>setaddItems([])}><span>CHECK LIST</span></button>
                    </div>
                 </div> 
            </div>
        </>
    )
}
export default Todo;