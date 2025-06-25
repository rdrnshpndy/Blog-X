import React from "react";

// Dummy data for blogs
const blogs = [
  {
    id: 1,
    image: "https://picsum.photos/200",
    title: "Understanding React Hooks",
    date: "2025-06-10",
  },
  {
    id: 2,
    image: "https://picsum.photos/200",
    title: "Styling in React: Best Practices",
    date: "2025-06-08",
  },
  {
    id: 3,
    image: "https://picsum.photos/200",
    title: "JavaScript ES2025 Features",
    date: "2025-06-05",
  },
  {
    id: 4,
    image: "https://picsum.photos/200",
    title: "Dark Mode UI Design Tips",
    date: "2025-06-02",
  },
  {
    id: 5,
    image: "https://picsum.photos/200",
    title: "Deploying React Apps Easily",
    date: "2025-05-30",
  },
  {
    id: 6,
    image: "https://picsum.photos/200",
    title: "Optimizing Web Performance",
    date: "2025-05-28",
  },
  {
    id: 7,
    image: "https://picsum.photos/200",
    title: "Accessibility in Modern Web",
    date: "2025-05-25",
  },
  {
    id: 8,
    image: "https://picsum.photos/200",
    title: "State Management Simplified",
    date: "2025-05-22",
  },
];

const latestBlogs = [
  "Understanding React Hooks",
  "Styling in React: Best Practices",
  "JavaScript ES2025 Features",
];

const popularBlogs = [
  "Optimizing Web Performance",
  "Dark Mode UI Design Tips",
  "Deploying React Apps Easily",
];

const BlogPage = () => (
  <div
  className="blog-page-container"
    style={{
      display: "flex",
      background: "#111",
      minHeight: "100vh",
      width: "100%",
    }}
  >
    {/* Main Content */}
    <main
      className="blog-main"
      style={{
        flex: 1,
        padding: "2rem 0 2rem 2rem",
        boxSizing: "border-box",
      }}
    >
      <div
        className="blog-cards-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "2rem",
        }}
      >
        {blogs.map((blog) => (
          <div
            className="blog-card"
            key={blog.id}
            style={{
              background: "#222",
              borderRadius: "12px",
              overflow: "hidden",
              boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
              color: "#fff",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div
              className="blog-card-image"
              style={{
                width: "100%",
                height: "180px",
                background: "#333",
              }}
            >
              <img
                src={blog.image}
                alt={blog.title}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </div>
            <div
              className="blog-card-content"
              style={{ padding: "1.2rem" }}
            >
              <h2
                style={{
                  color: "#ff8800",
                  fontSize: "1.2rem",
                  margin: "0 0 0.5rem 0",
                }}
              >
                {blog.title}
              </h2>
              <p
                style={{
                  color: "#bbb",
                  fontSize: "0.95rem",
                  margin: 0,
                }}
              >
                Published: {blog.date}
              </p>
            </div>
          </div>
        ))}
      </div>
    </main>

    {/* Sidebar on the right */}
    <aside
      className="sidebar"
      style={{
        width: "260px",
        padding: "2rem 1rem",
        background: "none",
        color: "#fff",
        boxSizing: "border-box",
      }}
    >
      <div className="sidebar-section">
        <h3 style={{ color: "#ff8800" }}>Latest Blogs</h3>
        <ul style={{ listStyle: "none", padding: 0 }}>
          {latestBlogs.map((title, idx) => (
            <li key={idx} style={{ margin: "1rem 0", color: "#fff" }}>
              {title}
            </li>
          ))}
        </ul>
      </div>
      <div className="sidebar-section" style={{ marginTop: "2rem" }}>
        <h3 style={{ color: "#ff8800" }}>Popular Blogs</h3>
        <ul style={{ listStyle: "none", padding: 0 }}>
          {popularBlogs.map((title, idx) => (
            <li key={idx} style={{ margin: "1rem 0", color: "#fff" }}>
              {title}
            </li>
          ))}
        </ul>
      </div>
    </aside>
  </div>
);

export default BlogPage;
