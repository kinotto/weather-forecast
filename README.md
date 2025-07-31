# Next.js Weather Forecast App (HBK)

This project is a **React** client built with **Next.js** that displays weather alerts and forecasts in a grid format. It includes a set of filters and focuses on performance, accessibility, and a clean user experience.

---

## Features

- Displays weather alerts in a responsive grid layout
- Multiple filters to refine displayed alerts
- Virtualized list rendering for efficient performance with large data sets
- Accessibility-friendly keyboard navigation and ARIA labels
- Date formatting and truncation for better readability

---

## Getting Started

### Install dependencies

```bash
npm install
```

### Run the client
```bash
npm run dev
```

### Run tests

```bash
npm run test
```


## Performance
To handle potentially hundreds of alert entries without degrading UI responsiveness, the alert grid implements virtualized rendering using react-window. This technique ensures that only the visible rows are rendered in the DOM at any time, drastically reducing rendering overhead and improving scroll performance. The grid also uses memoization and React's useCallback to prevent unnecessary re-renders, keeping interactions smooth even with large datasets.



## Accessibility
The grid uses tabIndex={0} on each row to ensure keyboard and screen reader users can navigate all alert entries easily. ARIA labels provide meaningful descriptions for screen readers, improving context and clarity. Interactive elements like modals and filters are fully keyboard accessible and properly labeled to support assistive technologies, ensuring an inclusive user experience.