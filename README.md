# Developer Challenge — Data Visualization App

This is a [Next.js](https://nextjs.org) project that fetches and visualizes data from [this dataset](https://dujour.squiz.cloud/developer-challenge/data). The goal is to provide a clean, interactive interface where you can explore companies by country and industry, see key stats, and get a clear overview of the data.

---

## Features

### Data Interaction

* **Filter** by `country` or `industry`.
* **Sort** by `name` or `numberOfEmployees` in both ascending and descending order.
* **Search** by company name.

### Visualizations

* Interactive chart showing employees per industry or country distribution.
* Table view with sortable and filterable rows.
* Quick stats for a snapshot of the dataset.

### Responsive Design

* **Desktop**: Multi-column layout — filters on the left, charts and tables on the right.
* **Mobile**: Stacked layout — filters at the top, visual elements below.

### UX Highlights

* Smooth transitions and animations for filters and charts.
* Clean, modern design with consistent styling.

### Tech Stack

* **Framework**: React/Next.js 15
* **Language**: TypeScript
* **Styling**: Tailwind CSS
* **Charts**: Recharts

---

## Getting Started

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) to see it in action.

---

## Bonus Features

* Pagination or infinite scroll for large datasets.
* Remember user preferences like filters, search terms, and sort order using `localStorage`.

---

## Learn More

* [Next.js Documentation](https://nextjs.org/docs)
* [Tailwind CSS Documentation](https://tailwindcss.com/docs)
* [Recharts Documentation](https://recharts.org/en-US/)

---

## Deployment

This app can be deployed easily on [Vercel](https://vercel.com/) — just follow the [Next.js deployment guide](https://nextjs.org/docs/app/building-your-application/deploying).

