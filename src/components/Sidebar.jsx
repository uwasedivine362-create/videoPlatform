const categories = ["New", "Coding", "Music", "Gaming", "News", "Live", "Sport", "Education", "Fashion", "Science"];

function Sidebar({ selectedCategory, setSelectedCategory }) {
  return (
    <div className="sidebar">
      {categories.map((cat) => (
        <button
          key={cat}
          className={`sidebar-btn ${selectedCategory === cat ? "active" : ""}`}
          onClick={() => setSelectedCategory(cat)}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}

export default Sidebar;
