# Movie Search App

A React-based web application to search for movies and view details, powered by the OMDb API.

## Features

- **Dynamic Default Movies:** Shows a random selection of popular movies on the home page.
- **Search:** Find movies by title using the search bar.
- **Movie Details:** Click any movie card to view more information.
- **Loading & Error States:** User-friendly feedback for loading and errors.
- **Responsive Design:** Works well on desktop and mobile devices.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16 or newer recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### OMDb API Key

1. Get a free API key from [OMDb API](https://www.omdbapi.com/apikey.aspx).
2. Create a `.env` file in the `Movie` directory:
   ```
   VITE_OMDB_API_KEY=your_api_key_here
   ```

### Installation

```bash
npm install
```

### Running the App

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Project Structure

```
Movie/
├── src/
│   ├── App.jsx
│   ├── App.css
│   ├── components/
│   │   ├── movieCard.jsx
│   │   └── movieDetails.jsx
│   └── ...
├── public/
├── README.md
└── ...
```

## Technologies Used

- React
- OMDb API
- CSS

## Customization

- Edit the `popularKeywords` array in `App.jsx` to change the pool of default movies.
- Style the app by modifying `App.css`.

## License

This project is for educational purposes.
