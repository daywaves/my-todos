# My todos
My version of [gaeron's todos](https://github.com/gaearon/todos.git) with React and Redux.

Originally based on what I learned from [gaeron's Redux guides](https://egghead.io/courses/building-react-applications-with-idiomatic-redux) but now has been expanded.

## Added features:
* Styling with Bulma, Font Awesome, and styled-components
* Real API server using express and a MongoDB database from [mlab](https://mlab.com/)
* Editable todos
* Removable todos
* Error notification popups
* Loading animations for different actions

## Usage
* First install MongoDB and run it using `mongod` or however you prefer.
* Set the environment variables in `.env`.
* Make sure you install dependencies with `npm install`.
* Build with `npm run build` and then start the server with `npm run start`.
* Open the app at http://localhost:3001/

### Development
* Make sure MongoDB is running and dependencies are installed as described above.
* Run the api server with `npm run dev:api`. The server will restart automatically when files are changed.
* Run the client dev server with `npm run dev:client`. The app reloads in the browser on file changes.

### Now Deployment
* `cp .env .env.now` and set the environment variables as needed.
* `now`

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).
