# Technical Specification: Mega Evento Familiar

## 1. Project Overview
**Name:** Mega Evento Familiar
**Type:** Single Page Application (SPA) / Landing Page
**Goal:** Create anticipation and emotional engagement for an upcoming family reunion through a countdown timer and interactive photo memories.
**Target Audience:** Family members (mobile-first usage).

## 2. Tech Stack
*   **Core:** React 18+ (TypeScript)
*   **Build Tool:** Vite
*   **Styling:** Tailwind CSS (Utility-first)
*   **Icons:** Lucide React
*   **Deployment:** GitHub Pages
*   **Version Control:** Git

## 3. Architecture & File Structure
```
/src
  /components
    CountdownTimer.tsx   # Logic for date calculation and display
    PhotoCarousel.tsx    # Infinite scrolling photo gallery (randomized)
    InfoModal.tsx        # Modal for "What to bring?" info
    FloatingParticles.tsx # Canvas-based background animation
    Confetti.tsx         # Celebration effect (conditional)
  App.tsx                # Main layout and composition
  main.tsx               # Entry point
/public
  /photos                # Static assets (foto1.jpeg ... foto29.jpeg)
index.html               # Entry HTML with Open Graph tags
```

## 4. Key Features & Logic

### 4.1. Countdown Timer (`CountdownTimer.tsx`)
*   **Input:** Target date string (ISO format).
*   **Logic:** Calculates difference between `now` and `target`. Updates every second.
*   **Visuals:**
    *   Displays Days, Hours, Minutes, Seconds.
    *   **Flash Effect:** Components flash yellow for 2s when their value changes.
    *   **Completion:** Triggers `onComplete` callback to show "Event Started" message.

### 4.2. Evocative Photo Carousel (`PhotoCarousel.tsx`)
*   **Data Source:** Local files in `public/photos`.
*   **Behavior:**
    *   **Infinite Scroll:** CSS animation moves photos horizontally.
    *   **Randomization:** Fisher-Yates shuffle algorithm runs on mount to randomize order.
    *   **Interactivity:**
        *   **Hover:** Pauses animation, removes sepia/grayscale filter (full color).
        *   **Click:** Opens photo in full-screen modal.
*   **Responsiveness:**
    *   **Mobile:** Positioned at bottom (`items-end`).
    *   **Desktop:** Centered vertically (`items-center`).
    *   **Layering:** `z-index: 1` to sit above particles but below main content.

### 4.3. Background Atmosphere (`FloatingParticles.tsx`)
*   **Implementation:** HTML5 Canvas.
*   **Logic:** Particles move randomly and draw connecting lines when close to each other (simulating bonds).
*   **Performance:** `pointer-events-none` to avoid blocking interactions.

### 4.4. Social Sharing
*   **Open Graph:** Configured in `index.html`.
*   **Image:** Uses `foto20.jpeg` as the preview thumbnail for WhatsApp/Facebook.

## 5. Design System
*   **Typography:** Montserrat (Headings), Poppins (Body).
*   **Colors:**
    *   Primary Gradient: Indigo -> Purple -> Pink.
    *   Accents: Yellow/Orange (for highlights and timer flash).
*   **Effects:** Glassmorphism (backdrop-blur), Floating animations, Pop-in transitions.

## 6. Future Roadmap (Potential)
*   [ ] Background Music (Audio API).
*   [ ] WhatsApp Share Button (Deep link).
*   [ ] Interactive Timeline (Vertical scroll).
*   [ ] Gemini AI Integration (Storytelling/Oracle).
