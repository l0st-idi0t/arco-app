# arco-app

## About the App

- The `App` component uses the `react-table` library for creating a dynamic table with features like sorting, filtering, and column-based searching.
- The `columns.js` file defines the structure of the table columns, including a custom filter component, `filterForm.js`, used for each column which provides a simple input field for users to filter data within each column.
- Data is fetched from the dataset.csv file using the `fetch` API and parsed with the `Papa.parse` library.
- Users can search for specific incidents or apply multiple filters to look for very specific sets of incidents.

### The app is deployed on Vercel, visit here: https://arco-app.vercel.app
