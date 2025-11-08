# Cafe Locator 

Course: CS 321 — Software Engineering  
Team: Aidan Emden | Mahina Khan | Mahnaz Behrouzi

Sprint 1 Feature: **Real-Time Amenities & Crowd Filter**

Cafe Locator is a small web app that helps students and remote workers quickly find a café that fits their work/study needs. It lets users filter cafés by outlets, Wi-Fi quality, noise level, and crowd level, and see a simple details view with live signals and quick reports.

---

## 1. What this app does

**Sprint 1 scope = one feature with four user stories:**

- **US-1: Finder Filters (Student)**  
  Filter cafés by:
  - Outlets available
  - Wi-Fi quality (Any / Fast only)
  - Noise level (Any / Quiet only)

- **US-2: Live Crowd (Remote Worker)**  
  See crowd level and call-readiness:
  - Max crowd filter: Any / Only low / Low + medium  
  - Cards show `Crowd: low/medium/high` and `Good for calls / Not great for calls`

- **US-3: Quick Report (Visitor)**  
  On the details screen:
  - Tap chips to report **Noise (quiet/normal/loud)**  
  - **Seating (few/many)**  
  - **Wi-Fi (OK/weak)**  
  - Submit updates the café’s recent reports and “updated just now”

- **US-4: Details View (First-time User)**  
  Shows for the selected café:
  - Name and distance  
  - Amenity badges (Outlets, Wi-Fi, Noise)  
  - Live crowd + call-readiness text  
  - Recent reports (last 3 quick reports)  
  - **Navigate** button (currently shows an alert)

All data is stored in a simple in-memory `CAFES` array and React state (no backend yet).

---

## 2. Tech stack

- **Front-end:** React + Vite
- **Language:** JavaScript (ES6+)
- **Tooling:** npm

---

## 3. Getting started (local development)

> Requirements: Node.js + npm installed.

```bash
# clone the repo
git clone https://github.com/aemden/cafelocator.git
cd cafelocator

# install dependencies
npm install

# run the dev server
npm run dev
