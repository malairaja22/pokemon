import './App.css';
import React, { useEffect, useState } from 'react'


function App() {
  const [arr, setArr] = useState([]);
  const [url, setUrl] = useState('https://pokeapi.co/api/v2/pokemon?limit=20');

  const fetchdata = async () => {
    const res = await fetch(url);
    const data = await res.json();
    setUrl(data.next);

    function fetchdata1(result) {
      result.forEach(async (val) => {
        const res = await fetch(val.url);
        const data = await res.json();
        setArr(arr => [...arr, data]);
      })
    }
    fetchdata1(data.results);
  }

  useEffect(() => {
  fetchdata();
  }, []);

  function addmore() {
    fetchdata();
  }

  function visible(val){
    if(document.getElementById('top'+val.target.value).style.display === "none"){
      document.getElementById('top'+val.target.value).style.display="block";
      val.target.innerHTML ="Know Less";
    }else{
    document.getElementById('top'+val.target.value).style.display="none";
    val.target.innerHTML ="Know More";
  }
  }

  return (
    <>
    <div className='container text-center'>
      <h1 className='h1 p-2'>Pokemon Kingdom</h1>
      <ol className='row w-100'>
      {
      arr.map((data,i)=>{
        var a=data.types[0].type.name;
        return <div  key={i} className='col-lg-2 col-md-3 col-6 p-1'>
          <li className={`${a} card`} >
           <div className='card-body text-center'>
          <p className='h5'>#0{i+1}</p>
          <img className='img-fluid' src={data.sprites.other.dream_world.front_default} alt={data.species.name}/>
          <p className='h5'>{data.species.name}</p>
          <p className='h6'>Type: {data.types[0].type.name}</p>
          <button className='btn btn-warning' value={i} onClick={visible}>Know More</button>
          <div className='h6 mt-2' id={'top'+i} style={{display:"none"}}>
          
      <p>height:{data.height}</p>
      <p>weight:{data.weight / 10}</p>
      <h6 className='h4 bold'>stats</h6>
      <p>hp:{data.stats[0].base_stat}</p>
      <p>attack:{data.stats[1].base_stat}</p>
      <p>defense:{data.stats[2].base_stat}</p>
      <p>special-attack:{data.stats[3].base_stat}</p>
      <p>special-defense:{data.stats[4].base_stat}</p>
      <p>speed:{data.stats[5].base_stat}</p>
      </div>
      </div>
          
          </li></div>
      })
      }
      </ol>
      <div className="d-grid gap-2 d-md-block">
      <button className='btn btn-warning text-center btn-lg' type="button" onClick={addmore} >Add More...</button>
      </div>
      </div>
    </>
  )
}
export default App;
