import styles from '@/styles/loading-dots.module.css';

const LoadingDots = ({
  color = '#000',
  style = 'small',
  props
}: any) => {
  return (
    <div className={props}>
     <span className={style == 'small' ? styles.loading2 : styles.loading}>
      <span style={{ backgroundColor: color }} />
      <span style={{ backgroundColor: color }} />
      <span style={{ backgroundColor: color }} />
    </span>
    </div>
  );
};

export default LoadingDots;

LoadingDots.defaultProps = {
  style: 'small',
};
