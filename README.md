# 🤖 Eko Agent - AI-Powered Browser Automation Extension

<div align="center">

![Version](https://img.shields.io/badge/version-3.0-blue.svg)
![Chrome Extension](https://img.shields.io/badge/Chrome-Extension-green.svg)
![License](https://img.shields.io/badge/license-MIT-blue.svg)
![AI Powered](https://img.shields.io/badge/AI-Powered-purple.svg)

*An intelligent Chrome extension that automates browser tasks through natural language commands with user confirmation workflow*

[Installation](#-installation) • [Features](#-features) • [Usage](#-usage) • [Documentation](#-documentation) • [Contributing](#-contributing)

</div>

## 🌟 Overview

**Eko Agent** is a cutting-edge Chrome extension that revolutionizes browser automation by combining AI intelligence with user control. Simply describe what you want to do in plain English, and let the AI generate a detailed execution plan that you can review, modify, and approve before execution.

### 🎯 Key Highlights

- **🧠 AI-Driven Planning**: Advanced AI analyzes your natural language commands and generates detailed browser automation workflows
- **🔍 Interactive Confirmation**: Review and modify AI-generated plans before execution
- **🛡️ Enhanced Security**: Prevents unwanted actions with mandatory user approval
- **📱 Intuitive Interface**: Clean sidebar interface with real-time feedback
- **🔧 Fully Customizable**: Edit execution plans to match your exact requirements
- **🌐 Universal Compatibility**: Works on any website with comprehensive browser API access

## ✨ Features

### 🤖 Intelligent Automation
- **Natural Language Processing**: Understands complex instructions in plain English
- **Smart Plan Generation**: Creates detailed step-by-step execution workflows
- **Context Awareness**: Analyzes webpage content to optimize automation strategies

### 🔐 Workflow Confirmation System
- **📋 Plan Preview**: View complete execution plans before running
- **✏️ Interactive Editing**: Modify plans directly in the interface with syntax highlighting
- **✅ Three-Action Workflow**: 
  - **Confirm & Execute**: Proceed with the original AI plan
  - **Apply Changes**: Execute your modified version
  - **Cancel**: Stop the task entirely

### 🎨 User Experience
- **🖥️ Side Panel Integration**: Seamlessly integrated Chrome side panel
- **⚙️ Customizable Settings**: Comprehensive options page for personalization
- **🔔 Real-time Notifications**: Live updates on task progress
- **📊 Activity Logging**: Detailed logs for debugging and learning

### 🛠️ Technical Capabilities
- **Universal Web Access**: Works on any website (`<all_urls>` permission)
- **Advanced Scripting**: Content script injection for deep webpage interaction
- **State Management**: Persistent storage for settings and task history
- **Background Processing**: Efficient service worker architecture

## 🚀 Installation

### Chrome Web Store (Recommended)
*Coming soon - currently in development*

### Manual Installation (Developer Mode)

1. **Download the Extension**
   ```bash
   git clone https://github.com/CaoZhiGordon/eko-agent.git
   cd eko-agent
   ```

2. **Enable Developer Mode**
   - Open Chrome and navigate to `chrome://extensions/`
   - Toggle "Developer mode" in the top right corner

3. **Load the Extension**
   - Click "Load unpacked"
   - Select the `dist` folder from the cloned repository
   - The Eko Agent icon should appear in your Chrome toolbar

4. **Access the Extension**
   - Click the Eko Agent icon to open the side panel
   - Navigate to `chrome://extensions/` and click "Options" under Eko Agent for settings

## 💡 Usage

### Quick Start

1. **Open Side Panel**
   - Click the Eko Agent icon in your Chrome toolbar
   - The side panel will open with the main interface

2. **Enter Your Command**
   ```
   Example commands:
   - "Open Twitter, search for 'AI news' and like the first post"
   - "Find all product links on this page and save them"
   - "Fill out the contact form with my default information"
   - "Navigate to the checkout page and apply coupon code 'SAVE10'"
   ```

3. **Review AI Plan**
   - After clicking "Run", the AI will generate a detailed execution plan
   - The plan appears in a blue confirmation box with editable text

4. **Make Your Choice**
   - **✅ Confirm & Execute**: Use the AI's original plan
   - **✏️ Apply Changes**: Use your modified version (edit the text first)
   - **❌ Cancel**: Stop the task

5. **Watch It Work**
   - The extension will execute the approved plan step by step
   - Monitor progress through real-time logs and notifications

### Advanced Usage

#### Custom Plan Modification
```xml
<!-- Example AI-generated plan you can edit -->
<workflow>
  <step action="click" selector="#search-box">Click search box</step>
  <step action="type" text="AI news">Enter search term</step>
  <step action="click" selector="button[type='submit']">Submit search</step>
  <step action="wait" duration="2000">Wait for results</step>
  <step action="click" selector=".tweet .like-button">Like first post</step>
</workflow>
```

#### Batch Operations
- Create complex multi-step workflows
- Chain multiple actions across different pages
- Set conditional logic and error handling

## 📁 Project Structure

```
eko-agent/
├── 📄 manifest.json          # Extension configuration
├── 🖼️ icon.ico               # Extension icon
├── 📁 js/
│   ├── 🧠 background.js       # Main extension logic (service worker)
│   ├── 📝 content_script.js   # Webpage interaction script
│   ├── 🎛️ sidebar.js          # Side panel UI logic
│   ├── ⚙️ options.js          # Settings page logic
│   ├── 📚 vendor.js           # Third-party libraries
│   └── 📜 vendor.js.LICENSE.txt
├── 📄 sidebar.html           # Side panel interface
├── 📄 options.html           # Settings page
├── 📄 test.html              # Testing and demo page
└── 📚 README.md              # This documentation
```

## 🧪 Testing & Development

### Test Environment

The extension includes a comprehensive test page (`test.html`) with:
- Interactive elements (buttons, links, forms)
- Sample workflows for testing
- Visual feedback for user actions

### Testing Workflow

1. **Load Test Page**
   ```bash
   # Open in Chrome after installing the extension
   file:///path/to/eko-agent/test.html
   ```

2. **Try Sample Commands**
   - "Click on the first test link"
   - "Fill in the input field with 'Hello World'"
   - "Select option 2 from the dropdown"

3. **Verify Functionality**
   - ✅ AI plan generation
   - ✅ Confirmation interface appears
   - ✅ Plan editing works correctly
   - ✅ All three action buttons function
   - ✅ Logs show appropriate messages

## 🔧 Configuration

### Extension Permissions

The extension requires these permissions for full functionality:

- **`tabs`**: Access browser tabs
- **`activeTab`**: Interact with current page
- **`windows`**: Manage browser windows
- **`sidePanel`**: Display side panel interface
- **`storage`**: Save settings and preferences
- **`scripting`**: Execute content scripts
- **`alarms`**: Schedule background tasks
- **`notifications`**: Show user notifications
- **`<all_urls>`**: Universal website access

### Settings Options

Access via `chrome://extensions/` → Eko Agent → Options:

- 🔧 **Automation Settings**: Configure AI behavior and response times
- 🎨 **Interface Themes**: Customize appearance and layout
- 🔔 **Notifications**: Control alert preferences
- 📊 **Logging Level**: Set verbosity for debugging
- 🛡️ **Security Options**: Configure confirmation requirements

## 🛡️ Security & Privacy

### Safety Features

- **Mandatory Confirmation**: All actions require explicit user approval
- **Plan Transparency**: Complete visibility into AI decision-making
- **Local Processing**: Sensitive data handled locally when possible
- **Permission Control**: Granular control over extension capabilities

### Privacy Policy

- **No Data Collection**: Personal information is not stored or transmitted
- **Local Storage Only**: Settings and preferences stored locally
- **Open Source**: Full code transparency for security audit
- **User Control**: Complete control over what actions are performed

## 🤝 Contributing

We welcome contributions from the community! Here's how to get involved:

### Development Setup

```bash
# Clone the repository
git clone https://github.com/CaoZhiGordon/eko-agent.git
cd eko-agent

# Install development dependencies (if any)
npm install

# Load in Chrome Developer Mode
# Navigate to chrome://extensions/
# Enable Developer Mode → Load unpacked → Select 'dist' folder
```

### Contribution Guidelines

1. **Fork the Repository**
   - Create your feature branch: `git checkout -b feature/amazing-feature`
   - Make your changes with clear, descriptive commits
   - Test your changes thoroughly

2. **Submit a Pull Request**
   - Push to your fork: `git push origin feature/amazing-feature`
   - Open a pull request with a detailed description
   - Include screenshots or videos for UI changes

3. **Code Standards**
   - Follow existing code style and conventions
   - Add comments for complex logic
   - Update documentation for new features
   - Ensure all tests pass

### Areas for Contribution

- 🐛 **Bug Fixes**: Help identify and fix issues
- ✨ **New Features**: Add functionality and improvements
- 📚 **Documentation**: Improve guides and examples
- 🧪 **Testing**: Expand test coverage and scenarios
- 🌐 **Localization**: Add support for multiple languages
- 🎨 **UI/UX**: Enhance user interface and experience

## 📊 Roadmap

### Version 3.1 (Next Release)
- [ ] **Template System**: Save and reuse common automation patterns
- [ ] **Enhanced AI Models**: Support for multiple AI providers
- [ ] **Batch Processing**: Queue multiple tasks for sequential execution
- [ ] **Visual Plan Editor**: Drag-and-drop workflow builder

### Version 3.2 (Future)
- [ ] **Machine Learning**: Learn from user modifications and preferences
- [ ] **Cross-Browser Support**: Firefox and Safari compatibility
- [ ] **API Integration**: Connect with external services and APIs
- [ ] **Collaborative Features**: Share automation workflows

### Long-term Vision
- [ ] **Mobile Support**: Extend to mobile browsers
- [ ] **Voice Commands**: Voice-controlled browser automation
- [ ] **Enterprise Features**: Team management and analytics
- [ ] **Plugin Ecosystem**: Third-party extension support

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2024 Eko Agent Contributors

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
```

## 🙏 Acknowledgments

- **Chrome Extension APIs**: For providing robust browser automation capabilities
- **Open Source Community**: For inspiration and best practices
- **Beta Testers**: For valuable feedback and bug reports
- **Contributors**: Everyone who has helped improve this project

## 📞 Support

### Get Help

- 📋 **Issues**: [GitHub Issues](https://github.com/CaoZhiGordon/eko-agent/issues)
- 💬 **Discussions**: [GitHub Discussions](https://github.com/CaoZhiGordon/eko-agent/discussions)
- 📧 **Email**: [caozhi0812@gmail.com](mailto:caozhi0812@gmail.com)

### Troubleshooting

**Common Issues:**

1. **Extension not loading**
   - Ensure Developer Mode is enabled
   - Check browser console for errors
   - Verify all files are present

2. **AI not responding**
   - Check network connection
   - Verify permissions are granted
   - Review extension logs

3. **Automation not working**
   - Confirm target website allows automation
   - Check for page load timing issues
   - Verify selectors are correct

---

<div align="center">

**Made with ❤️ by the Eko Agent Team**

⭐ **Star this repo if you find it useful!** ⭐

</div>
