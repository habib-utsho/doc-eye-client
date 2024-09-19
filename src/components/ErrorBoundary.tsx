"use client";
import { Component, ReactNode } from "react";

interface ErrorBoundaryProps {
  fallback: ReactNode;
  children: ReactNode;
}
interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render(): ReactNode {
    if (this.state.hasError) {
      //   return <h1>Something went wrong.</h1>;
      return this.props.fallback;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
