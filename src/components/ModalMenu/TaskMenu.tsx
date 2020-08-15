import React from 'react';
import ReactDOM from 'react-dom';

let Container: HTMLDivElement;

export class WrappedContainer extends React.Component<any> {
  readonly state = {
    isShown: true,
  };

  showModal() {
    this.setState({ isShown: true });
  }

  closeModal() {
    this.setState({ isShown: false });
  }

  render() {
    const { isShown } = this.state;
    const { position, children } = this.props;
    const { clientX, clientY } = position;

    console.log('this is children', children);
    return (
      <div className="fixed" style={{ zIndex: 100, top: `${clientY}px`, left: `${clientX}px` }}>
        <div>{isShown ? children : null}</div>
      </div>
    );
  }
}

export const taskMenu = {
  show(reactElem: React.ReactElement, { clientX, clientY }: any) {
    if (!Container) {
      Container = window.document.createElement('div');
      Container.id = 'asdfa';
    }
    window.document.body.appendChild(Container);
    ReactDOM.render(
      <WrappedContainer position={{ clientX, clientY }}>{reactElem}</WrappedContainer>,
      Container,
    );
  },
  close() {
    if (Container) {
      ReactDOM.unmountComponentAtNode(Container);
    }
  },
};
