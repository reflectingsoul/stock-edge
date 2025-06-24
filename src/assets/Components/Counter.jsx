// import React from 'react'
// import { useState, useEffect } from 'react'

// function Counter() {
//   const [count, setCount]=useState(0);

//   useEffect(()=>{
//     const interval=setInterval(() => {
//       setCount(prevCount=> prevCount+1)
//     },1000);


//     return()=>clearInterval(interval);
//   },[])
//   console.log(count);
//   return (
//     <div><h1>{count}</h1>

//     <button onClick={()=>{setCount(count+1)}}>increment</button>
    
//     </div>
//   )
// }

// export default Counter;
import React, { useRef } from 'react';

function CounterWithRef() {
  const countRef = useRef(0);

  const increment = () => {
    countRef.current += 1;
    console.log('Count:', countRef.current);
  };

  return (
    <div>
      <h2>Counter using useRef</h2>
      <p>(Check console for updated count)</p>
      <button onClick={increment}>Increment</button>
    </div>
  );
}

export default CounterWithRef;

