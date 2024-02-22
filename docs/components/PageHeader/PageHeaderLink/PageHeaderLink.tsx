import React from 'react';
import classes from './PageHeaderLink.module.css';

interface PageHeaderLinkProps {
  link?: string;
  label: React.ReactNode;
  icon: React.ReactNode;
  children: React.ReactNode;
}

export function PageHeaderLink({ label, icon, children, link }: PageHeaderLinkProps) {
  const content = link ? (
    <a href={link} target="_blank" className={classes.body} rel="noreferrer">
      <div className={classes.icon}>{icon}</div>
      <div className={classes.content}>{children}</div>
    </a>
  ) : (
    <div className={classes.body}>
      <div className={classes.icon}>{icon}</div>
      <div className={classes.content}>{children}</div>
    </div>
  );

  return (
    <div className={classes.root}>
      <div className={classes.label}>{label}</div>
      {content}
    </div>
  );
}
