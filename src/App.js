import './App.css';

function App() {

  fetch('api/auth/login',{
    "headers":{
      "content-type":"application/json"
    },
     "method":"post",
    "body":JSON.stringify({
      "username":"dev",
      "password":"123"
    })
  }).then((response)=>Promise.all([response.json(),response.headers]))
  .then(([body,headers])=>{
    console.log(headers.get("authorization"))
    console.log(body)
  })

  return (
    <div className="App">
          </div>
  );
}

export default App;
