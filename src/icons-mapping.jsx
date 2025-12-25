import React from 'react';
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
    width: `${size}px`,
    height: `${size}px`,
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
export const Home = (props) => <IconWrapper IconComponent={FluentIcons.Home24Regular} {...props} />;
export const Favorite = (props) => <IconWrapper IconComponent={FluentIcons.Heart24Regular} {...props} />;
export const Settings = (props) => <IconWrapper IconComponent={FluentIcons.Settings24Regular} {...props} />;
export const Search = (props) => <IconWrapper IconComponent={FluentIcons.Search24Regular} {...props} />;
export const Notifications = (props) => <IconWrapper IconComponent={FluentIcons.Alert24Regular} {...props} />;
export const Person = (props) => <IconWrapper IconComponent={FluentIcons.Person24Regular} {...props} />;
export const ShoppingCart = (props) => <IconWrapper IconComponent={FluentIcons.Cart24Regular} {...props} />;
export const Email = (props) => <IconWrapper IconComponent={FluentIcons.Mail24Regular} {...props} />;
export const Phone = (props) => <IconWrapper IconComponent={FluentIcons.Phone24Regular} {...props} />;
export const LocationOn = (props) => <IconWrapper IconComponent={FluentIcons.Location24Regular} {...props} />;
export const Star = (props) => <IconWrapper IconComponent={FluentIcons.Star24Regular} {...props} />;
export const ThumbUp = (props) => <IconWrapper IconComponent={FluentIcons.ThumbLike24Regular} {...props} />;
export const Share = (props) => <IconWrapper IconComponent={FluentIcons.Share24Regular} {...props} />;
export const Delete = (props) => <IconWrapper IconComponent={FluentIcons.Delete24Regular} {...props} />;
export const Edit = (props) => <IconWrapper IconComponent={FluentIcons.Edit24Regular} {...props} />;
export const Add = (props) => <IconWrapper IconComponent={FluentIcons.Add24Regular} {...props} />;
export const Close = (props) => <IconWrapper IconComponent={FluentIcons.Dismiss24Regular} {...props} />;
export const Menu = (props) => <IconWrapper IconComponent={FluentIcons.PanelLeft24Regular} {...props} />;
export const ArrowBack = (props) => <IconWrapper IconComponent={FluentIcons.ArrowLeft24Regular} {...props} />;
export const CloudUpload = (props) => <IconWrapper IconComponent={FluentIcons.CloudArrowUp24Regular} {...props} />;

