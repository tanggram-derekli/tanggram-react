import React from 'react';
import classNames from 'classnames';
import {makeStyles} from '@material-ui/styles';
import {TNode, TString} from '../prop_types';

const useStyles = makeStyles(theme =>({
  root: {
    textDecoration: 'none',
  },
}));

function ExternalLink({
  href,
  className,
  style,
  children,
  forwardRef,
}) {
  const classes = useStyles();

  return (
    <a ref={forwardRef} href={href} className={classNames(classes.root, className)} style={style} target='_blank' rel='noopener noreferrer'>
      {children}
    </a>
  );
}

ExternalLink.propTypes = {
  href: TString.isRequired,
  children: TNode,
};

export default React.forwardRef((props, ref) => (
  <ExternalLink {...props} forwardRef={ref}/>
));