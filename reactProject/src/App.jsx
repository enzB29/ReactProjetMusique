
import { useEffect, useState } from 'react';
import './App.css'
import Inputs from './Inputs';
import TodoList from './TodoList';

function App() {
  const name = "Bernard";
  const letters = ["a","b","c","d","e","f"];
  //var age = 22;
  const [age, setAge] = useState(22)

  //const DisplayBlue = false

  const [DisplayBlue, setDisplayBlue] = useState(true)
  const [navigation, setnavigation] = useState("home")

  //dogapi
   
  
  return <div className='container' style={{  }}>
    <Inputs />
    <Breeds />
    <Header name = {name}/>
    <span>Hello {name} </span>
    <span></span><br />
    <Link href = "https://youtube.com" text="youtube"></Link>
    

  <ul>
    <li onClick={()=>setnavigation("Home")}>Home</li>
    <li onClick={()=>setnavigation("About")}>About</li>
    <li onClick={()=>setnavigation("Contact")}>Contact</li>
  </ul>
  <div>{navigation}</div>

    <ul>
      {letters.map((letter)=>{
    return <li key={(letter)}>{letter}</li>
    })}
    </ul>


    <div> {name} a {age} ans </div>
    <button onClick={function(){
    console.log("Clicked");
    setAge(age+1)
    }}>increment</button>

    {DisplayBlue ? 
    <div style={{
      height: 150,
      width: 150,
      backgroundColor: "greenyellow"
    }}></div>
    :
    <div style={{
      height: 150,
      width: 150,
      backgroundColor: "blue"
    }}></div>
    }

    <button onClick={()=>setDisplayBlue(!DisplayBlue)}>switch color</button>

    {navigation === "home" && true}
    {navigation === "about" && true}
    {navigation === "contact" && true}
    
    <br />
    <br />
    <br />
    <TodoList />

    <Footer name={name} />
  </div>
}

function Header(props){ 
  return <header>Header {props.name}</header>
}

function Footer(props){
  return <footer>Footer {props.name} </footer>
}

function Link(props){
  return (<a href={props.href}
    style={{
      color : "greenyellow",
      fontWeight: "bold",
    }}
  >{props.text}</a>)
}



function Breeds(){
  const [breeds, setBreeds] = useState([])

  useEffect(()=>{
      console.log("UseEffect")

      fetch("https://dogapi.dog/api/v2/breeds").then((res)=>res.json())
    .then((jsondata)=>{
        console.log(jsondata.data);
        setBreeds(jsondata.data)
    }) // recupère les donnes de l'api
  },[]) // condition : si on le change cela appelle cette fonction, ici on l'enlève pour que use effect ne soit appelé qu'une seule fois


  


  return <div>
    <h2>BREEDS</h2>
    <ul>
      {breeds.map((breeds)=>{
        return <li key={breeds.id}>{breeds.attributes.name}</li>
      })}
    </ul>
  </div> 
}

export default App
