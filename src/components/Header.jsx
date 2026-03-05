function Header({ darkMode, setDarkMode }) {
  return (
    <header className="header">
      <h1>Todo App</h1>
      <button className="theme-btn" onClick={() => setDarkMode(!darkMode)}>
        {darkMode ? "Light Mode" : "Dark Mode"}
      </button>
    </header>
  );
}

export default Header;
