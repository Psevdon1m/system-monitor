# System Monitor

## Purpose

System Monitor is a desktop application designed to provide real-time monitoring of your computer's system resources, including CPU usage, memory usage, system uptime, and more. It features a user-friendly interface with visual indicators and customizable alerts to help users keep track of their system's performance and receive notifications when resource usage exceeds defined thresholds.

## Features

- Real-time CPU and memory usage monitoring
- Visual progress bars with smooth animations
- Customizable CPU overload alerts and notification frequency
- System information display (CPU model, OS, computer name, uptime)
- Tray icon for quick access
- Cross-platform support (Windows, macOS, Linux)

## Technologies Used

- **Electron**: For building the cross-platform desktop application
- **Node.js**: Backend logic and system resource access
- **node-os-utils**: For retrieving system statistics (CPU, memory, etc.)
- **HTML5 & CSS3**: User interface and styling
- **JavaScript**: Frontend and backend logic

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/psevdon1m/system-monitor.git
   cd system-monitor
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the application:
   ```bash
   npm start
   ```
4. Build the application:
   ```bash
   npm run package-mac
   ```

## Folder Structure

- `app/` - Contains frontend assets (HTML, CSS, JS, images, fonts)
- `main.js` - Main Electron process
- `Store.js` - Simple persistent storage for user settings
- `assets/` - Application icons

## License

This project is licensed under the MIT License.
