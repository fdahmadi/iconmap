import * as MuiIcons from '@mui/icons-material';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Mapping rules from MUI icon names to Fluent UI icon names
// This is a heuristic mapping based on common naming patterns
const muiToFluentMapping = {
  'Home': 'Home24Regular',
  'Favorite': 'Heart24Regular',
  'Settings': 'Settings24Regular',
  'Search': 'Search24Regular',
  'Notifications': 'Alert24Regular',
  'Person': 'Person24Regular',
  'ShoppingCart': 'Cart24Regular',
  'Email': 'Mail24Regular',
  'Phone': 'Phone24Regular',
  'LocationOn': 'Location24Regular',
  'Star': 'Star24Regular',
  'ThumbUp': 'ThumbLike24Regular',
  'Share': 'Share24Regular',
  'Delete': 'Delete24Regular',
  'Edit': 'Edit24Regular',
  'Add': 'Add24Regular',
  'Close': 'Dismiss24Regular',
  'Menu': 'PanelLeft24Regular',
  'ArrowBack': 'ArrowLeft24Regular',
  'CloudUpload': 'CloudArrowUp24Regular',
};

// Function to convert MUI icon name to potential Fluent UI name
const convertMuiToFluentName = (muiName) => {
  // Remove common suffixes (Outlined, Rounded, Sharp, TwoTone)
  const baseName = muiName
    .replace(/Outlined$/, '')
    .replace(/Rounded$/, '')
    .replace(/Sharp$/, '')
    .replace(/TwoTone$/, '')
    .replace(/Filled$/, '');

  // Check if we have a direct mapping
  if (muiToFluentMapping[baseName]) {
    return muiToFluentMapping[baseName];
  }

  // Try to find a Fluent UI icon by converting the name
  // Common patterns:
  // - Remove "Icon" suffix if present
  // - Convert camelCase to PascalCase
  // - Add "24Regular" suffix
  
  // Common name conversions
  const nameConversions = {
    'AccessAlarm': 'ClockAlarm24Regular',
    'AccessTime': 'Clock24Regular',
    'AccountCircle': 'PersonCircle24Regular',
    'AddCircle': 'AddCircle24Regular',
    'AddCircleOutline': 'AddCircle24Regular',
    'Airplane': 'Airplane24Regular',
    'AirplanemodeActive': 'Airplane24Regular',
    'Alarm': 'ClockAlarm24Regular',
    'Album': 'Album24Regular',
    'Apps': 'Apps24Regular',
    'Archive': 'Archive24Regular',
    'ArrowDownward': 'ArrowDown24Regular',
    'ArrowForward': 'ArrowRight24Regular',
    'ArrowUpward': 'ArrowUp24Regular',
    'AttachFile': 'Attach24Regular',
    'AttachMoney': 'Money24Regular',
    'Audiotrack': 'MusicNote24Regular',
    'Backup': 'CloudArrowUp24Regular',
    'Book': 'Book24Regular',
    'Bookmark': 'Bookmark24Regular',
    'Brightness': 'Brightness24Regular',
    'Build': 'Toolbox24Regular',
    'Camera': 'Camera24Regular',
    'CameraAlt': 'Camera24Regular',
    'Cancel': 'Dismiss24Regular',
    'Check': 'Checkmark24Regular',
    'CheckCircle': 'CheckmarkCircle24Regular',
    'ChevronLeft': 'ChevronLeft24Regular',
    'ChevronRight': 'ChevronRight24Regular',
    'Cloud': 'Cloud24Regular',
    'CloudDownload': 'CloudArrowDown24Regular',
    'Code': 'Code24Regular',
    'Computer': 'Desktop24Regular',
    'ContactMail': 'Mail24Regular',
    'ContentCopy': 'Copy24Regular',
    'Create': 'Edit24Regular',
    'Dashboard': 'Dashboard24Regular',
    'DateRange': 'Calendar24Regular',
    'DeleteForever': 'Delete24Regular',
    'Description': 'Document24Regular',
    'Directions': 'Navigation24Regular',
    'Download': 'ArrowDownload24Regular',
    'Drafts': 'Mail24Regular',
    'Email': 'Mail24Regular',
    'ExitToApp': 'SignOut24Regular',
    'ExpandMore': 'ChevronDown24Regular',
    'FileDownload': 'ArrowDownload24Regular',
    'FileUpload': 'ArrowUpload24Regular',
    'FilterList': 'Filter24Regular',
    'Folder': 'Folder24Regular',
    'FolderOpen': 'FolderOpen24Regular',
    'Fullscreen': 'FullScreenMaximize24Regular',
    'FullscreenExit': 'FullScreenMinimize24Regular',
    'GetApp': 'ArrowDownload24Regular',
    'GpsFixed': 'Location24Regular',
    'Grade': 'Star24Regular',
    'Group': 'People24Regular',
    'Headset': 'Headphones24Regular',
    'Help': 'QuestionCircle24Regular',
    'History': 'History24Regular',
    'Image': 'Image24Regular',
    'Info': 'Info24Regular',
    'KeyboardArrowDown': 'ChevronDown24Regular',
    'KeyboardArrowLeft': 'ChevronLeft24Regular',
    'KeyboardArrowRight': 'ChevronRight24Regular',
    'KeyboardArrowUp': 'ChevronUp24Regular',
    'Language': 'Translate24Regular',
    'Launch': 'Open24Regular',
    'LibraryBooks': 'Book24Regular',
    'Link': 'Link24Regular',
    'List': 'List24Regular',
    'Lock': 'Lock24Regular',
    'LockOpen': 'LockOpen24Regular',
    'MailOutline': 'Mail24Regular',
    'Map': 'Map24Regular',
    'MoreVert': 'MoreVertical24Regular',
    'MoreHoriz': 'MoreHorizontal24Regular',
    'Movie': 'Video24Regular',
    'MusicNote': 'MusicNote24Regular',
    'Navigation': 'Navigation24Regular',
    'NewReleases': 'Star24Regular',
    'Note': 'Document24Regular',
    'NoteAdd': 'DocumentAdd24Regular',
    'NotificationsNone': 'Alert24Regular',
    'OpenInNew': 'Open24Regular',
    'Pause': 'Pause24Regular',
    'PauseCircleFilled': 'Pause24Regular',
    'Payment': 'Payment24Regular',
    'PersonAdd': 'PersonAdd24Regular',
    'Photo': 'Image24Regular',
    'PhotoCamera': 'Camera24Regular',
    'PlayArrow': 'Play24Regular',
    'PlayCircleFilled': 'Play24Regular',
    'PowerSettingsNew': 'Power24Regular',
    'Print': 'Print24Regular',
    'Public': 'Globe24Regular',
    'Publish': 'Publish24Regular',
    'RadioButtonChecked': 'RadioButton24Regular',
    'RadioButtonUnchecked': 'RadioButton24Regular',
    'Refresh': 'ArrowSync24Regular',
    'Remove': 'Subtract24Regular',
    'RemoveCircle': 'SubtractCircle24Regular',
    'Restore': 'ArrowUndo24Regular',
    'Save': 'Save24Regular',
    'Schedule': 'Calendar24Regular',
    'School': 'School24Regular',
    'Send': 'Send24Regular',
    'ShoppingBasket': 'Cart24Regular',
    'ShowChart': 'Chart24Regular',
    'SkipNext': 'Next24Regular',
    'SkipPrevious': 'Previous24Regular',
    'Sort': 'ArrowSort24Regular',
    'StarBorder': 'Star24Regular',
    'Stop': 'Stop24Regular',
    'Store': 'Store24Regular',
    'Subscriptions': 'Video24Regular',
    'SupervisorAccount': 'People24Regular',
    'Sync': 'ArrowSync24Regular',
    'Tablet': 'Tablet24Regular',
    'Tag': 'Tag24Regular',
    'Theaters': 'Video24Regular',
    'ThumbDown': 'ThumbDislike24Regular',
    'Timer': 'Timer24Regular',
    'Today': 'Calendar24Regular',
    'TouchApp': 'Hand24Regular',
    'TrendingUp': 'TrendingUp24Regular',
    'Tune': 'Settings24Regular',
    'Update': 'ArrowSync24Regular',
    'Upload': 'ArrowUpload24Regular',
    'VerifiedUser': 'ShieldCheckmark24Regular',
    'VideoCall': 'Video24Regular',
    'VideoLibrary': 'Video24Regular',
    'ViewList': 'List24Regular',
    'Visibility': 'Eye24Regular',
    'VisibilityOff': 'EyeOff24Regular',
    'VolumeOff': 'SpeakerMute24Regular',
    'VolumeUp': 'Speaker24Regular',
    'Warning': 'Warning24Regular',
    'Watch': 'Watch24Regular',
    'Work': 'Briefcase24Regular',
    'ZoomIn': 'ZoomIn24Regular',
    'ZoomOut': 'ZoomOut24Regular',
  };

  // Try exact match first
  if (nameConversions[baseName]) {
    return nameConversions[baseName];
  }

  // Try to construct a Fluent UI name
  // Convert to PascalCase and add 24Regular
  let fluentName = baseName;
  
  // Common word replacements
  const wordReplacements = {
    'Alarm': 'ClockAlarm',
    'Time': 'Clock',
    'Account': 'Person',
    'Circle': 'Circle',
    'Outline': '',
    'Filled': '',
  };

  // Try to find a close match by removing common words
  for (const [muiWord, fluentWord] of Object.entries(wordReplacements)) {
    if (fluentName.includes(muiWord)) {
      fluentName = fluentName.replace(muiWord, fluentWord || '');
    }
  }

  // Default: try baseName + 24Regular
  return `${fluentName}24Regular`;
};

