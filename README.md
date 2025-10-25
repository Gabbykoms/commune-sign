# Commune Sign

A sign language extension for people who are hard of hearing, built with React and TypeScript.

## Features

- **Real-time Sign Language Generation**: Convert text to sign language animations
- **Multiple Sign Language Support**: ASL, BSL, and AUSLAN
- **Accessible Design**: High contrast mode, reduced motion, and large text options
- **Customizable Avatar**: Adjustable size, speed, and position
- **Modern UI**: Beautiful, responsive interface with smooth animations
- **Browser Extension Ready**: Designed to be packaged as a browser extension

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd commune-sign
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Project Structure

```
src/
├── components/
│   ├── SignLanguageAvatar.tsx    # 3D avatar for sign language display
│   ├── ControlPanel.tsx          # Controls for speed, size, language
│   ├── TextInput.tsx             # Text input for conversion
│   └── SettingsPanel.tsx         # Advanced settings modal
├── App.tsx                       # Main application component
├── index.tsx                     # Application entry point
└── index.css                     # Global styles with Tailwind CSS
```

## Technology Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Lucide React** - Icons
- **Three.js** - 3D graphics (planned)

## Usage

1. **Activate the Extension**: Click the "Active" button to enable sign language conversion
2. **Enter Text**: Type or paste text in the input field
3. **Choose Language**: Select your preferred sign language (ASL, BSL, AUSLAN)
4. **Adjust Settings**: Use the controls to modify speed, size, and other preferences
5. **View Signs**: Watch the avatar perform the sign language for your text

## Accessibility Features

- **High Contrast Mode**: Enhanced visibility for users with visual impairments
- **Reduce Motion**: Option to minimize animations for users with vestibular disorders
- **Large Text**: Increased font sizes for better readability
- **Keyboard Navigation**: Full keyboard accessibility
- **Screen Reader Support**: Proper ARIA labels and semantic HTML

## Future Enhancements

- **3D Avatar**: Replace canvas placeholder with Three.js 3D model
- **Speech Recognition**: Real-time speech-to-sign conversion
- **Video Integration**: Overlay signs on video content
- **Mobile App**: iOS and Android applications
- **API Service**: Backend service for other platforms to integrate
- **Machine Learning**: Improved sign language accuracy with AI

## Browser Extension Development

This project is designed to be easily converted into a browser extension:

1. **Chrome Extension**: Add manifest.json and content scripts
2. **Firefox Add-on**: WebExtensions API compatibility
3. **Safari Extension**: WebKit extension framework

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, email support@commune-sign.com or join our Slack channel.

## Acknowledgments

- Sign language experts and consultants
- Accessibility advocates and testers
- Open source community contributors 