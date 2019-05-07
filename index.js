'use strict';

function getDogImage(dogNum) {
  fetch(`https://dog.ceo/api/breeds/image/random/${dogNum}`)
    .then(response => response.json())
    .then(responseJson => {
      displayResults(responseJson)});
    .catch(error => alert('Something went wrong. Try again later.'));
}

function displayResults(responseJson) {
  console.log(responseJson);
  //replace the existing image with the new one
  $('.results-img').replaceWith(
    `<img src="${responseJson.message}" class="results-img">`
  );
  //display the results section
  $('.results').removeClass('hidden');
}

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    let dogNum = $('.dogNum').val();
    getDogImage(dogNum);
  });
}

$(function() {
  console.log('App loaded! Waiting for submit!');
  watchForm();
});