// Get all MUI icon names
const muiIconNames = Object.keys(MuiIcons).filter(name => {
  return (
    name !== 'default' &&
    name !== '__esModule' &&
    name[0] === name[0].toUpperCase() &&
    name[0] >= 'A' && name[0] <= 'Z'
  );
});

// Remove duplicates by base name (ignore variants)
const baseNames = new Set();
const uniqueIcons = [];

muiIconNames.forEach(name => {
  const baseName = name
    .replace(/Outlined$/, '')
    .replace(/Rounded$/, '')
    .replace(/Sharp$/, '')
    .replace(/TwoTone$/, '')
    .replace(/Filled$/, '');

  if (!baseNames.has(baseName)) {
    baseNames.add(baseName);
    uniqueIcons.push(name);
  }
});

uniqueIcons.sort();

console.log(`Found ${uniqueIcons.length} unique MUI icons (from ${muiIconNames.length} total)`);

// Generate the icons-mapping.jsx content
const generateMapping = () => {
  let content = `import React from 'react';
import * as FluentIcons from '@fluentui/react-icons';

// Wrapper component to make Fluent UI icons compatible with MUI's sx prop
const IconWrapper = ({ IconComponent, sx, ...props }) => {
  const { fontSize = 24, color, ...otherSx } = sx || {};
  // Convert fontSize to number if it's a string like "48px"
  const size = typeof fontSize === 'number' 
    ? fontSize 
    : typeof fontSize === 'string' 
      ? parseFloat(fontSize) || 24 
      : 24;
  
  // Convert sx styles to inline styles
  const style = {
    width: \`\${size}px\`,
    height: \`\${size}px\`,
    color: color,
    display: 'inline-block',
    flexShrink: 0,
    ...otherSx
  };
  
  return (
    <IconComponent
      style={style}
      {...props}
    />
  );
};

// Export icons with MUI names, wrapped for compatibility
// Auto-generated with ${uniqueIcons.length} icons
`;

  uniqueIcons.forEach((muiName) => {
    const fluentName = convertMuiToFluentName(muiName);
    // Use optional chaining and provide a fallback icon
    content += `export const ${muiName} = (props) => <IconWrapper IconComponent={FluentIcons.${fluentName} ?? FluentIcons.QuestionCircle24Regular} {...props} />;\n`;
  });

  content += `\n`;

  return content;
};

// Write to icons-mapping.jsx
const mappingContent = generateMapping();
const outputPath = path.join(__dirname, '..', 'src', 'icons-mapping.jsx');

fs.writeFileSync(outputPath, mappingContent, 'utf-8');

console.log(`✅ Successfully generated icons-mapping.jsx with ${uniqueIcons.length} icon mappings`);
console.log(`📁 Output file: ${outputPath}`);
console.log(`\n⚠️  Note: Some Fluent UI icon names may need manual adjustment if they don't exist.`);

