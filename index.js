'use strict';

function formatQueryParams(params) {
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return queryItems.join('&');
}

function displayResults(responseJson) {
  console.log(responseJson);
  $('#results-list').empty();
  for (let i = 0; i < responseJson.length; i++){
    $('#results-list').append(
      `<li>
      <h3>${responseJson[i].name}</h3>
      <a href="${responseJson[i].html_url}">Link to ${responseJson[i].name}</a>
      </li>`
    )};  
  $('#results').removeClass('hidden');
};

function getRepos(username) {
  // const baseUrl = `https://api.github.com/users/${username}/repos`;
  const url = `https://api.github.com/users/${username}/repos`;
  const params = {
    type: all,
    sort: created,
    direction: desc,
  };

  // const queryString = formatQueryParams(params)
  // const fullUrl = baseUrl+'?'+queryString

  console.log(url);

  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const username = $('#js-search-term').val();
    getRepos(username);
  });
}

$(watchForm);