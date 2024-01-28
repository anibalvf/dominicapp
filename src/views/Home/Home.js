import React, { Component } from 'react';

class Home extends Component {
  render() {

    return (
      <div>
        <h1>Documentation</h1>

        <h3>GET METHODS </h3>
        <p>Retrieve a list of posts in ListView.</p>
        <p>Retrieve a specific post in DetailView, You can access this view by clicking the eye icon within the actions of the data table.</p>
        <p>Retrieve comments for a specific post in DetailView.</p>

        <h3>POST METHOD </h3>
        <p>You can add a new entry to the list view by clicking the 'Add Record' button and completing the modal form.</p>
        <p>It will appear at the end of the list because it's the latest element added.</p>

        <h3>DELETE METHOD </h3>
        <p>You can delete a post from the list view by clicking the garbage icon.</p>
        <p>Obviously, if you refresh the page, the record will show again because it's a test endpoint.</p>

        <h3>PUT/PATCH METHOD </h3>
        <p>You can edit a specific post inside the DetailView by clicking the edit button.</p>
        <p>I implement the PUT method, that is used for change the entery register, patch its the best option when you want to edit an especific field</p>
      </div>
    );
  }
}

export default Home;
