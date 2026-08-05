import { TailSpin, Bars, Oval, Puff, InfinitySpin, Hourglass } from 'react-loader-spinner';

type LoaderType = 'tailSpin' | 'bars' | 'oval' | 'puff' | 'infinitySpin' | 'hourGlass';

interface LoaderProps {
  type?: LoaderType;
  color?: string;
  height?: number;
  width?: any;
  visible?: boolean;
  wrapperClass?: string;
  ariaLabel?: string;
}

const Loader = ( { type = 'oval', color = '[#A5B6B1]', height = 40, width = 40, visible = true, wrapperClass = '', ariaLabel = 'loading', ...props }: LoaderProps) => {
  const loaderProps = { color, height, width, visible, wrapperClass, ariaLabel, ...props };

  switch (type) {
    case 'tailSpin':
      return <TailSpin {...loaderProps} />;
    case 'bars':
      return <Bars {...loaderProps} />;
    case 'oval':
      return <Oval {...loaderProps} />;
    case 'puff':
      return <Puff {...loaderProps} />;
    case 'infinitySpin':
      return <InfinitySpin {...loaderProps} />;
    case 'hourGlass':
      return <Hourglass {...loaderProps} />;
    default:
      return <TailSpin {...loaderProps} />;
  }
};

export default Loader;