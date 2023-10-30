**qadog** is a QA agent that generates test reports based on user stories.

![Screenshot from 2023-10-30 11-23-50](https://github.com/eturchenkov/qadog/assets/49445761/e7f21217-d842-486a-b53e-0adbe344e3f5)

## Motivation

Testing of products is very expensive, hard to maintain, and takes a lot of time and effort. But for now generative AI makes possible new approaches to ensure quality of software products. An exciting way is to generate a comprehensive test suite from user stories, and then execute it. So that we can get test reports of the entire product. Such reports can be used for autonomous bug fixing in the future.

This project is in the research stage.

### Getting started

1. Clone this repo
```
git clone git@github.com:eturchenkov/qadog.git
```
2. Start demo todo app 
```
cd apps/todo
npm i && npm start
```
3. Add your OpenAI api key to .env file, use .env.sample for reference
```
cd packages/qadog
touch .env
```
4. Start qadog server and go to [http://localhost:5000](http://localhost:5000)
```
cd packages/qadog
npm i && npm run srv
```
5. Press "Generate report" button to build new test report

