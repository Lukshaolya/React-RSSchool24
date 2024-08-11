import React, { ErrorInfo } from 'react';

import styles from './Error.module.css';

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, State> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  handleThrowError = () => {
    this.setState({ hasError: true });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className={styles.error_message}>
          <h1>Something went wrong.</h1>
          <div>
            <button
              className={styles.search__btn}
              onClick={() => this.setState({ hasError: false })}
            >
              Try Again
            </button>
          </div>
        </div>
      );
    }

    return <>{this.props.children}</>;
  }
}

export default ErrorBoundary;
