import React from 'react';
import classes from './PageHeaderLink.module.css';

interface PageHeaderLinkProps {
  link?: string;
  label: React.ReactNode;
  icon: React.ReactNode;
  children: React.ReactNode;
}

export function PageHeaderLink({ label, icon, children, link }: PageHeaderLinkProps) {
  const isAnchor = link?.startsWith('#') ?? false;

  const handleAnchorClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (!link) {
      return;
    }
    event.preventDefault();
    document.querySelector(link)?.scrollIntoView({ behavior: 'smooth' });
  };

  const content = link ? (
    <a
      href={link}
      target={isAnchor ? undefined : '_blank'}
      rel={isAnchor ? undefined : 'noreferrer'}
      onClick={isAnchor ? handleAnchorClick : undefined}
      className={classes.body}
    >
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
