//AXIOS GLOBALS
axios.defaults.headers.common['common-token'] = 'ad65d6a5d6ad56ad56';

// GET REQUEST
function getTodos() {
  //   axios({
  //     method:'get',
  //     url:'https://jsonplaceholder.typicode.com/todos?',
  //     params:{
  //       _limit:5
  //     }
  //   }).then(res=>showOutput(res))
  //   .catch(err=>console.log(err));
  //
  axios.get('https://jsonplaceholder.typicode.com/todos?_limit=2')
    .then(res => showOutput(res))
    .catch(err => console.log(err));
}
// POST REQUEST
function addTodo() {
  // axios({
  //   method: 'POST',
  //   url: 'https://jsonplaceholder.typicode.com/todos',
  //   data: {
  //     title: 'newToDo',
  //     description: 'complete homework',
  //     completed: 'false'
  //   }
  // }).then(res => showOutput(res))
  //   .catch(err => console.log(err));

  axios.post('https://jsonplaceholder.typicode.com/todos', {
    title: 'newToDo',
    description: 'complete homework',
    completed: 'false'
  })
    .then(res => showOutput(res))
    .catch(err => console.log(err));
}

// PUT/PATCH REQUEST
function updateTodo() {
  // axios.put('https://jsonplaceholder.typicode.com/todos/1',{
  //   title:'updated TODO',
  //   completed:true
  // })
  // .then(res=>showOutput(res))
  // .catch(err=>console.log(err));
  axios.patch('https://jsonplaceholder.typicode.com/todos/1', {
    title: 'updated TODO',
    completed: true
  })
    .then(res => showOutput(res))
    .catch(err => console.log(err));
}

// DELETE REQUEST
function removeTodo() {
  axios.delete('https://jsonplaceholder.typicode.com/todos/1')
    .then(res => showOutput(res))
    .catch(err => console.log(err));
}

// SIMULTANEOUS DATA
function getData() {
  // axios.all([
  //   axios.get('https://jsonplaceholder.typicode.com/todos'),
  //   axios.get('https://jsonplaceholder.typicode.com/posts')
  // ])
  // .then(res=>{
  //   console.log(res[0]);
  //   console.log(res[1]);
  //   showOutput(res[1]);
  // })
  // .catch(err=>console.log(err));
  axios.all([
    axios.get('https://jsonplaceholder.typicode.com/todos?_limit=5'),
    axios.get('https://jsonplaceholder.typicode.com/posts?_limit=5')
  ])
    .then(axios.spread((todos, posts) => {
      console.log(posts);
      console.log(todos);
      showOutput(posts);
    }))
    .catch(err => console.log(err));
}

// CUSTOM HEADERS
function customHeaders() {
  const conf = {
    headers: {
      'Content-Type': 'something',
      'Authorization': 'user'
    }
  };
  axios.post('https://jsonplaceholder.typicode.com/todos', {
    title: 'newToDo',
    description: 'complete homework',
    completed: 'false'
  }, conf)
    .then(res => showOutput(res))
    .catch(err => console.log(err));
}

// TRANSFORMING REQUESTS & RESPONSES
function transformResponse() {
  const options = {
    method: 'post',
    url: 'https://jsonplaceholder.typicode.com/todos',
    data: {
      title: 'new post',
      description: 'this is a new post'
    },
    transformResponse: axios.defaults.transformResponse.concat(data => {
      data.title = data.title.toUpperCase();
      return data;
    })

  }
  axios(options).then(res => showOutput(res));
}

// ERROR HANDLING
function errorHandling() {
  axios.get('https://jsonplaceholder.typicode.com/todoss?_limit=2')
    .then(res => showOutput(res))
    .catch(err => {
      console.log(err.response.data);
      console.log(err.response.status);
      console.log(err.response.headers);
      if(err.response.status===404){
        alert('Error: Page Not Found');
      }else if(err.request){
        console.log(err.request)
      }else{
        console.log(err.message)
      }
    });
}

// CANCEL TOKEN
function cancelToken() {
  const source=axios.CancelToken.source();
  axios.get('https://jsonplaceholder.typicode.com/todoss?_limit=2',{
    cancelToken:source.token
  })
    .then(res => showOutput(res))
    .catch(thrown=>{
      if(axios.isCancel(thrown)){
        console.log(thrown.message);
      }
    })
      source.cancel('request not completed');
}

// INTERCEPTING REQUESTS & RESPONSES
axios.interceptors.request.use(request => {
  console.log(`${request.method.toUpperCase()} request sent to ${request.url} at ${new Date().getTime()}`);
  return request
}, error => { return Promise.reject(error) });
// AXIOS INSTANCES

// Show output in browser
function showOutput(res) {
  document.getElementById('res').innerHTML = `
  <div class="card card-body mb-4">
    <h5>Status: ${res.status}</h5>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Headers
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.headers, null, 2)}</pre>
    </div>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Data
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.data, null, 2)}</pre>
    </div>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Config
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.config, null, 2)}</pre>
    </div>
  </div>
`;
}

// Event listeners
document.getElementById('get').addEventListener('click', getTodos);
document.getElementById('post').addEventListener('click', addTodo);
document.getElementById('update').addEventListener('click', updateTodo);
document.getElementById('delete').addEventListener('click', removeTodo);
document.getElementById('sim').addEventListener('click', getData);
document.getElementById('headers').addEventListener('click', customHeaders);
document.getElementById('transform').addEventListener('click', transformResponse);
document.getElementById('error').addEventListener('click', errorHandling);
document.getElementById('cancel').addEventListener('click', cancelToken);
