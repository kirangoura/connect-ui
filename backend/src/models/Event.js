const { pool } = require('../db/init');

class Event {
  static async getAll() {
    const result = await pool.query('SELECT * FROM events ORDER BY date');
    return result.rows;
  }

  static async getById(id) {
    const result = await pool.query('SELECT * FROM events WHERE id = $1', [id]);
    return result.rows[0];
  }

  static async create(event) {
    const { title, category, description, date, location, icon, max_attendees } = event;
    const result = await pool.query(
      'INSERT INTO events (title, category, description, date, location, icon, max_attendees) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      [title, category, description, date, location, icon, max_attendees]
    );
    return result.rows[0];
  }

  static async update(id, event) {
    const { title, category, description, date, location, attendees } = event;
    const result = await pool.query(
      'UPDATE events SET title = $1, category = $2, description = $3, date = $4, location = $5, attendees = $6 WHERE id = $7 RETURNING *',
      [title, category, description, date, location, attendees, id]
    );
    return result.rows[0];
  }

  static async delete(id) {
    await pool.query('DELETE FROM events WHERE id = $1', [id]);
  }

  static async joinEvent(id) {
    const event = await this.getById(id);
    if (event && event.attendees < event.max_attendees) {
      const result = await pool.query(
        'UPDATE events SET attendees = attendees + 1 WHERE id = $1 RETURNING *',
        [id]
      );
      return result.rows[0];
    }
    throw new Error('Event is full or does not exist');
  }
}

module.exports = Event;
