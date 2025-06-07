# Brewson Project - Copilot Instructions

## Global Development Guidelines

### Runtime & Package Manager
- Always use **Bun** instead of Node.js for running scripts and managing packages
- Use `bun install`, `bun run`, `bun dev`, etc. instead of npm/yarn equivalents

### Language & Documentation
- Write all comments, documentation, and captions in **English**
- Maintain consistent English terminology throughout the codebase

### TypeScript Code Style
- **Always use semicolons (`;`) at the end of TypeScript statements**
- Follow consistent semicolon usage across all `.ts`, `.vue`, and `.js` files
- This applies to variable declarations, function calls, imports, exports, and all other statements

### HTML/Vue Template Formatting
- **Never concatenate HTML tags on the same line**
- Always place opening and closing tags on separate lines for better readability
- Use proper indentation for nested HTML elements
- Exception: Short inline elements with minimal content can stay on one line

Good formatting:
```vue
<v-btn
  variant="outlined"
  color="primary"
  @click="handleClick"
>
  Click Me
</v-btn>
```

Bad formatting (tags concatenated):
```vue
<v-btn variant="outlined" color="primary" @click="handleClick">Click Me</v-btn>
```

### Command Line Instructions
- Provide PowerShell-compatible commands since this is a Windows development environment
- Avoid Linux bash syntax and commands
- Format shell commands using PowerShell syntax

Example command formatting:
```powershell
# PowerShell command (Windows)
mkdir -Path "layers/[example-name]/pages/example", "layers/[example-name]/components", "layers/[example-name]/composables", "layers/[example-name]/assets"
```

### File Operations
- Use Windows-style path separators when suggesting file paths
- Consider PowerShell cmdlets for file and directory operations
