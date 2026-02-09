import PhoneCard from '@src/features/phones/components/PhoneCard/PhoneCard';
import { SimilarPhoneApi } from '@src/features/phones/types/phone-detail.api.types';

import styles from './PhoneDetailSimilar.module.scss';

const PhoneDetailSimilar = ({ phones }: { phones: SimilarPhoneApi[] }) => (
  <section className={styles['phone-detail__similar']} aria-labelledby="similar-title">
    <h2 id="similar-title">SIMILAR ITEMS</h2>
    <div className={styles['phone-detail__similar--scroll']}>
      <div className={styles['phone-detail__similar--grid']} role="list">
        {phones.map((phone) => (
          <PhoneCard key={phone.id} phone={phone} />
        ))}
      </div>
    </div>
  </section>
);

export default PhoneDetailSimilar;
