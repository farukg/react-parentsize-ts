import React from 'react';
import debounce from 'lodash/debounce';
import ResizeObserver from 'resize-observer-polyfill';

interface Props {
  className: string
  children: ( any: any ) => {}
  debounceTime: number
}

interface State {
  width: number
  height: number
  top: number
  left: number
}

export class ParentSize extends React.Component<Partial<Props>, State> {
  state: State = {
    width: 0, height: 0, top: 0, left: 0,
  };
  animationFrameID: any
  target:any
  ro:any

  componentDidMount() {
    this.ro = new ResizeObserver((entries, observer) => {
      for (const entry of entries) {
        const {
          left, top, width, height,
        } = entry.contentRect;
    this.animationFrameID = window.requestAnimationFrame(() => {
          this.resize({
            width,
            height,
            top,
            left,
          });
        });
      }
    });
    this.ro.observe(this.target);
  }

  componentWillUnmount() {
    window.cancelAnimationFrame(this.animationFrameID);
    if (this.ro) {
      this.ro.disconnect();
    }
  }

  resize = ({
    width, height, top, left,
  }: State) => {
    this.setState(() => ({
      width,
      height,
      top,
      left,
    }));
  }

  setTarget = (ref: any) => {
    this.target = ref;
  }

  render() {
    const {
      className, children, debounceTime, ...restProps
    } = this.props;
    return (
      <div
        style={{ width: '100%', height: '100%' }}
        ref={this.setTarget}
        className={className}
        {...restProps}
      >
        {children!({
          ...this.state,
          ref: this.target,
          resize: this.resize,
        })}
      </div>
    );
  }
}
