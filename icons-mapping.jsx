import {
   TextFont24Regular,
   TextCaseTitle24Regular,
   TextCaseUppercase24Regular,
   Clock24Regular,
   ClockAlarm24Regular,
} from "@fluentui/react-icons";
// Import from the original package using the alias
// This must use @mui/icons-material-original to avoid circular dependency
import {
   AbcRounded as AbcRoundedIcon,
   AcUnit as AcUnitIcon,
   AcUnitOutlined as AcUnitOutlinedIcon,
   AcUnitRounded as AcUnitRoundedIcon,
   AcUnitSharp as AcUnitSharpIcon,
   AcUnitTwoTone as AcUnitTwoToneIcon,
} from '@mui/icons-material-original';

export const Abc = TextFont24Regular;
export const AbcOutlined = TextCaseTitle24Regular;
export const AbcRounded = AbcRoundedIcon;
export const AbcSharp = TextCaseUppercase24Regular;
export const AbcTwoTone = TextCaseTitle24Regular;

// AcUnit icons - no FluentUI mapping, use original MUI icons
export const AcUnit = AcUnitIcon;
export const AcUnitOutlined = AcUnitOutlinedIcon;
export const AcUnitRounded = AcUnitRoundedIcon;
export const AcUnitSharp = AcUnitSharpIcon;
export const AcUnitTwoTone = AcUnitTwoToneIcon;

// AccessAlarm icons - mapped to FluentUI icons
export const AccessAlarm = Clock24Regular;
export const AccessAlarmOutlined = Clock24Regular;
export const AccessAlarmRounded = Clock24Regular;
export const AccessAlarmSharp = ClockAlarm24Regular;
export const AccessAlarmTwoTone = Clock24Regular;

// AccessAlarms icons - mapped to FluentUI icons
export const AccessAlarms = Clock24Regular;
export const AccessAlarmsOutlined = Clock24Regular;
export const AccessAlarmsRounded = Clock24Regular;
export const AccessAlarmsSharp = Clock24Regular;
export const AccessAlarmsTwoTone = ClockAlarm24Regular;
