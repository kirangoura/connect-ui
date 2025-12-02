import React from 'react';

function Categories({ onCategoryFilter }) {
  const categories = [
    {
      id: 1,
      icon: '🎉',
      title: 'Events',
      description: 'Coffee meetups, dinner parties, game nights, book clubs, art workshops, music jams, and more'
    },
    {
      id: 2,
      icon: '⚽',
      title: 'Sports',
      description: 'Basketball, soccer, tennis, hiking, volleyball, and team sports'
    },
    {
      id: 3,
      icon: '💪',
      title: 'Fitness',
      description: 'Running clubs, yoga sessions, gym buddies, cycling groups, and wellness activities'
    }
  ];

  const handleCategoryClick = (categoryName) => {
    // Apply the category filter
    onCategoryFilter?.(categoryName);
    
    // Scroll to events section
    const element = document.getElementById('events');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="categories" id="sports">
      <div className="container">
        <h2 className="section-title">What Do You Want To Do?</h2>
        <div className="category-grid">
          {categories.map((category) => (
            <div 
              key={category.id} 
              className="category-card"
              onClick={() => handleCategoryClick(category.title)}
              style={{ cursor: 'pointer' }}
            >
              <div className="category-icon">{category.icon}</div>
              <h3>{category.title}</h3>
              <p>{category.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Categories;
