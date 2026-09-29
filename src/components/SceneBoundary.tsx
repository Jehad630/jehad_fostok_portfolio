import { Component, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
  onError: () => void;
}

/** If WebGL is unavailable or the scene crashes, drop it and let the page continue. */
export class SceneBoundary extends Component<Props, { failed: boolean }> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch() {
    this.props.onError();
  }

  render() {
    return this.state.failed ? null : this.props.children;
  }
}
