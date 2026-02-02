# Collaborative Canvas – Real-Time Multi-User Drawing App

This project is a real-time collaborative drawing application where multiple users can draw simultaneously on a shared canvas. All drawing actions are synchronized live using WebSockets, and global undo/redo is supported across all users.

The application uses **raw HTML Canvas API** and **native WebSockets**, without any drawing or canvas libraries.

---

## 🚀 Features

- Real-time multi-user drawing
- Brush and eraser tools
- Multiple colors and adjustable stroke width
- Live cursor indicators for other users
- Global undo and redo (any user can undo any drawing)
- Deterministic canvas state across all clients

---

## 🛠️ Tech Stack

### Frontend
- HTML
- CSS
- Vanilla JavaScript
- HTML Canvas API

### Backend
- Node.js
- Native WebSockets (`ws`)

---

## 📦 Installation & Running the Project

### 1️⃣ Clone the repository

```bash
git clone <repository-url>
cd collaborative-canvas
