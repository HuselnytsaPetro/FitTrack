const API_URL = import.meta.env.VITE_API_URL

class ApiClient {
  constructor() {
    this.baseURL = API_URL;
  }

  getToken() {
    return localStorage.getItem('token');
  }
  setToken(token) {
    localStorage.setItem('token', token);
  }
  removeToken() {
    localStorage.removeItem('token');
  }
  getProfile() {
    return this.request('/auth/profile');
  }
  logout() {
    this.removeToken();
  }

  async request(endpoint, options = {}) {
    const token = this.getToken();
    const headers = { 'Content-Type': 'application/json', ...options.headers };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const config = { ...options, headers };

    const response = await fetch(`${this.baseURL}${endpoint}`, config);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Something went wrong');
    }
    return data;
  }

  async register(email, password) {
    const data = await this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    if (data.token) this.setToken(data.token);
    return data;
  }

  async login(email, password) {
    const data = await this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    if (data.token) this.setToken(data.token);
    return data;
  }

  async getWorkouts(category = 'All', title = '') {
    const titleParam = title.trim() || 'all';
    return this.request(`/workouts/${category}/${titleParam}`);
  }

  async getStats(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/stats${queryString ? `?${queryString}` : ''}`);
  }

  async createStat(data) {
    const payload = {
      workoutDate: data.date,
      workoutType: data.type,
      duration: data.duration,
      notes: data.notes,
      rpe: data.rpe,
    };

    return this.request('/stats', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  }

  async deleteStat(id) {
    return this.request(`/stats/${id}`, {
      method: 'DELETE',
    });
  }
}

export const apiClient = new ApiClient();
