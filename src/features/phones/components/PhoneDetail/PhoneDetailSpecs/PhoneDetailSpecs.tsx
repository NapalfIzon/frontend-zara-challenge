import { PhoneSpecsApi } from '@src/features/phones/types/phone-detail.api.types';

import styles from './PhoneDetailSpecs.module.scss';

type PhoneDetailSpecsProps = {
  specs: PhoneSpecsApi;
};

const PhoneDetailSpecs = ({ specs }: PhoneDetailSpecsProps) => (
  <section className={styles['phone-detail__specs']}>
    <h2>SPECIFICATIONS</h2>
    <dl>
      {Object.entries(specs).map(([label, value]) => (
        <div key={label} className={styles['phone-detail__specs--row']}>
          <dt>{label.replaceAll(/([A-Z])/g, ' $1').toUpperCase()}</dt>
          <dd>{value}</dd>
        </div>
      ))}
    </dl>
  </section>
);

export default PhoneDetailSpecs;
