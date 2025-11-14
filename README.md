# Gmail Stars to Todoist

A Google Apps Script that automatically creates Todoist tasks from starred Gmail messages.

## Features

- Converts starred Gmail messages into Todoist tasks
- Extracts and cleans email content (removes HTML, tracking URLs, unsubscribe text)
- Creates tasks with email subject + "@starred" label
- Includes original email link and cleaned body text in task description
- Automatically unstars processed emails

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
npm install @google/clasp
```

### 2. Enable Google Apps Script API

1. Go to https://script.google.com/home/usersettings
2. Turn on the "Google Apps Script API" toggle

### 3. Create and Deploy Your Script

```bash
# Login to Google Apps Script
npx clasp login

# Create a new Apps Script project
npx clasp create --title "Gmail Stars to Todoist" --type standalone

# Push the code to Google Apps Script
npx clasp push

# Open in browser to configure
npx clasp open
```

### 4. Configure in Google Apps Script Editor

After running `npx clasp open`, complete these steps in the web interface:

#### Set Todoist API Token
1. Go to [Todoist Integrations](https://todoist.com/prefs/integrations) 
2. Copy your API token
3. In Apps Script, go to Project Settings → Script Properties
4. Add property: `TODOIST_API_TOKEN` with your token value

#### Set Up Gmail Permissions
1. Run the `createTaskFromStarred` function once manually
2. Grant required Gmail permissions when prompted

#### Create Trigger (Optional)
For automatic processing:
1. Go to Triggers in the left sidebar
2. Click "Add Trigger"
3. Choose `createTaskFromStarred` function
4. Select "Time-driven" trigger type
5. Choose frequency (e.g., every 5 minutes, hourly)

### 5. Local Development

After setup, you can:
- Edit code locally in `Code.js`
- Push changes: `npx clasp push`
- Deploy updates: `npx clasp deploy`
- View in browser: `npx clasp open`

## Usage

### Manual Usage
1. Star any Gmail messages you want to convert to tasks
2. Run the script (either manually or via trigger)
3. Check your Todoist for new tasks with "@starred" label

### Automatic Usage
If you set up a time-based trigger, the script will automatically:
1. Check for starred Gmail messages every X minutes/hours
2. Create Todoist tasks for any starred messages
3. Unstar the processed emails

## How It Works

1. **Find Starred Messages**: Searches Gmail for all starred messages
2. **Extract Content**: Gets subject, body text, and message ID
3. **Clean Content**: Removes HTML tags, tracking URLs, and unsubscribe text
4. **Create Task**: Posts to Todoist API with:
   - Title: `[Email Subject] @starred`  
   - Description: Link to original email + cleaned body text
5. **Cleanup**: Unstars the processed email

## Troubleshooting

- **"Todoist API token not found"**: Make sure you've set the `TODOIST_API_TOKEN` script property
- **Permission errors**: Run the function manually once to grant Gmail access
- **No tasks created**: Check if you have starred messages in Gmail