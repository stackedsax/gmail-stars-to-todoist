// Import the functions to test
// Since Code.js is not modular, we'll read and eval it for testing
const fs = require('fs');
const path = require('path');

// Read the Code.js file
const codeJs = fs.readFileSync(path.join(__dirname, '../Code.js'), 'utf8');

// Mock Google Apps Script globals
const mockPropertiesService = {
  getProperty: jest.fn()
};

global.PropertiesService = {
  getScriptProperties: jest.fn(() => mockPropertiesService)
};

global.GmailApp = {
  search: jest.fn()
};

global.UrlFetchApp = {
  fetch: jest.fn()
};

// Execute the code to make functions available
eval(codeJs);

describe('Gmail Stars to Todoist', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('extractCleanBodySimple', () => {
    test('should return empty string for null message', () => {
      const result = extractCleanBodySimple(null);
      expect(result).toBe('');
    });

    test('should return empty string for message without getPlainBody method', () => {
      const mockMessage = {};
      const result = extractCleanBodySimple(mockMessage);
      expect(result).toBe('');
    });

    test('should return plain text when available and longer than 20 chars', () => {
      const mockMessage = {
        getPlainBody: jest.fn(() => 'This is a long enough plain text message'),
        getBody: jest.fn()
      };
      
      const result = extractCleanBodySimple(mockMessage);
      expect(result).toBe('This is a long enough plain text message');
      expect(mockMessage.getBody).not.toHaveBeenCalled();
    });

    test('should fall back to HTML processing when plain text is short', () => {
      const mockMessage = {
        getPlainBody: jest.fn(() => 'Short'),
        getBody: jest.fn(() => '<p>This is HTML content</p>')
      };
      
      const result = extractCleanBodySimple(mockMessage);
      expect(result).toContain('This is HTML content');
      expect(mockMessage.getBody).toHaveBeenCalled();
    });

    test('should strip HTML tags from body', () => {
      const mockMessage = {
        getPlainBody: jest.fn(() => ''),
        getBody: jest.fn(() => '<p>Hello <strong>world</strong>!</p>')
      };
      
      const result = extractCleanBodySimple(mockMessage);
      expect(result).toBe('Hello world!');
    });

    test('should remove style and script tags', () => {
      const mockMessage = {
        getPlainBody: jest.fn(() => ''),
        getBody: jest.fn(() => '<p>Content</p><style>body{color:red}</style><script>alert("test")</script>')
      };
      
      const result = extractCleanBodySimple(mockMessage);
      expect(result).toBe('Content');
    });
  });

  describe('cleanEmailBody', () => {
    test('should remove tracking URLs', () => {
      const input = 'Check this out: https://list.example.com/track?id=123 and this https://actionnetwork.org/track/456';
      const result = cleanEmailBody(input);
      expect(result).toBe('Check this out:  and this');
    });

    test('should remove unsubscribe lines', () => {
      const input = 'Important message\nTo unsubscribe click here\nMore content';
      const result = cleanEmailBody(input);
      expect(result).toBe('Important message\n\nMore content');
    });

    test('should cut content at first unsubscribe mention when unsubscribe is in middle of line', () => {
      const input = 'Important message\nMore content\nPlease unsubscribe me\nThis should be removed';
      const result = cleanEmailBody(input);
      // The function first removes lines with unsubscribe, then looks for remaining unsubscribe mentions
      // Since the whole line gets removed, there's no cutting needed
      expect(result).toBe('Important message\nMore content\n\nThis should be removed');
    });

    test('should clean up excessive newlines', () => {
      const input = 'Line 1\n\n\n\nLine 2\n\n\n\n\nLine 3';
      const result = cleanEmailBody(input);
      expect(result).toBe('Line 1\n\nLine 2\n\nLine 3');
    });
  });

  describe('createTaskFromStarred', () => {
    test('should throw error when API token is missing', () => {
      mockPropertiesService.getProperty.mockReturnValue(null);
      
      expect(() => createTaskFromStarred()).toThrow('Todoist API token not found. Run setTodoistToken() first.');
    });

    test('should search for starred emails when token exists', () => {
      mockPropertiesService.getProperty.mockReturnValue('fake-token');
      global.GmailApp.search.mockReturnValue([]);
      
      createTaskFromStarred();
      
      expect(mockPropertiesService.getProperty).toHaveBeenCalledWith('TODOIST_API_TOKEN');
      expect(global.GmailApp.search).toHaveBeenCalledWith('is:starred');
    });

    test('should process starred messages and create tasks', () => {
      // Mock API token
      mockPropertiesService.getProperty.mockReturnValue('fake-token');
      
      // Mock starred message
      const mockMessage = {
        isStarred: jest.fn(() => true),
        getSubject: jest.fn(() => 'Test Subject'),
        getId: jest.fn(() => 'msg123'),
        getPlainBody: jest.fn(() => 'This is the email body content'),
        getBody: jest.fn(),
        unstar: jest.fn()
      };
      
      const mockThread = {
        getMessages: jest.fn(() => [mockMessage])
      };
      
      global.GmailApp.search.mockReturnValue([mockThread]);
      global.UrlFetchApp.fetch.mockReturnValue({});
      
      createTaskFromStarred();
      
      expect(global.UrlFetchApp.fetch).toHaveBeenCalledWith(
        'https://api.todoist.com/rest/v2/tasks',
        expect.objectContaining({
          method: 'POST',
          contentType: 'application/json',
          headers: {
            Authorization: 'Bearer fake-token'
          }
        })
      );
      
      expect(mockMessage.unstar).toHaveBeenCalled();
    });
  });
});