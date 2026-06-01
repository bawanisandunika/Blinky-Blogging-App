import { Post } from "./types";

export const mockPosts: Post[] = [
  {
    id: "1",
    title: "The Future of Web Development in 2026",
    message: "As we move further into 2026, the lines between frontend and backend continue to blur. AI-assisted coding is now the baseline, and engineers are focusing more on architecture, UX, and system design. Let's explore what this means for the typical web developer and how to stay ahead of the curve.",
    imageUrl: "https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg"
  },
  {
    id: "2",
    title: "Mastering Tailwind CSS for Modern UIs",
    message: "Utility-first CSS framework Tailwind CSS has fundamentally changed how we build interfaces. In this post, we'll dive deep into advanced techniques, custom configurations, and how to build scalable design systems that look beautiful on every device.",
    imageUrl: "https://res.cloudinary.com/demo/image/upload/v1615582319/docs/shoes.jpg"
  },
  {
    id: "3",
    title: "State Management: Redux vs Context API",
    message: "Choosing the right state management solution is critical. We compare Redux Toolkit, React Context, and newer atomic approaches like Zustand and Jotai to help you decide the best fit for your next big React application.",
    imageUrl: "https://res.cloudinary.com/demo/image/upload/v1615579973/docs/water.jpg"
  },
  {
    id: "4",
    title: "Optimizing Core Web Vitals",
    message: "Performance is no longer optional. Learn how to optimize First Contentful Paint (FCP), Largest Contentful Paint (LCP), and Cumulative Layout Shift (CLS) using React 18 concurrent features and modern loading strategies.",
    imageUrl: "https://res.cloudinary.com/demo/image/upload/v1615580006/docs/mountains.jpg"
  }
];
