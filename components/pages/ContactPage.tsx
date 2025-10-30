import React from 'react';
import PageContainer from './PageContainer';

const ContactPage: React.FC = () => {
  return (
    <PageContainer title="Contact">
      <div className="text-center space-y-4">
        <p>ライブ出演のご依頼、その他各種お問い合わせは、下記のメールアドレスまでご連絡ください。</p>
        <a href="mailto:contact@namakurametro.com" className="text-2xl text-yellow-400 hover:text-yellow-300 transition-colors">
          メアドなかったわ@gmail.com
        </a>
      </div>
    </PageContainer>
  );
};

export default ContactPage;