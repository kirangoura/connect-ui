import React from 'react';

function Categories() {
  const categories = [
    {
      id: 1,
      icon: '🎉',
      title: 'Social Events',
      description: 'Coffee meetups, dinner parties, game nights, and more'
    },
    {
      id: 2,
      icon: '⚽',
      title: 'Sports',
      description: 'Basketball, soccer, tennis, hiking, and team sports'
    },
    {
      id: 3,
      icon: '💪',
      title: 'Fitness',
      description: 'Running clubs, yoga sessions, gym buddies, cycling groups'
    },
    {
      id: 4,
      icon: '🎨',
      title: 'Gatherings',
      description: 'Book clubs, art workshops, music jams, creative meetups'
    }
  ];

  const handleCategoryClick = (categoryName) => {
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
