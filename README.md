### Code-Challenge-Directions

### Install NPM modules

```
$ npm install
```

**Run the app**

```
$ npm run build
$ npm run preview
```

It should print the port it is running on locally

**To function there must be at least one company configured in the database.
Use Postman against the back end to inject a company if starting from a blank DB

### Frontend Assignment (Estimated the time: <3 hours)

You are to create a frontend interface to enable an user to interact with the backend API you created. You'll have to start from scratch as we have not provided a framework to work within. Please provide instructions on how to run the code you write and deliver.

Tasks:
Using the below wireframe, create a UI that communicates with the backend API with the following functionality:

1. Display a list of addresses for a given customer
2. Delete an address for the customer
3. Add a new address the customer
   ![A test image](ui-wireframe.png)
   No need to spend time on beautifying the UI; a functional prototype is fine. However, please do make sure that the interface is responsive and mobile-first.

AR: Home page will display available companies in the backend with a link to the addresses page (not specified but it made my life easier in testing)
Top link will take you back to the companies page, Add/Delete should work as anticipated and duplicates not allowed.

    Implementation is react + vite + tailwind. Mostly because i have been looking for a chance to play with it, but it's also handy for mobile first styling.
    In Samples I've included screencaps of the site in mobile/web formats.


