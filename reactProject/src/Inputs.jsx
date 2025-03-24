import { useEffect, useState } from "react"

export default function Inputs(){
    const [text, setText] = useState("Coucou")

    useEffect(()=>{
        console.log('Use Effect',text)
    },[text])

    return <div>
        <h2>Inputs</h2>
        <input type="text" placeholder="Mon Text" value={text} onChange={(e) =>{setText(e.target.value)} } />
    </div>
}