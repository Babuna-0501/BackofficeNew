import LoginForm from '@/components/auth/LoginForm';
import CoreImage from '@/components/core/CoreImage';
import { Card, CardBody, CardHeader } from '@heroui/react';

function LoginPage() {
  return (
    <Card className='w-96'>
      <CardHeader className='justify-center w-full h-20'>
        <CoreImage src='/assets/logos/logo-ebazaar.svg' />
      </CardHeader>

      <CardBody>
        <LoginForm />
      </CardBody>
    </Card>
  );
}

export default LoginPage;
