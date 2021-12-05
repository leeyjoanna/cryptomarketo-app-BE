# CryptoMarketo (back end folder)

[Check it out here on Heroku!](https://cryptomarketo.herokuapp.com/)\
A web app where users can search for cryptocurrency details and create their own watch list stored locally.\

Both front end and back end folder are available on Github. This folder holds the front end `build` folder inside of `dist` (`tsc` compiled code), all back end code, and is the repository utilized with Heroku hosting.

## Screen shots
Home page: new user/no existing list
<img width="1407" alt="NewHome" src="https://user-images.githubusercontent.com/70289434/144744985-32efa066-b753-4d64-ba57-1934b5ce88cf.png">

Home page: existing user with list populated from MongoDB
<img width="1394" alt="ExistingHome" src="https://user-images.githubusercontent.com/70289434/144744998-034c877d-a835-4ca4-bc11-e451ebc883b6.png">

Search result: populated list of at most 10 results from Polygon's API 
<img width="1320" alt="SearchResult" src="https://user-images.githubusercontent.com/70289434/144745023-043bb9ce-d2d9-430f-ba43-245600a9332f.png">

Full data display: all 3 components present (news/ coin data/ watch list)
<img width="1418" alt="FullDisplay" src="https://user-images.githubusercontent.com/70289434/144745041-6c392600-0f5c-4310-aead-5520f95f79f1.png">

Popover disclaimer: informs user of current app limitations 
<img width="1413" alt="PopoverDisclaimer" src="https://user-images.githubusercontent.com/70289434/144745063-5f837845-1656-4a69-a843-42a0b00c5d3c.png">

## Design: top-level

**Language**: TypeScript\
**Front-end**: React, Axios\
**Back-end**: Express, Node.js\
**Host**: Heroku\
**RESTful API**: Polygon.io (free-tier)\
**Database**: MongoDB with Mongoose ORM\
**UI library**: material-ui/@core\

## Features and functionality
### Front end components
- Navbar: generates app name, click for return to home page
- Search: generates text input and search button, manages search function    
  - Result: generates search result components
    - News: generates container for news articles if any
      - Article: generates individual articles
    - CoinData: generates coin data (ticker, name, open/close price) and button/function to add coin to watch list
    - WatchList: generates user's watch list

### Front end services (API calls via Axios)
- `getHome`: returns home page
- `refreshList`: returns updated array of `CoinDB` with most recent coin closing price\
*the decision to use a refresh button was due to the API limitations of free-tier, ideally would prefer watch list to display most up-to-date information utilizing calls with each render*
- `getList`: returns object with unique list ID and array of `CoinDB`
- `createList`: returns new unique list ID associated with new document on MongoDB
- `updateList`: returns updated `CoinDB` array if user adds/deletes coin from their watch list
- `getCoin`: returns formatted `CoinInfo` object after calling to Polygon.io API
- `getCoinNews`: returns formatted `CoinNews` object with max 5 articles after calling to Polygon.io API
- `searchService`: returns array of `CoinName` objects with max 10 search results after calling to Polygon.io API

### Front end design decisions
- `universal-cookies` used to store cookies in user's local browser under the key `marketoListID`
  - When the app is first run, `useEffect` checks for existing cookie
  - If a cookie exists, the value is taken and an API call is made to get the corresponding watch list
  - If a cookie does not exist, `uuid` is used to generate an ID and an API call is made to create a new database document with that ID
  - This allows for a simplier implmentation of list-tracking without a login system
- Single paged app design
  - When designing, had considered creating unique url paths for each coin, however, chose to keep it <br>
  as a single paged app due to simplicity of design and limited available coin data

### UI considerations
- Accessibility: 97% compliant per [WebAccessibility by LevelAccess](https://www.webaccessibility.com/)
  - Primary goal was appropriate color contrast, clean design, readable text, organized header usage
  - Future improvements include having all website features be keyboard-only accessible 
- Organization of data: utilizes FlexboxCSS to organize data into intuitive components
- `material-ui/core`: various text field, buttons, icons, and popover built from this library
- User-action feedback: buttons and `<div>` components that are interactive will respond with color change<br>
or size change as feedback to user clicks

### Back end database (MongoDB)
- NoSQL database chosen for flexibility and convenience for storing arrays of objects
- Current system design does not require the rigor of ACID compliancy of SQL databases 
- Schema/model for document in `marketolists`
  - `url:string` holds the UUID that is created and stored in user's cookies
  - `coins`: holds array of `CoinDB` objects, each representing a coin on user's watch list

### Back end controllers (Express/Axios)
- Uses `express.Router()` to create `/api` routes that correlate to front end services
- Axios is used within certain routes in order to make 3rd party API calls to Polygon.io
  - Functions include: getting coin search results based on a string, coin data relative to USD, and news specific coins
- Mongoose is used to communicate to MongoDB to get saved user list data (search done via listID/UUID)
  - Functions include: creating, reading, updating, and deleting data from MongoDB
- Data returned is process and re-organized in order to match front-end use cases (*see next section on types*)

### Typescript types (shared across entire app)
- Backend organization: `PolygonData`, `PolygonCoinData`, `Trades`, `PolygonCoinNews`
  - All structured to match format of JSON returned from 3rd party API 
- Data organization across stack: 
  - `CoinName`: subset of `PolygonData` that stores ticker, name, base currency symbol, and base currency name
  - `CoinInfo`: subset of `PolygonCoinData` that stores symbol/ticker, date, and open/closing price
  - `CoinNews`: subset of `PolygonCoinNews` that stores title, author, article url, description, and keywords
    - keywords was considered for a use-case that was later dropped
  - `CoinDB`: mix of data across API returns, this is what is stored in the database 

## Instructions to run CryptoMarketo locally
`git clone` the `cryptomarketo-app-BE` repository then run `npm run start`\
This front end repository is for viewing components prior to `npm run build`
