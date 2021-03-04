## Path Finder App
The Path Finder App demonstrate the Dijkstra's algorithm to Find the shortest and cheapest path between cities.

- [Installation](#installation)
- [Usage](#usage)

## Installation
Download the project files or clone it
```bash
npm install
```

## Usage
Once you installed the node modules run the following command 
```bash
npm start
```

The application has 2 apis. 
```bash
api/v0/deals/init
```
which fetch all the deals and send the unique city names as result. You can choose from them your 
destination and arrival city to use the second end point

```bash
/api/v0/deals?from=London&to=Moscow&filter=(cheapest || fastest)
```
which will send back the result deals with the total amount of cost and duration

## Swagger

Use Swagger docs for easer usage of the apis using the following end point

```bash
/docs
```