import { notFound } from 'next/navigation';
import PhoneDetail from '@src/features/phones/components/PhoneDetail/PhoneDetail';
import { phonesService } from '@src/features/phones/services/phones.service';

type PhoneDetailPageProps = {
  params: Promise<{ id: string }>;
};

const PhoneDetailPage = async ({ params }: PhoneDetailPageProps) => {
  const { id } = await params;

  let phone;

  try {
    phone = await phonesService.getPhoneById(id);
  } catch {
    notFound();
  }

  if (!phone) notFound();

  return <PhoneDetail phone={phone} />;
};

export default PhoneDetailPage;
