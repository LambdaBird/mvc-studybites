import T from 'prop-types';
import React from 'react';

import Error from './Error';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // eslint-disable-next-line no-console
    console.error(error, errorInfo);
  }

  render() {
    const { state, props } = this;
    if (state.hasError) {
      const blockType = props?.children?.props?.element?.type;
      return <Error blockType={blockType} />;
    }

    return props.children;
  }
}

ErrorBoundary.propTypes = {
  children: T.oneOfType([T.arrayOf(T.node), T.node]).isRequired,
};

export default ErrorBoundary;
