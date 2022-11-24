window.addEventListener("load", solve);

function solve() {
  let firstName = document.getElementById('first-name');
  let lastName = document.getElementById('last-name');
  let age = document.getElementById('age');
  let storyTitle = document.getElementById('story-title');
  let genre = document.getElementById('genre');
  let story = document.getElementById('story');
  let previewList = document.getElementById('preview-list')

  let publishButton = document.getElementById('form-btn');

  publishButton.addEventListener('click', publishBtnClicked);

  function publishBtnClicked(event) {
    let firstNameValue = firstName.value;
    let lastNameValue = lastName.value;
    let ageValue = age.value;
    let storyTitleValue = storyTitle.value;
    let genreValue = genre.value;
    let storyValue = story.value;

    if (!firstNameValue || !lastNameValue || !ageValue || !storyTitleValue || !genreValue || !storyValue) {
      return
    }

    publishStory(firstNameValue, lastNameValue, ageValue, storyTitleValue, genreValue, storyValue)

    firstName.value = '';
    lastName.value = '';
    age.value = '';
    storyTitle.value = '';
    story.value = '';
    publishButton.disabled = true
  }

  function publishStory(firstNameValue, lastNameValue, ageValue, storyTitleValue, genreValue, storyValue) {
    let article = createArticle(firstNameValue, lastNameValue, ageValue, storyTitleValue, genreValue, storyValue);
    let li = document.createElement('li');
    li.classList.add('story-info');

    li.appendChild(article);

    let saveButton = document.createElement('button');
    saveButton.classList.add('save-btn');
    saveButton.textContent = 'Save Story';
    saveButton.addEventListener('click', saveButtonClicked)

    let editButton = document.createElement('button');
    editButton.classList.add('edit-btn');
    editButton.textContent = 'Edit Story';
    editButton.addEventListener('click', editButtonClick)

    let deleteButton = document.createElement('button');
    deleteButton.classList.add('delete-btn');
    deleteButton.textContent = 'Delete Story';
    deleteButton.addEventListener('click', deleteButtonClicked)

    li.appendChild(saveButton);
    li.appendChild(editButton);
    li.appendChild(deleteButton);

    previewList.appendChild(li)
 

  }

  function createArticle(firstNameValue, lastNameValue, ageValue, storyTitleValue, genreValue, storyValue) {
    let article = document.createElement('article');

    let h4 = document.createElement('h4');
    h4.textContent = `Name: ${firstNameValue} ${lastNameValue}`;

    let pAge = document.createElement('p');
    pAge.textContent = `Age: ${ageValue}`;

    let pTitle = document.createElement('p');
    pTitle.textContent = `Title: ${storyTitleValue}`;

    let pGenre = document.createElement('p');
    pGenre.textContent = `Genre: ${genreValue}`;

    let pStory = document.createElement('p');
    pStory.textContent = `${storyValue}`; // check later;

    article.appendChild(h4);
    article.appendChild(pAge);
    article.appendChild(pTitle);
    article.appendChild(pGenre);
    article.appendChild(pStory);

    return article;
  }

  function editButtonClick(event) {
    let currentPost = event.target.parentElement;
    
    let articleContent = currentPost.getElementsByTagName('article')[0].children;

    let nameValue = articleContent[0].textContent.split(': ');
    let twoNames = nameValue[1].split(' ')

    let firstNameValue = twoNames[0];
    let lastNameValue = twoNames[1];

    let ageValue = articleContent[1].textContent;
    let storyTitleValue = articleContent[2].textContent;
    let genreValue = articleContent[3].textContent;
    let storyValue = articleContent[4].textContent;

    firstName.value = firstNameValue;
    lastName.value = lastNameValue;

    age.value = ageValue.split(': ')[1];
    storyTitle.value = storyTitleValue.split(': ')[1];
    genre.value = genreValue.split(': ')[1];
    story.value = storyValue;

    currentPost.remove();
    publishButton.disabled = false;

  }

  function saveButtonClicked(event) {
    let mainDiv = document.getElementById('main');
    Array.from(mainDiv.children).forEach(el => el.remove());
    let h1 = document.createElement('h1');
    h1.textContent = 'Your scary story is saved!';

    mainDiv.appendChild(h1)
  }

  function deleteButtonClicked(event) {
    event.target.parentElement.remove()
    publishButton.disabled = false
  }
}
