'use strict';
const state = {
  dogs: [],
  error: null,
  formReady: false
};
function getDogImage(dogNum, dogBreed) {
  fetch(`https://dog.ceo/api/breed/${dogBreed}/images/random/${dogNum}`)
    .then(response => response.json())
    .then(responseJson => {
      addDogsToState(responseJson);
      render();
    })
    .catch(error => {
      state.error = error;
      render();
    });
}
function getRandomdDogs(dogNum) {
  fetch(`https://dog.ceo/api/breeds/image/random/${dogNum}`)
    .then(response => response.json())
    .then(responseJson => {
      addDogsToState(responseJson);
      render();
    })
    .catch(error => {
      state.error = error;
      render();
    })
}

function addDogsToState(dogs) {
  state.dogs = dogs.message;
}

function render() {
  const html = state.dogs.map(dogImg => {
    return `
      <li>
        <img src="${dogImg}">
      </li>
    `;
  });

  if (state.error) {
    $('.error-message').html(`<p>${state.error}</p>`)
  } else {
    $('.error-message').empty();
  }

  if (state.formReady === false) {
    $('#number-choice').find('input[type=submit]').attr('disabled',true);
  } else {
    $('#number-choice').find('input[type=submit]').attr('disabled',false);
  }
  $('.results').removeClass('hidden').html(html);
}

function getBreedListAndPopulate() {
  return fetch('https://dog.ceo/api/breeds/list/all')
    .then(res => res.json())
    .then(data => {
      const breedObj = data.message;
      const breedList = Object.keys(breedObj).map(breed => `<option value="${breed}">${breed}</option>`);
      $('#dog-breed-select').html(breedList);
      state.formReady = true;
      render();
    });
}
function watchForm() {
  $('#number-choice').submit(event => {
    event.preventDefault();
    let dogNum = event.target.dogNum.value;
    let dogBreed = event.target.breed.value;
    console.log(`${dogNum} + ${dogBreed}`);
    getDogImage(dogNum, dogBreed);
  });
  $('#randomdogs').submit(event => {
    event.preventDefault();
    let dogNum = event.target.dogRandom.value;
    event.preventDefault()
    getRandomdDogs(dogNum)
  })
}

$(function() {
  watchForm();
  getBreedListAndPopulate();
  render();
});
