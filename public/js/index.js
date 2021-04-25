async function post(
  url,
  data,
  headers = {
    'Content-Type': 'application/json'
  }
) {
  try {
    let res = await fetch(url, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(data)
    });

    if (res.ok === true && res.status === 200) {
      return await res.json();
    } else {
      var errRes = await res.json();
      if (!errRes) {
        errRes = res;
      }
      return Promise.reject(errRes);
    }
  } catch (error) {
    console.log('Fetch Post Error: ', error);
  }
}
var form = document.querySelector('.url-shorten-form');
form.onsubmit = function(e) {
  e.preventDefault();
  var url = document.querySelector('#redirect-url');

  post('http://localhost:3200/links', { original: url.value })
    .then(res => {
      var shortUrl = document.querySelector('#short-url');
      shortUrl.value = res.data.shortUrl;
    })
    .catch(e => {
      alert(e.error);
    });
};
