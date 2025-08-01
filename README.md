# Next.js Weather Forecast App (HBK)

This project is a **React** client built with **Next.js** that displays weather alerts and forecasts in a grid format. It includes a set of filters and focuses on performance, accessibility, and a clean user experience.

---

## Features

- ⚡ Efficient virtualized list rendering for smooth performance with large datasets  
- 🔍 Filters persisted in the URL for consistent state across reloads 
- 📱 Responsive design optimized for mobile and desktop  
- ♿  Keyboard-accessible navigation with ARIA labels for improved screen reader support  
- 🌙 Supports dark mode on macOS 
- ✅ Includes unit tests 
---

## Performance
To handle potentially hundreds of alert entries without degrading UI responsiveness, the alert grid implements virtualized rendering using react-window. This technique ensures that only the visible rows are rendered in the DOM at any time, drastically reducing rendering overhead and improving scroll performance. The grid also uses memoization and React's useCallback to prevent unnecessary re-renders, keeping interactions smooth even with large datasets.



## Accessibility
The grid uses tabIndex={0} on each row to ensure keyboard and screen reader users can navigate all alert entries easily. ARIA labels provide meaningful descriptions for screen readers, improving context and clarity. Interactive elements like modals and filters are fully keyboard accessible and properly labeled to support assistive technologies, ensuring an inclusive user experience.


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

## 🚀 Live Demo

The project has been deployed and can be tested here:  
👉 [https://weather-forecast-k8vv.vercel.app/](https://weather-forecast-k8vv.vercel.app/)
