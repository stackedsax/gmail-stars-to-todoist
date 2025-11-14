# Contributing to Gmail Stars to Todoist

Thank you for your interest in contributing! This project helps automate the creation of Todoist tasks from starred Gmail messages.

## Getting Started

1. Fork the repository
2. Clone your fork locally
3. Install dependencies: `npm install`
4. Follow the setup instructions in the README

## Development Workflow

1. **Local Development**:
   - Edit `Code.js` with your changes
   - Test your changes by pushing to Apps Script: `npm run push`
   - Run the function manually in the Apps Script editor

2. **Testing**:
   - Star some test emails in Gmail
   - Run the script to ensure it works correctly
   - Check that tasks are created properly in Todoist
   - Verify emails are unstarred after processing

3. **Code Style**:
   - Follow existing code conventions
   - Use meaningful variable names
   - Add comments for complex logic
   - Keep functions focused and single-purpose

## Submitting Changes

1. Create a feature branch from `main`
2. Make your changes
3. Test thoroughly with real Gmail messages
4. Update documentation if needed
5. Submit a pull request with:
   - Clear description of changes
   - Why the change is needed
   - How you tested it

## Ideas for Contributions

- **Enhanced Email Processing**: Better HTML parsing, attachment handling
- **Configuration Options**: Customizable labels, project assignment
- **Error Handling**: Better error messages, retry logic
- **Filters**: Process only certain types of emails
- **Batch Processing**: Handle large numbers of starred messages efficiently
- **Documentation**: Improve setup instructions, add troubleshooting guides

## Reporting Issues

If you find a bug or have a feature request:

1. Check existing issues first
2. Create a new issue with:
   - Clear description of the problem
   - Steps to reproduce
   - Expected vs actual behavior
   - Your environment (browser, OS)

## Questions?

Feel free to open an issue for questions about development, usage, or contributions.

## Code of Conduct

Be respectful and constructive in all interactions. This project aims to be welcoming to contributors of all skill levels.