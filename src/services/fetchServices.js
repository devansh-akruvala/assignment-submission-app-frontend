const fetchData=(url,requsetMethod,jwt,requsetBody)=>{
    const data={
        headers: {
            "content-type": "application/json",
          },
          method:requsetMethod,
    }

    if(jwt){
        data.headers.Authorization=`Bearer ${jwt}`;
    }
    if(requsetBody){
        data.body=JSON.stringify(requsetBody);
    }

   return fetch(url,data).then((response)=>{
        if(response.status===200){
          return response.json();
        }
          else {
            throw new Error('Something went wrong ...');
         }
      });
}

export default fetchData;